import './App.css'
import './Shop.css'
import './index.css'
import ShopItem from './ShopItem.jsx'
import SpinningImage from './assets/spin.jpg'
import DarkModeImage from './assets/homura.png'
import CustomCursorOne from './assets/cursorone.png'

function Shop({count, setCount, isCursorPurchased, setIsCursorPurchased}) {
  /* something, initialSomething = useState(initialSomething) */
  

  const shopItems = [
    { id: 1, name: "Dark Mode", cost: 100, image: DarkModeImage},
    { id: 2, name: "More Spinning", cost: 300, image: SpinningImage},
    { id: 3, name: "A Cool Cursor", cost: 5, image: CustomCursorOne },
  ];

  const purchaseItem = (item) => {
    if (count >= item.cost) {
        setCount((prevCount) => prevCount - item.cost);
        if (item.id === 3 && !isCursorPurchased) {
              setIsCursorPurchased(true);
            }
        }
    }

  return (
    <>
      <h1>Welcome to the Counts Shop.</h1>
      <div className="counts-shop">
        {shopItems.map((item) => (
          <ShopItem 
            key={item.id}
            name={item.name}
            cost={item.cost}
            image={item.image}
            onPurchase={() => purchaseItem(item)}
            userCount={count}
          />
        ))}
      </div>
    </>
  )
}

export default Shop
