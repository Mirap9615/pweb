import './Zone.css'
import './App.css'
import './index.css'


/* 
<div>
        <a href="https://myanimelist.net/profile/Miracle9615" target="_blank">
          <img src="https://cdn.myanimelist.net/s/common/userimages/409c6fdf-3f11-48c1-85d2-ba3e74844f6a_225w?s=44cc62e10a8b60e465ac5503ec4efb86" className="logo third" alt="MAL logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={"https://i.imgur.com/oaHMn00.jpg"} className="logo fourth" alt="Dreamcatcher Raising Project" />
        </a>
      </div>
*/
function Zone({count, setCount}) {

  return (
    <>
      
      <h1>The Deadly Sins.</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count - 1)}
         disabled={count <= 0}
         className={count <= 0 ? 'disabledButton' : 'button'}
        >
          Decrement Count
        </button>
      </div>
    </>
  )
}

export default Zone
