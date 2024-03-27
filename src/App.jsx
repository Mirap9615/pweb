import reactLogo from './assets/react.svg'
import Madoka from './assets/madoka.png'
import './App.css'

function App({count, setCount}) {

  return (
    <>
      <div>

        <a href="https://myanimelist.net/profile/Miracle9615" target="_blank">
          <img src="https://cdn.myanimelist.net/s/common/userimages/409c6fdf-3f11-48c1-85d2-ba3e74844f6a_225w?s=44cc62e10a8b60e465ac5503ec4efb86" className="logo" alt="MAL logo" />
        </a>
        <a href="https://madokamagicausa.com/" target="_blank">
          <img src={Madoka} className="logo second" alt="Kaname logo" />
        </a>
      </div>
      <h1>Misaka x Madoka </h1>
      <p className="read-the-docs">
        Click on the Kuroko and React logos to learn more
      </p>
      <div className="card">
     
        <button onClick={() => setCount((count) => count + 1)}>
          Increment Count
        </button>
        <p>
          Edit <code>App.jsx</code> and save to test!
        </p>
      </div>
     
    </>
  )
}

export default App
