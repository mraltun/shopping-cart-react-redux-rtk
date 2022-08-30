import React from "react";
import { CartIcon } from "../data/icons";
// Hook for access to store's state
import { useSelector } from "react-redux";

const Navbar = () => {
  // Return the state from cart slice
  const { amount } = useSelector((state) => state.cart);

  return (
    <nav>
      <div className='nav-center'>
        <h3>redux toolkit</h3>
        <div className='nav-container'>
          <CartIcon />
          <div className='amount-container'>
            <p className='total-amount'>0</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
