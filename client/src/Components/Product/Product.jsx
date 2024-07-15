import React, { useEffect, useState } from "react";
import "./Product.css";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Magnifier from "react-magnifier";
import Slider from "react-slick";
const ReactApi = "http://localhost:8800";
import { addToCart } from "../Redux/cartSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";

export default function Product() {
  const location = useLocation();
  let Productdata = location.state || null;
  const [filtredData, setRelatedProduct] = useState();
  const [ActiveImage, setActiveImage] = useState(
    Productdata?.productimage?.[0]
  );
  useEffect(() => {
    if (
      Productdata &&
      Productdata.productimage &&
      Productdata.productimage?.length > 0
    ) {
      setActiveImage(Productdata.productimage[0]);
    }
    getRelatedProduct();
    window.scrollTo(0, 0);
  }, [Productdata]);
  const handleViewImage = img => {
    setActiveImage(img);
  };
  const [Description, setDescription] = useState(0);

  const handleToggle = data => {
    setDescription(data);
  };

  const getRelatedProduct = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8800/api/product/getallProduct`
      );
      console.log(response, "response");
      if (response.status === 200) {
        let filtredData = response.data.data.filter(
          ele => ele.category === Productdata.category
        );
        setRelatedProduct(filtredData);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };
  const settings = {
    dots: true,
    infinite: filtredData?.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: filtredData?.length > 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: filtredData?.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: filtredData?.length > 1,
        },
      },
    ],
  };
  const dispatch = useDispatch();
  const productContainerStyle = {
    marginRight: "15px",
  };
  const navigate = useNavigate();
  const handleSale = data => {
    navigate("/product", { state: data });
  };

  const handleAddToCart = product => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  return (
    <div className="row ">
      <div className="row shopcontainer">
        <p className="mt-3 p-3">
          <a className="text-decoration-none text-dark" href="/">
            Home
          </a>{" "}
          /{" "}
          <a className="text-decoration-none text-dark" href="/">
            {Productdata.category}
          </a>{" "}
          / <span>{Productdata.productName}</span>
        </p>
        <div className="row m-auto p-4">
          <div className="col-md-6">
            <div className="row m-auto">
              <div className="col-md-12">
                <Magnifier
                  className="view-image img-fluid"
                  src={`${ReactApi}/Product/${ActiveImage}`}
                  width={500}
                  height={500}
                />
              </div>
            </div>

            <div className="row mt-3">
              {Productdata?.productimage?.map(Ele => (
                <div key={Ele} className="col-md-2 p-1">
                  <img
                    className="thumbnail-image img-fluid"
                    onMouseEnter={() => handleViewImage(Ele)}
                    src={`${ReactApi}/Product/${Ele}`}
                    alt=""
                    height={80}
                    width={80}
                    style={{ height: "100px" }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <div className="product-details">
              <h2 className="product-name">{Productdata?.productName}</h2>
              <p className="d-flex">
                <span className="real-price me-3">
                  ${Productdata?.realPrice}
                </span>{" "}
                <span className="offer-price">${Productdata?.offerPrice}</span>
              </p>

              <p className="product-subtitle">{Productdata?.subtitle}</p>
              <p className="product-category">
                <strong>Category:</strong> {Productdata?.category}
              </p>
              <p className="product-unit">
                <strong>Unit:</strong> {Productdata?.unit}
              </p>
              <p className="product-packsize">
                <strong>Pack Size:</strong> {Productdata?.packsize}
              </p>
              <div className="row">
                {/* <input className="col-md-2 p-2 me-2" type="number" /> */}
                <button
                  className="col-md-2 p-2 checkout"
                  onClick={() => handleAddToCart(Productdata)}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container p-4">
          <div className="row mt-3">
            <div className="col-md-4 me-auto">
              <a
                className="cursor me-2  text-dark"
                onClick={() => handleToggle(0)}>
                Description
              </a>{" "}
              <a
                className="cursor me-2  text-dark"
                onClick={() => handleToggle(1)}>
                Additional information
              </a>
              <a className="cursor  text-dark" onClick={() => handleToggle(2)}>
                Reviews
              </a>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-10 ">
              {Description === 0 && (
                <div
                  className="product-description"
                  dangerouslySetInnerHTML={{
                    __html: Productdata?.discription,
                  }}></div>
              )}
              {Description === 1 && (
                <>
                  <p className="fs-1">Additional information</p>
                  <hr />
                  <p>
                    <span className="pack-size fs-5 me-4">Pack Size</span>{" "}
                   <span className="me-1"> {Productdata.packsize}</span>
                    {Productdata.unit}
                  </p>
                  <hr />
                </>
              )}

              {Description === 2 && (
                <>
                  <h1>Reviews</h1>
                  <p>There are no reviews yet.</p>
                  <p>
                    Only logged-in customers who have purchased this product may
                    leave a review.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="row mt-3 m-auto">
          <div className="row">
            <h1>Related Products</h1>
          </div>
          {filtredData?.length > 0 ? (
            <Slider {...settings} className="row m-auto">
              {filtredData.map(product => (
                <div key={product._id} className="col-12 col-md-6 col-lg-4">
                  <div
                    className="product_inner_Container mb-4 shadow h-50"
                    style={productContainerStyle}>
                    <button
                      className="sale"
                      onClick={() => handleSale(product)}>
                      Sale
                    </button>
                    <img
                      src={`http://localhost:8800/Product/${product.productimage[0]}`}
                      alt={product.productName}
                      className="card-img-top"
                      height={200}
                      width={200}
                    />
                    <div className="container">
                      <p className="product-title p-2 auto">
                        {product.productName}
                      </p>
                      <p className="d-flex justify-content-center">
                        <span className="real-price text-muted me-2">
                          ${product.realPrice}
                        </span>
                        <span className="offer-price">
                          ${product.offerPrice}
                        </span>
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
            </Slider>
          ) : (
            <div className="col-12">
              <p>No related products available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
