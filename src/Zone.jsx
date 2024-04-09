import './Zone.css'
import './App.css'
import './index.css'
import { useAppState } from './AppStateProvider'; // Routine 1

function Zone() {
  const { fetchStates, clickCount } = useAppState(); // Routine 2

  const decrementCount = async () => {
    await fetch('/api/decrementCount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ DecrementCount: 1})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      fetchStates(); 
    })
    .catch(error => console.error('Error decrementing count:', error));
  };

  return (
    <>
      <h1>The Deadly Sins.</h1>
      <div className="card">
        <button onClick={() => decrementCount()}
         disabled={clickCount <= 0}
         className={clickCount <= 0 ? 'disabledButton' : 'button'}
        >
          Decrement Count
        </button>
      </div>
    </>
  )
}

export default Zone
