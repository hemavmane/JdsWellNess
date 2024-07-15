import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import moment from 'moment';

const CouponComponent = () => {
  const initialData = {
    code: '',
    discount: '',
    expirationDate: '',
    isActive: null,
  };

  const [coupon, setCoupon] = useState(initialData);
  const [editId, setEditId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [show, setShow] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchAllCoupons();
  }, []);

  const fetchAllCoupons = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/coupons/getdata');
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setCoupon((prevCoupon) => ({
      ...prevCoupon,
      [name]: name === 'isActive' ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8800/api/coupons/update/${editId}`, {
        code: coupon.code,
        discount: coupon.discount,
        expirationDate: coupon.expirationDate,
        isActive: coupon.isActive,
      });

      if (response.status === 200) {
        setIsEdit(false);
        setShow(false);
        alert('Coupon updated successfully');
        fetchAllCoupons();
        setCoupon(initialData);
      }
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  };

  const handleAddCoupon = async () => {
    try {
      const response = await axios.post('http://localhost:8800/api/coupons/create', {
        code: coupon.code,
        discount: coupon.discount,
        expirationDate: coupon.expirationDate,
        isActive: coupon.isActive,
      });

      if (response.status === 200) {
        setIsEdit(false);
        setShow(false);
        alert('Coupon added successfully');
        fetchAllCoupons();
        setCoupon(initialData);
      }
    } catch (error) {
      console.error('Error adding coupon:', error);
    }
  };

  const handleDeleteSingle = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/coupons/delete/${id}`);
      fetchAllCoupons();
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  const handleEdit = (id) => {
    setIsEdit(true);
    setEditId(id);
    const findData = filteredData.find((ele) => ele._id === id);
    setCoupon({
      code: findData.code,
      discount: findData.discount,
      expirationDate: moment(findData.expirationDate).format('YYYY-MM-DD'),
      isActive: findData.isActive,
    });
    setShow(true);
  };

  const columns = [
    { name: 'Code', selector: row => row.code },
    { name: 'Discount', selector: row => row.discount },
    { name: 'Status', selector: row => (row.isActive ? 'Active' : 'Inactive') },
    {
      name: 'Expiration Date',
      selector: row => moment(row.expirationDate).format('DD-MM-YY'),
    },
    {
      name: 'Action',
      cell: row => (
        <>
          <p
            style={{ cursor: 'pointer', marginRight: '15px', color: 'red' }}
            onClick={() => handleDeleteSingle(row._id)}
          >
            Delete
          </p>
          <p
            style={{ cursor: 'pointer', marginRight: '5px', color: 'green' }}
            onClick={() => handleEdit(row._id)}
          >
            Edit
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <p className="mb-4 subheading">{isEdit ? 'Edit Coupon' : 'Add Coupon'}</p>

      {show ? (
        <div className="col-md-4 m-auto">
          <div className="form-group mb-3">
            <label htmlFor="code">Coupon Code</label>
            <input
              type="text"
              id="code"
              name="code"
              value={coupon.code}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="discount">Discount (%)</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={coupon.discount}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="expirationDate">Expiration Date</label>
            <input
              type="date"
              id="expirationDate"
              name="expirationDate"
              value={coupon.expirationDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={coupon.isActive}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor="isActive">Active</label>
            </div>
          </div>
          {isEdit ? (
            <button type="submit" className="add-btn p-2" onClick={handleUpdate}>
              Update Coupon
            </button>
          ) : (
            <button type="submit" className="add-btn p-2" onClick={handleAddCoupon}>
              Add Coupon
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col-md-1 me-auto"></div>
            <button onClick={() => setShow(true)} className="col-md-2 p-2 add-btn">Add Coupon</button>
          </div>
          <DataTable
            title="Coupon List"
            columns={columns}
            data={filteredData}
            striped
            responsive
            pagination
            highlightOnHover
          />
        </>
      )}
    </div>
  );
};

export default CouponComponent;
