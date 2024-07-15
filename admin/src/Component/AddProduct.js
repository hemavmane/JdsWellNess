import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoArrowBackCircleSharp } from "react-icons/io5";
const ReactApi = "http://localhost:8800";
export default function AddProduct() {
  const location = useLocation();
  let idd = location.state?.idd || null;
  console.log(idd, "idd")
  const [ProductImage, setProductImage] = useState([]);
  const [EditProduct, setEditProduct] = useState(null);
  const [ProductFormData, setProductFormData] = useState({
    ProductName: "",
    RealPrice: "",
    OfferPrice: "",
    category: "",
    realprice: "",
    packsize: "",
    unit: "",
    subtitle: ""
  });
  const [discription, setDiscription] = useState("");

  useEffect(() => {
    if (idd) {
      getProduct();
    }
  }, [idd]);

  const getProduct = async () => {
    try {
      let response = await axios.get(`http://localhost:8800/api/product/getbyproductbyid/${idd}`);
      setEditProduct(response.data);
      console.log(EditProduct, "EditProduct")
    } catch (error) {
      console.log("Error fetching product data", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setDiscription(data);
  };

  const handleChangeImage = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setProductImage(fileArray);
  };

  const AddProduct = async () => {
    try {
      if (!ProductFormData.category || !ProductFormData.packsize || !ProductFormData.ProductName ||
        !ProductFormData.realprice || !ProductFormData.OfferPrice
      ) {
        alert("Please fill all required fields.");
        return;
      }

      const formdata = new FormData();
      formdata.append("category", ProductFormData.category);
      formdata.append("discription", discription);
      formdata.append("productName", ProductFormData.ProductName);
      formdata.append("realPrice", ProductFormData.realprice);
      formdata.append("offerPrice", ProductFormData.OfferPrice);
      formdata.append("packsize", ProductFormData.packsize);
      formdata.append("unit", ProductFormData.unit);
      formdata.append("subtitle", ProductFormData.subtitle);

      if (ProductImage.length > 0) {
        ProductImage.forEach((image) => {
          formdata.append("productimage", image);
        });
      }

      let response = await axios.post(
        `http://localhost:8800/api/product/addproduct`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Product Added Successfully");
        window.location.assign("/dashboard");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formdata = new FormData();
      formdata.append("category", ProductFormData.category);
      formdata.append("discription", discription);
      formdata.append("productName", ProductFormData.ProductName);
      formdata.append("realPrice", ProductFormData.realprice);
      formdata.append("offerPrice", ProductFormData.OfferPrice);
      formdata.append("packsize", ProductFormData.packsize);
      formdata.append("unit", ProductFormData.unit);
      formdata.append("subtitle", ProductFormData.subtitle);

      if (ProductImage.length > 0) {
        ProductImage.forEach((image) => {
          formdata.append("productimage", image);
        });
      }

      let response = await axios.put(
        `http://localhost:8800/api/product/editProduct/${idd}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Product updated successfully!");
        window.location.assign("/dashboard");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    if (EditProduct && idd) {
      setProductFormData((prevData) => ({
        ...prevData,
        ProductName: EditProduct.productName || prevData.ProductName,
        category: EditProduct.category || prevData.category,
        OfferPrice: EditProduct.offerPrice || prevData.OfferPrice,
        realprice: EditProduct.realPrice || prevData.realprice,
        packsize: EditProduct.packsize || prevData.packsize,
        unit: EditProduct.unit || prevData.unit,
        subtitle: EditProduct.subtitle || prevData.subtitle,
      }));

      setDiscription(EditProduct.discription);
      setProductImage(EditProduct.productimage)
    }
  }, [EditProduct, idd]);
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate("/dashboard");
  };

  return (
    <div className="col-md-9 m-auto mt-3 p-3">
      <div className="row mt-2 cl">
        <div className="col-md-2  me-auto">
          <IoArrowBackCircleSharp className="fs-2" onClick={handleNavigate} />
        </div>
      </div>
      <div className="row mt-2 p-2">
        <div className="col-md-6 mb-3">
          <Form.Control
            onChange={handleChange}
            name="ProductName"
            value={ProductFormData.ProductName}
            className="session"
            placeholder="Product name"
          />
        </div>

        <div className="col-md-6 mb-3">
          <Form.Select
            value={ProductFormData.category}
            onChange={handleChange}
            name="category"
          >
            <option>Choose category...</option>
            <option value="Uncategorized">Uncategorized</option>
            <option value="categorized">categorized</option>
          </Form.Select>
        </div>

        <div className="col-md-6 mb-3">
          <Form.Select
            name="unit"
            value={ProductFormData.unit}
            onChange={handleChange}
          >
            <option>Select unit</option>
            <option value="GMS">GMS</option>
            <option value="Kg">Kg</option>

          </Form.Select>
        </div>

        <div className="col-md-6 mb-3">
          <Form.Control
            onChange={handleChange}
            value={ProductFormData.realprice}
            name="realprice"
            className="p-2 session"
            placeholder="Original Price"
          />
        </div>

        <div className="col-md-6 mb-3">
          <Form.Control
            onChange={handleChange}
            value={ProductFormData.OfferPrice}
            name="OfferPrice"
            className="p-2 session"
            placeholder="Offer Price"
          />
        </div>

        <div className="col-md-6 mb-3">
          <Form.Control
            onChange={handleChange}
            value={ProductFormData.packsize}
            name="packsize"
            className="p-2 session"
            placeholder="Pack size"
          />
        </div>

        <div className="col-md-6 mb-3">
          <Form.Control
            onChange={handleChange}
            name="subtitle"
            as="textarea"
            value={ProductFormData.subtitle}
            className="session"
            placeholder="Product subtitle"
          />
        </div>

        <div className="col-md-6 mb-3">
          <Form.Label className="mb-0">Upload Images</Form.Label>
          <Form.Control
            className="col-md-4 p-0"
            multiple
            onChange={handleChangeImage}
            type="file"
            name="productimage"
          />
        </div>

        <div className="row">

          {EditProduct &&
            EditProduct?.productimage?.map((Ele, index) => {
              return (
                <div className="col-md-2 m-1 m-auto mt-4">
                  <img
                    className=" p-0 m-0 rounded"
                    height={100}
                    width={150}
                    src={`${ReactApi}/Product/${Ele}`}
                  />
                </div>
              );
            })}
        </div>

      </div>

      <div className="row mt-3">
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={discription}
            onChange={handleEditorChange}
            height={200}
          />
        </div>
      </div>

      <div className="row mt-3">

        <Button className="col-md-2 m-auto text-center" onClick={handleNavigate} variant="dark">
          Cancel
        </Button>
        < >
          {idd ? (
            <Button className="col-md-4 m-auto text-center"
             onClick={handleUpdate} variant="success">
              Update Product
            </Button>
          ) : (
            <Button className="col-md-2 me-auto m-auto text-center"
             onClick={AddProduct} variant="success">
              Add Product
            </Button>
          )}
        </>
      </div>
    </div>
  );
}
