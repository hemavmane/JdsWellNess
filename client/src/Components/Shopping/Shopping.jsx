import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import "./Shopping.css";
import { Pagination } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const Shopping = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(16);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(activePage, limit);
  }, [activePage, limit]);

  const getProduct = async (page, limit) => {
    try {
      let response = await axios.get(
        `http://localhost:8800/api/product/getalldata?page=${page}&limit=${limit}`
      );
      console.log(response, "response");
      if (response.status === 200) {
        setProducts(response.data.data);
        setTotal(response.data.total);
      } else {
        setError(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching products", error);
      setError("Network Error: Could not fetch products");
    }
  };

  const handleSale = data => {
    navigate("/product", { state: data });
  };

  const handleAddToCart = product => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="container mt-4">
      <div className="row gx-3 gy-4">
        {products.map(product => (
          <div key={product._id} className="col-12 col-md-6 col-lg-4 mt-5 mb-4">
            <div className="product_inner_Container shadow h-100">
              <button className="sale" onClick={() => handleSale(product)}>
                Sale
              </button>
              <img
                src={`http://localhost:8800/Product/${product.productimage[0]}`}
                alt={product.productName}
                className="product-img card-img-top"
              />
              <div className="container">
                <p className="product-title p-2 auto">{product.productName}</p>
                <p className="d-flex justify-content-center">
                  <span className="real-price fs-5 text-muted me-2">
                    ${product.realPrice}
                  </span>
                  <span className="fs-5 offer-price">${product.offerPrice}</span>
                </p>
                <button
                  className="add-to-cart m-auto"
                  onClick={() => handleAddToCart(product)}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center align-items-center my-4">
        <Pagination
          prev
          last
          next
          first
          size="lg"
          total={total}
          limit={limit}
          activePage={activePage}
          onChangePage={setActivePage}
        />
      </div>
    </div>
  );
};

export default Shopping;
