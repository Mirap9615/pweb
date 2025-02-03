const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: '.env' });
const axios = require('axios');
const puppeteer = require('puppeteer-core');
const path = require('path');
const session = require('express-session');
const redirectUri = process.env.REDIRECT_URI;
const cheerio = require('cheerio');
const fs = require('fs').promises;

const app = express();
const port = process.env.PORT || 3015;

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../dist')));

app.use(session({
  secret: 'a_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// the api endpoint for the server to handle register-related requests 
app.post('/api/register', (req, res) => {
  console.log("Received registration request");
  res.status(200).json({ message: 'User registered successfully' });
});

// the api endpoint for the server to handle cursor-related requests
app.post('/api/setCursor', (req, res) => {
  const { isCursorPurchased } = req.body;
  res.cookie('cursorPurchased', isCursorPurchased, { maxAge: 900000, httpOnly: true });
  res.status(200).json({ message: 'Cursor preference saved' });
});

// endpoint to get the cursor state based on the cookie
app.get('/api/getCursorState', (req, res) => {
  const isCursorPurchased = req.cookies.cursorPurchased === 'true'; 
  res.status(200).json({ isCursorPurchased });
});

// endpoint to get the count number
app.get('/api/getIncrementCount', (req, res) => {
  const IncrementCount = req.cookies.IncrementCount; 
  res.status(200).json({ IncrementCount });
});

// endpoint to increment the count number
app.post('/api/setIncrementCount', (req, res) => {
  let currentCount = Number(req.cookies.IncrementCount || 0);
  currentCount += 1; 
  
  res.cookie('IncrementCount', currentCount, { maxAge: 900000, httpOnly: true });
  res.status(200).json({ message: 'Increment Count Incremented', IncrementCount: currentCount });
});

// endpoint to decrement the counter number
app.post('/api/decrementCount', (req, res) => {
  let currentCount = Number(req.cookies.IncrementCount || 0);
  currentCount = currentCount > 0 ? currentCount - 1 : 0; // ensure count doesn't go below 0

  res.cookie('IncrementCount', currentCount, { maxAge: 900000, httpOnly: true });
  res.status(200).json({ message: 'Increment Count Decremented', IncrementCount: currentCount });
});

// endpoint to decrement the cost of a purchased good 
app.post('/api/decrementPurchaseAmount', (req, res) => {
  let currentCount = Number(req.cookies.IncrementCount || 0);
  const cost = req.body.cost;
  
  if (currentCount >= cost) {
    currentCount -= cost;
    res.cookie('IncrementCount', currentCount, { maxAge: 900000, httpOnly: true });
    res.status(200).json({ message: 'Purchase successful', success: true });
  } else {
    res.status(400).json({ message: 'Not enough count for this purchase', success: false });
  }
});


// MAL Section

// endpoint to call the MAL API given a username, for the user's Anime List
app.get('/api/getUserAnimeList', ensureValidToken, async (req, res) => {
  const username = req.query.username;
  const accessToken = req.session.tokens.access_token;
  const url = `https://api.myanimelist.net/v2/users/${encodeURIComponent(username)}/animelist`; 
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`, 
        'Content-Type': 'application/json'
      },
      params: {
        fields: 'list_status',
        limit: 10
      },
      timeout: 5000
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error calling MyAnimeList API:', error.message);
    res.status(500).json({ message: 'Failed to retrieve data from MyAnimeList' });
  }
})

// scrape MAL directly 

async function findChromePath() {
  const possiblePaths = [
    '/app/.apt/usr/bin/google-chrome',
    '/app/.apt/opt/google/chrome/chrome',
    '/app/.chrome/bin/chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // macOS
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // Windows
    '/usr/bin/google-chrome', // Linux
    '/usr/bin/chromium-browser', // Linux alternative
  ];

  // Add dynamic path for Puppeteer's downloaded Chrome
  const puppeteerPath = path.join('.', '.cache', 'puppeteer', 'chrome');
  if (await fs.access(puppeteerPath).then(() => true).catch(() => false)) {
    const chromeVersions = await fs.readdir(puppeteerPath);
    if (chromeVersions.length > 0) {
      possiblePaths.unshift(path.join(puppeteerPath, chromeVersions[0], 'chrome-linux', 'chrome'));
    }
  }

  for (const chromePath of possiblePaths) {
    if (await fs.access(chromePath).then(() => true).catch(() => false)) {
      console.log(`Chrome found at: ${chromePath}`);
      return chromePath;
    }
  }

  console.log('Chrome not found in any of the expected locations');
  return null;
}

async function launchBrowser() {
  const isHeroku = process.env.IS_HEROKU === 'true';

  let options = {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: "new",
  };

  if (isHeroku) {
    console.log("Running on Heroku - using system Chrome.");
    options.executablePath = process.env.CHROME_BIN || '/usr/bin/google-chrome';
  } else {
    console.log("Running locally - using installed Puppeteer.");
    options = { ...options, executablePath: await findChromePath() };
  }

  return puppeteer.launch(options);
}

app.post('/scrape', async (req, res) => {
  const { username } = req.body;
  
  try {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    // Fetch profile data
    await page.goto(`https://myanimelist.net/profile/${username}`);
    const profileHtml = await page.content();
    const profileData = parseProfileData(profileHtml);

    // Fetch anime list data
    await page.goto(`https://myanimelist.net/animelist/${username}?order=4&status=2`);
    const animeListHtml = await page.content();
    const animeListData = parseAnimeListData(animeListHtml);

    await browser.close();

    res.json({ profileData, animeListData });
  } catch (error) {
    console.log("error!");
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
});

function parseProfileData(html) {
  const $ = cheerio.load(html);

  const titleText = $('title').text().trim();
  const username = titleText.replace("'s Profile - MyAnimeList.net", "").trim();
  const profileImageUrl = $('.user-image img').attr('data-src') || $('.user-image img').attr('src');

  function safeParse(selector, parser) {
    try {
      return $(selector).map(parser).get();
    } catch (error) {
      console.error(`Error parsing ${selector}:`, error);
      return [];
    }
  }
  
  const favoriteAnime = safeParse('#anime_favorites .fav-slide-outer .fav-slide li.btn-fav', (i, el) => {
    const $el = $(el);
    const users = $el.find('.users').text().split('·');
    return {
      title: $el.attr('title'),
      url: $el.find('a').attr('href'),
      imageUrl: $el.find('img').attr('data-src') || $el.find('img').attr('src'),
      type: users[0]?.trim() || '',
      year: users[1]?.trim() || ''
    };
  });

  const favoriteManga = safeParse('#manga_favorites .fav-slide-outer .fav-slide li.btn-fav', (i, el) => {
    const $el = $(el);
    const users = $el.find('.users').text().split('·');
    return {
      title: $el.attr('title'),
      url: $el.find('a').attr('href'),
      imageUrl: $el.find('img').attr('data-src') || $el.find('img').attr('src'),
      type: users[0]?.trim() || '',
      year: users[1]?.trim() || ''
    };
  });

  const favoriteCharacters = safeParse('#character_favorites .fav-slide-outer .fav-slide li.btn-fav', (i, el) => {
    const $el = $(el);
    return {
      title: $el.attr('title'),
      url: $el.find('a').attr('href'),
      imageUrl: $el.find('img').attr('data-src') || $el.find('img').attr('src'),
      fromAnime: $el.find('.users').text().trim()
    };
  });

  const favoritePeople = safeParse('#person_favorites .fav-slide-outer .fav-slide li.btn-fav', (i, el) => {
    const $el = $(el);
    return {
      title: $el.attr('title'),
      url: $el.find('a').attr('href'),
      imageUrl: $el.find('img').attr('data-src') || $el.find('img').attr('src'),
    };
  });

  const favoriteCompanies = safeParse('#company_favorites .fav-slide-outer .fav-slide li.btn-fav', (i, el) => {
    const $el = $(el);
    return {
      title: $el.attr('title'),
      url: $el.find('a').attr('href'),
      imageUrl: $el.find('img').attr('data-src') || $el.find('img').attr('src'),
    };
  });

  const animeStats = {
    daysWatched: $('.anime .stat-score .di-tc:first-child').text().match(/Days:\s*([\d.]+)/)?.[1],
    meanScore: $('.anime .stat-score .score-label').text().trim(),
    watching: $('.stats-status .watching + span').text().trim(),
    completed: $('.stats-status .completed + span').text().trim(),
    onHold: $('.stats-status .on_hold + span').text().trim(),
    dropped: $('.stats-status .dropped + span').text().trim(),
    planToWatch: $('.stats-status .plan_to_watch + span').text().trim(),
    totalEntries: $('.stats-data li:contains("Total Entries") span:last-child').text().trim(),
    rewatched: $('.stats-data li:contains("Rewatched") span:last-child').text().trim(),
    episodes: $('.stats-data li:contains("Episodes") span:last-child').text().trim()
  };
  
  return {
    username: username,
    profileImageUrl: profileImageUrl,
    joinDate: $('span.user-status-title:contains("Joined")').siblings('span.user-status-data').text().trim(),
    lastOnline: $('span.user-status-title:contains("Last Online")').siblings('span.user-status-data').text().trim(),
    animeStats: animeStats,
    favoriteAnime: favoriteAnime,
    favoriteManga: favoriteManga,
    favoriteCharacters: favoriteCharacters,
    favoritePeople: favoritePeople,
    favoriteCompanies: favoriteCompanies
  };
}

function parseAnimeListData(html) {
  const $ = cheerio.load(html);
  const animeData = [];

  $('tbody.list-item').each((i, el) => {
    const $row = $(el).find('tr.list-table-data');
    const $moreInfo = $(el).find('tr.more-info');

    const id = $row.attr('id')?.replace('score-', '') || '';
    const rank = $row.find('.data.number').text().trim();
    const imageUrl = $row.find('.data.image img').attr('src');
    const title = $row.find('.data.title .link.sort').text().trim();
    const url = $row.find('.data.title .link.sort').attr('href');
    const score = $row.find('.data.score .score-label').text().trim();
    const type = $row.find('.data.type').text().trim();
    const progress = $row.find('.data.progress span').text().trim();
    const notes = $row.find('.data.title .notes .text').text().trim();
    
    const hasStreamingIcon = $row.find('.data.title .icon-watch2').length > 0;

    animeData.push({
      id,
      rank,
      imageUrl,
      title,
      url,
      score,
      type,
      progress,
      notes,
      hasStreamingIcon
    });
  });

  return animeData;
}

function generateCodeVerifier() {
return require('crypto').randomBytes(64).toString('hex').substr(0, 128);  // Secure random token
}

async function getTokenWithCode(authCode, codeVerifier, redirectUri) {
    const params = new URLSearchParams();
    params.append('client_id', process.env.MAL_CLIENT_ID);
    params.append('client_secret', process.env.MAL_CLIENT_SECRET);
    params.append('grant_type', 'authorization_code');
    params.append('code', authCode);
    params.append('redirect_uri', redirectUri);
    params.append('code_verifier', codeVerifier);

    try {
        const response = await axios.post('https://myanimelist.net/v1/oauth2/token', params.toString(), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        return response.data;
    } catch (error) {
      if (error.response) {
        console.error('API response error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
      res.status(500).json({ message: 'Failed to retrieve data from MyAnimeList' });
      throw error;
    }
}

async function refreshToken(refreshToken) {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    params.append('client_id', process.env.MAL_CLIENT_ID);
    params.append('client_secret', process.env.MAL_CLIENT_SECRET);

    try {
        const response = await axios.post('https://myanimelist.net/v1/oauth2/token', params.toString(), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        return response.data;
    } catch (error) {
        if (error.response) {
        console.error('API response error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
      res.status(500).json({ message: 'Failed to retrieve data from MyAnimeList' });
    }
}

app.get('/auth/mal', (req, res) => {
  const codeVerifier = generateCodeVerifier();
  req.session.codeVerifier = codeVerifier; 
  const codeChallenge = codeVerifier; 
  const authorizationUrl = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.MAL_CLIENT_ID}&state=yourRandomString&redirect_uri=${encodeURIComponent('YOUR_REDIRECT_URI')}&code_challenge=${codeChallenge}&code_challenge_method=plain`;

  res.redirect(authorizationUrl);
});

app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  const { codeVerifier } = req.session;
  try {
      const response = await axios.post('https://myanimelist.net/v1/oauth2/token', {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code,
          code_verifier: codeVerifier,
          grant_type: 'authorization_code'
      });
      const token = response.data;
      req.session.token = token; // Save token in session
      res.send('Token generated and saved successfully!');
  } catch (error) {
      console.error('Failed to retrieve the token:', error);
      res.status(500).send('Failed to retrieve the token');
  }
});

app.get('/user_info', async (req, res) => {
  const accessToken = req.session.token.access_token;
  try {
      const response = await axios.get('https://api.myanimelist.net/v2/users/@me', {
          headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const user = response.data;
      res.send(`Greetings ${user.name}!`);
  } catch (error) {
      console.error('Failed to retrieve user info:', error);
      res.status(500).send('Failed to retrieve user info');
  }
});

async function ensureValidToken(req, res, next) {
  let { tokens } = req.session;
  if (!tokens || new Date() > new Date(tokens.expiryDate)) {
      tokens = await refreshToken(tokens.refreshToken);
      if (tokens) {
          req.session.tokens = tokens;
          next();
      } else {
          res.status(401).send('Unauthorized');
      }
  } else {
      next();
  }
}

app.get('/success', (req, res) => {
  if (req.session.tokens && req.session.tokens.access_token) {
      res.send('You have been successfully logged in. Welcome!');
  } else {
      res.status(401).send('Authentication failed or not logged in.');
  }
});

app.get('/auth/error', (req, res) => {
  res.status(401).send('Error during the authentication process.');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

module.exports = { launchBrowser };

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
