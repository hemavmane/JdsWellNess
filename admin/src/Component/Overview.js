import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import moment from "moment";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";
import Header from "./Header";
import DataTable from "react-data-table-component";
import TimeRangePicker from "./timepicker";
import { useLocation, useNavigate } from "react-router-dom";

const endPoints = "http://localhost:8800";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "80vh",
  overflowY: "auto",
  textAlign: "justify",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ContactDetails() {
  const navigate = useNavigate();

  const [CDeatils, setCDeatils] = useState([]);
  const [SelectedData, setSelectedData] = useState([]);
  const [EditData, setEditData] = useState([]);
  const [isEditable, setisEditable] = useState(false);
  const [Data, setData] = useState([]);
  const [SDate, setSDate] = useState({
    start: "",
    end: "",
    starttime: "",
    endtime: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setSDate(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [Preview, setPreview] = useState(false);

  const columns = [
    { name: "Product name", selector: row => row.productName },
    { name: "Pack Size", selector: row => row.packsize },
    { name: "Unit", selector: row => row.unit },
    { name: "Product Price", selector: row => row.realPrice },
    { name: "Offer Price", selector: row => row.offerPrice },
    {
      name: "Date",
      selector: row => moment(row.createdAt).format("DD-MM-YY"),
    },
    {
      name: "Action",
      cell: row => (
        <>
          <p
            style={{ cursor: "pointer", marginRight: "15px", color: "red" }}
            onClick={() => handleDeleteSingle(row._id)}>
            Delete
          </p>
          <p
            style={{ cursor: "pointer", marginRight: "5px", color: "skyblue" }}
            onClick={() => handleView(row._id)}>
            View
          </p>
          <p
            style={{ cursor: "pointer", marginRight: "5px", color: "green" }}
            onClick={() => handleEdit(row._id)}>
            Edit
          </p>
        </>
      ),
    },
  ];

  const handleView = id => {
    navigate("/viewdetails", { state: { id } });
  };

  const handleEdit = idd => {
    navigate("/product", { state: { idd: idd } });
  };

  const handleDeleteSingle = async id => {
    try {
      let response = await axios.post(`${endPoints}/api/product/trash/${id}`);
      if (response.status === 200) {
        window.prompt("Are you sure want to delete");
        window.location.assign("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      let deletedCount = 0;
      for (let data of SelectedData) {
        let response = await axios.post(
          `${endPoints}/api/product/trash/${data._id}`
        );
        if (response.status === 200) {
          deletedCount++;
        }
      }
      setCDeatils(CDeatils.filter(item => !SelectedData.includes(item)));
      setSelectedData([]);
      setPreview(false);
      if (deletedCount > 0) {
        alert(`${deletedCount} contacts deleted successfully.`);
        window.location.reload("");
        setPreview(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [SDate]);

  const getProduct = async () => {
    try {
      let response = await axios.get(`${endPoints}/api/product/getallProduct`);
      if (response.status === 200) {
        setCDeatils(response.data.data);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleSelecteRow = state => {
    setSelectedData(state.selectedRows);
  };

  const filterDateswise = data => {
    return data?.filter(item => {
      const createdAtMoment = moment(item?.createdAt);
      const selectedStartDate = SDate.start
        ? moment(SDate.start, "YYYY-MM-DD")
        : null;
      const selectedEndDate = SDate.end
        ? moment(SDate.end, "YYYY-MM-DD")
        : null;

      if (selectedStartDate && selectedEndDate) {
        return createdAtMoment.isBetween(
          selectedStartDate,
          selectedEndDate,
          null,
          "[]"
        );
      }

      if (selectedStartDate) {
        return createdAtMoment.isSameOrAfter(selectedStartDate);
      }

      if (selectedEndDate) {
        return createdAtMoment.isSameOrBefore(selectedEndDate);
      }

      return true;
    });
  };

  const filteredData = filterDateswise(CDeatils);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      window.location.assign("/");
    }
  }, []);
  const [viewProduct, setViewProduct] = useState(false);

  const handleNavigate = () => {
    navigate("/product");
  };
  return (
    <>
      <Header />

      {viewProduct ? (
        <div className="row p-4">
          <div className="col-md-1 ">
            <img
              width={30}
              onClick={() => setViewProduct(false)}
              style={{ cursor: "pointer" }}
              height={30}
              src="../Assests/icons8-go-back-26.png"
              alt=""
            />
          </div>
          <div className="row">
            <div className="col-md-4"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="row m-auto">
            <div className="col-md-2">
              <label className="fw-bold">Select Date</label>
              <input
                className="col-md-12 mb-2 shadow"
                type="date"
                onChange={handleChange}
                name="start"
              />
            </div>
            <div className="col-md-2">
              <label className="fw-bold">End Date</label>
              <input
                className="col-md-12 mb-2 shadow"
                type="date"
                name="end"
                onChange={handleChange}
              />
            </div>
            {/* <div className="col-md-2">
              <label className="fw-bold">From</label>
              <input
                className="col-md-12 mb-2 shadow"
                type="time"
                name="starttime"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <label className="fw-bold">To</label>
              <input
                className="col-md-12 mb-2 shadow"
                type="time"
                name="endtime"
                onChange={handleChange}
              />
            </div> */}
            <div className="col-md-2 mt-4">
              {SelectedData?.length > 0 && (
                <button
                  className="row m-auto p-2"
                  style={{
                    border: "none",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "6px",
                  }}
                  onClick={() => setPreview(true)}>
                  Delete
                </button>
              )}
            </div>
            {/* <div className="col-md-2 mt-4">
              {SelectedData?.length > 0 && (
                <button
                  className="row m-auto p-2"
                  style={{
                    border: "none",
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "6px",
                  }}
                  onClick={handleInfo}>
                  Download
                </button>
              )}
            </div> */}
          </div>
          <div className="row ">
            <div className="col-md-10"></div>
            <button
              className="add-btn mb-2 col-md-2 mt-2 p-2 mx-auto"
              onClick={handleNavigate}>
              Add Product
            </button>
          </div>
          <DataTable
            title=""
            className="mt-2"
            columns={columns}
            data={filteredData}
            theme="solarized"
            selectableRows
            onSelectedRowsChange={handleSelecteRow}
            pagination={filteredData?.length > 6}
          />
          <Modal
            open={Preview}
            onClose={() => setPreview(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <h5>Are you sure you want to delete the following contacts?</h5>
              <ul>
                {SelectedData.map(data => (
                  <div key={data._id}>
                    <h4>{data.name}</h4>
                    <p>{data.message}</p>
                  </div>
                ))}
              </ul>
              <Button
                variant="contained"
                style={{ marginRight: "10px" }}
                onClick={() => setPreview(false)}>
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}
