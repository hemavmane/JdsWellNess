import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../Redux/cartSlice";
import "./cart.css";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useNavigate } from "react-router";

const CartData = () => {
  const [show, setShow] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleIncreaseQuantity = id => {
    dispatch(increaseQuantity({ id }));
  };

  const handleDecreaseQuantity = id => {
    dispatch(decreaseQuantity({ id }));
  };

  const handleRemoveFromCart = id => {
    dispatch(removeFromCart({ id }));
  };
  const navigate =useNavigate()
  const handleCheckout = () => {
    navigate("/checkout")
  };
  return (
    <div className="container mb-3">
      <div className="cart p-3">
        <img src="../icons8-check-30.png" className="me-2" alt="Check" />
        <span className="me-auto">
          {cartItems.length > 0
            ? `"${cartItems[0]?.productName}"has been added to your cart.`
            : "Cart"}
        </span>
        <a className="float-end text-dark" href="/shop">
          Continue shopping
        </a>
      </div>
      <p className="fs-1">Cart</p>
      <div className="row">
        <div className="col-md-7 me-auto">
          <div>
            <span className="title">PRODUCT</span>
            <span className="float-end title">TOTAL</span>
            <hr />
          </div>
          {cartItems.map(product => (
            <div key={product?._id} className="row mb-2 mt-5">
              <div className="col-md-2">
                <img
                  src={`http://localhost:8800/Product/${product?.productimage[0]}`}
                  alt={product?.productName}
                  className="product-img card-img-top"
                  style={{ height: "100px" }}
                />
              </div>
              <div className="col-md-7">
                <p>{product?.productName}</p>
                <div>
                  <span className="col-md-3 text-decoration-line-through fs-5 me-4">
                    ${product.realPrice.toFixed(2)}
                  </span>
                  <span className="col-md-3 m-auto fs-5 me-3">
                    ${product.offerPrice.toFixed(2)}
                  </span>
                  <button className="col-md-3 save p-1 m-auto">
                    Save ${(product.realPrice - product.offerPrice).toFixed(2)}
                  </button>
                </div>

                <button className="col-md-7 p-1 mt-2 cart-item-quantity">
                  <span
                    className="col-md-1 quantity-btn"
                    onClick={() => handleDecreaseQuantity(product._id)}>
                    -
                  </span>
                  <span className="col-md-2 mx-2 title">
                    {product.quantity}
                  </span>
                  <span
                    className="col-md-1 quantity-btn"
                    onClick={() => handleIncreaseQuantity(product._id)}>
                    +
                  </span>
                </button>
                <a
                  className="row text-dark cursor m-auto mt-3"
                  onClick={() => handleRemoveFromCart(product?._id)}>
                  Remove Item
                </a>
              </div>

              <div className="col-md-2">
                <p>${(product.quantity * product.offerPrice).toFixed(2)}</p>
                <button className="save p-1">
                  Save $
                  {(
                    product.quantity *
                    (product.realPrice - product.offerPrice)
                  ).toFixed(2)}
                </button>
              </div>
              <hr className="m-auto mt-3 p-3" />
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div>
            <span className="title">CART TOTALS</span>
            <hr />
          </div>
          <div>
            <span className="title">Add a coupon</span>
            <span className="float-end title">
              {show ? (
                <RiArrowDropUpLine
                  onClick={() => setShow(false)}
                  className="fs-2"
                />
              ) : (
                <RiArrowDropDownLine
                  onClick={() => setShow(true)}
                  className="fs-2"
                />
              )}
            </span>
            {show && (
              <div className="mt-2">
                <input className="enter-code p-3" placeholder="Enter code" />
                <button className="apply p-3 float-end">Apply</button>
              </div>
            )}
            <hr />
            <div>
              <span className="title">Subtotal</span>
              <span className="float-end title">
                $
                {cartItems
                  .reduce(
                    (total, item) => total + item.quantity * item.offerPrice,
                    0
                  )
                  .toFixed(2)}
              </span>
              <hr />
            </div>
            <div>
              <span className="title text-bold">Total</span>
              <span className="float-end title">
                $
                {cartItems
                  .reduce(
                    (total, item) => total + item.quantity * item.offerPrice,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            <div className="row mt-2">
              <button className="apply p-2" onClick={handleCheckout}>
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartData;
