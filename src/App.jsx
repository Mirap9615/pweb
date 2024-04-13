import Madoka from './assets/madoka.png'
import './App.css'
import './Universal.css'
import { useAppState } from './AppStateProvider'; 

function App() {
  const { fetchStates } = useAppState();

  const countIncremented = async() => {
    await fetch('/api/setIncrementCount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ IncrementCount: 1 }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      fetchStates(); 
    })
    .catch(error => console.error('Error incrementing count', error));
  }

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
      <div className="card">
        <button className="button" onClick={() => countIncremented()}>
          Increment Count
        </button>
      </div>
    </>
  )
}

export default App
