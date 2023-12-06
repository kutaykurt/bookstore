import React from 'react';

const Cart = ({ cartItems }) => {
  console.log(cartItems);
  return (
    <div>
      <h2>Warenkorb</h2>
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <li key={index}>
              {item.title} - {item.author} {/* Anpassen an die Buchdetails */}
            </li>
          ))
        ) : (
          <li>Der Warenkorb ist leer</li>
        )}
      </ul>
    </div>
  );
};

export default Cart;