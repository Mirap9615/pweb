import './ShopItem.css'

function ShopItem({ name, cost, image, onPurchase, userCount }) {
    const canAfford = userCount >= cost;
  
    const handlePurchase = () => {
      if (canAfford) {
        onPurchase(cost);
      } else {
        alert("You don't have enough counts to purchase this item.");
      }
    };
  
    return (
      <div className="shop-item">
        <img src={image} alt={name} className="item-image" />
        <div className="item-info">
          <h3>{name}</h3>
          <p>Cost: {cost} counts</p>
          <button onClick={handlePurchase} disabled={!canAfford}>
            Purchase
          </button>
        </div>
      </div>  
    );
  }
  
  export default ShopItem;
  