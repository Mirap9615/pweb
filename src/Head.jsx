import './App.css'
import './Universal.css'

function Head({count, setCount}) {

  /* inline style */
  const fixedStyle = {
    position: 'fixed',
    top: '4px',    
    right: '10px',    
    zIndex: 1000, 
  };

  return (
    <>
      <button className='button' style={fixedStyle}>
          Count is {count}
      </button>
    </>
  )
}

export default Head
