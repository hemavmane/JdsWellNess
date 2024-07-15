import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";


export default function ProductView() {
  const ReactApi = "http://localhost:8800";
  const [Product, setProduct] = useState();
  const [ActiveImage, setActiveImage] = useState(Product?.productimage?.[0]);

  const location = useLocation();
  let data = location.state.id || null;


  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (Product && Product.productimage && Product.productimage.length > 0) {
      setActiveImage(Product.productimage[0]);
    }
  }, [Product]);

  const getProduct = async () => {
    try {
      let response = await axios.get(
        `${ReactApi}/api/product/getbyproductbyid/${data}`
      );
      if (response.status === 200) {
        setProduct(response.data);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  const navigate = useNavigate()
  const handleViewImage = img => {
    setActiveImage(img);
  };

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  return (

    <div className="row m-auto mx-5">
      <div className="row mt-2 cl">
        <div className="col-md-2  me-auto">
          <IoArrowBackCircleSharp className="fs-2" onClick={handleNavigate} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6 m-auto">
          <div className="row">
            <div className="col-md-2">
              {Product?.productimage?.map(Ele => (
                <div key={Ele} className="col-md-2 p-1 thumbnail-container">
                  <img
                    className="thumbnail-image"
                    onMouseEnter={() => handleViewImage(Ele)}
                    width={100}
                    height={100}
                    src={`${ReactApi}/Product/${Ele}`}
                    alt=""
                  />
                </div>
              ))}
            </div>

            <div className="main-image-container col-md-10 m-auto">
              <div className="image-zoom-container">
                <img
                  className="view-image"
                  src={`${ReactApi}/Product/${ActiveImage}`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 m-auto">
          <div className="product-details">
            <h2 className="product-name">{Product?.productName}</h2>
            <p className="row">
              <span className="real-price me-2 col-md-2">${Product?.realPrice}
              </span>  <span className="offer-price col-md-2">${Product?.offerPrice}</span>
            </p>

            <p className="product-subtitle">{Product?.subtitle}</p>
            <p className="product-category">
              <strong>Category:</strong> {Product?.category}
            </p>
            <p className="product-unit">
              <strong>Unit:</strong> {Product?.unit}
            </p>
            <p className="product-packsize">
              <strong>Pack Size:</strong> {Product?.packsize}
            </p>
          </div>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: Product?.discription }}></div>
    </div>
  );
}
