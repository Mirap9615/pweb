import React from 'react';
import ShopItem from './ShopItem.jsx';
import SpinningImage from './assets/spin.jpg';
import DarkModeImage from './assets/homura.png';
import CustomCursorOne from './assets/cursorone.png';
import { useAppState } from './AppStateProvider'; 

function Shop() {
  const { clickCount, setClickCount, isCursorPurchased, setIsCursorPurchased, fetchStates } = useAppState();

  const shopItems = [
    { id: 1, name: "Dark Mode", cost: 100, image: DarkModeImage },
    { id: 2, name: "More Spinning", cost: 300, image: SpinningImage },
    { id: 3, name: "A Cool Cursor", cost: 5, image: CustomCursorOne },
  ];

  const purchaseItem = async (item) => {
    if (clickCount < item.cost) {
      console.error('Not enough count for this purchase');
      return; 
    }
  
    try {
      const response = await fetch('/api/decrementPurchaseAmount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cost: item.cost }),
      });
      const data = await response.json();
      console.log(data.message);
  
      if (!data.success) {
        console.error('Not enough count for this purchase');
        return; 
      }
  
      await fetchStates();
  
      if (item.id === 3 && !isCursorPurchased) {
        const cursorResponse = await fetch('/api/setCursor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isCursorPurchased: true }),
        });
        const cursorData = await cursorResponse.json();
        console.log(cursorData.message);
  
        await fetchStates();
      }
    } catch (error) {
      console.error('Error during purchase:', error);
    }
  };  

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
            userCount={clickCount}
          />
        ))}
      </div>
    </>
  );
}

export default Shop;