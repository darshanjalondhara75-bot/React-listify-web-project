import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../actions/auth';
import { getUser } from '../actions/user';
import { toast } from 'react-toastify';

const BusinessInfo = () => {
  const { user, token } = isAuthenticated();
  const [businessInfo, setBusinessInfo] = useState({
    businessName: '',
    businessType: '',
    businessDescription: '',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const res = await getUser(user._id);
      if (res.data.businessInfo) {
        setBusinessInfo(res.data.businessInfo);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleChange = (e) => {
    setBusinessInfo({
      ...businessInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to save business info
      toast.success('Business information saved successfully!');
    } catch (error) {
      toast.error('Failed to save business information');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card card-shadow">
            <div className="card-header">
              <h4 className="text-dark1">Business Information</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Business Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="businessName"
                        value={businessInfo.businessName}
                        onChange={handleChange}
                        placeholder="Enter business name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Business Type</label>
                      <input
                        type="text"
                        className="form-control"
                        name="businessType"
                        value={businessInfo.businessType}
                        onChange={handleChange}
                        placeholder="Enter business type"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Business Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="businessDescription"
                    value={businessInfo.businessDescription}
                    onChange={handleChange}
                    placeholder="Describe your business"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Business Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="businessAddress"
                        value={businessInfo.businessAddress}
                        onChange={handleChange}
                        placeholder="Enter business address"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Business Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="businessPhone"
                        value={businessInfo.businessPhone}
                        onChange={handleChange}
                        placeholder="Enter business phone"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Business Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="businessEmail"
                    value={businessInfo.businessEmail}
                    onChange={handleChange}
                    placeholder="Enter business email"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Save Business Information
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;

