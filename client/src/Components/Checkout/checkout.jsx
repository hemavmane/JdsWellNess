import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import { Country, State } from "country-state-city";
import { Form } from "react-bootstrap";

export default function Checkout() {
  const userdata = JSON.parse(localStorage.getItem("userdata"));
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  // Fetch the list of countries when the component mounts
  useEffect(() => {
    const countries = Country.getAllCountries().map(country => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountryOptions(countries);
  }, []);

  // Fetch the list of states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.value).map(
        state => ({
          value: state.isoCode,
          label: state.name,
        })
      );
      setStateOptions(states);
    } else {
      setStateOptions([]);
    }
  }, [selectedCountry]);

  return (
    <div className="row bg-light">
      <div className="col-md-10 m-auto">
        <div className="row">
          <div className="col-md-6">
            <p className="subheading fs-3">Contact Information</p>
            <p>Name: {userdata.username}</p>
            <p>Email: {userdata.email}</p>
            <p>Phone: {userdata.phone}</p>

            <div className="row mt-2">
              <p className="fs-3">Billing address</p>
              <p>Enter the billing address that matches your payment method.</p>
              <Select
                options={countryOptions}
                value={selectedCountry}
                onChange={setSelectedCountry}
                placeholder="Select a country"
                className="p-2"
              />
            </div>

            {selectedCountry && (
              <div className="row mt-2">
                <Select
                  options={stateOptions}
                  value={selectedState}
                  onChange={setSelectedState}
                  placeholder="Select a state"
                  className="p-2"
                />
              </div>
            )}

            <div className="row m-auto">
              <div className="col-md-6">
                <Form.Control placeholder="First name" className="p-3 m-auto" />
              </div>
              <div className="col-md-6">
                <Form.Control placeholder="Last name" className="p-3 m-auto" />
              </div>
              {/* <FormControl className="col-md-5 m-auto">
                <OutlinedInput placeholder="Last name" />
              </FormControl> */}
            </div>
            <div className="row m-auto mt-3">
              <div className="col-md-6">
                <Form.Control placeholder="First name" className="p-3 m-auto" />
              </div>
              <div className="col-md-6">
                <Form.Control placeholder="Last name" className="p-3 m-auto" />
              </div>
             
            </div>
            <div className="row m-auto mt-3">
              
              
                <Form.Control placeholder="Address" className="row p-3 m-auto" />
             
             
            </div>
            {/* <div className="row m-auto">
              <FormControl className="row m-auto">
                <OutlinedInput placeholder="Address" />
              </FormControl>
            </div> */}

            {/* <FormControl className="col-md-6 m-auto">
              <OutlinedInput placeholder="Apartment, suite, etc. (optional)" />
            </FormControl>

            <FormControl className="col-md-6 m-auto">
              <OutlinedInput placeholder="City" />
            </FormControl>

            <FormControl className="col-md-6 m-auto">
              <OutlinedInput placeholder="Zip code" />
            </FormControl>

            <FormControl className="col-md-6 m-auto">
              <OutlinedInput placeholder="Phone (optional)" />
            </FormControl> */}
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>

      {/* {selectedCountry && selectedState && (
        <div>
          <p>Selected Country: {selectedCountry.label}</p>
          <p>Selected State: {selectedState.label}</p>
        </div>
      )} */}
    </div>
  );
}
