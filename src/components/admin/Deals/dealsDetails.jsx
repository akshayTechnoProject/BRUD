import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
// import { toast } from "react-toastify";
import { TableHeader, Pagination, Search } from '../Table';
import { Dropdown, Table } from 'react-bootstrap';
import Loader from '../include/Loader';
import Menu from '../include/Menu';
import axios from 'axios';

const DealsDetails = () => {
  const location = useLocation();
  var data = location.state;
  console.log('lll', data);
  const [dealsDetails, setDealsDetails] = useState([]);
  const [restoList, setRestoList] = useState([]);
  const [dealsList, setDealsList] = useState({
    createdAt: data?.createdAt ? setDateFormat(data?.createdAt) : 'N/A',
    description: data?.description ? data?.description : 'N/A',
    end_date: data?.end_date ? data?.end_date : 'N/A',
    id: data?.id ? data?.id : 'N/A',

    item_id: data?.item_id ? data?.item_id : 'N/A',
    pts_one: data?.pts_one ? data?.pts_one : 'N/A',
    short_desc: data?.short_desc ? data?.short_desc : 'N/A',
    start_date: data?.start_date ? data?.start_date : 'N/A',
    status: data?.status ? data?.status : 'N/A',
    terms_conditions: data?.terms_conditions ? data?.terms_conditions : 'N/A',
    title: data?.title ? data?.title : 'N/A',
    pts_two: data?.pts_two ? data?.pts_two : 'N/A',
    updatedAt: data?.updatedAt ? setDateFormat(data?.updatedAt) : 'N/A',
    restaurant_id: data?.restaurant_id ? data?.restaurant_id : 'N/A',
    image: data?.image ? (
      <img src={data?.image} width="70px" height="60px" alt="Img" />
    ) : (
      <img
        src="./assets/img/icon/food-icon.png"
        width="50px"
        height="50px"
        alt="Img"
      />
    ),
  });
  console.log('aaa', dealsList);

  const getDealsDetails = () => {
    const myURL = 'http://54.177.165.108:3000/api/admin/deals-details';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
    bodyFormData.append('deals_id', data?.id);
    //628781baa69c40c2d7eec292
    axios({
      method: 'post',
      url: myURL,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        console.log('.....Details', response['data']['data']);
        setDealsDetails(response['data']['data']);
      })
      .catch((error) => {
        console.log('Errors', error);
      });
  };

  const getResto = () => {
    const myurl = 'http://54.177.165.108:3000/api/admin/restaurants-details';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
    bodyFormData.append('restaurant_id', data?.restaurant_id);

    axios({
      method: 'post',
      url: myurl,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        console.log('Rest ::::::::::::', response['data']['data']);

        setRestoList(response['data']['data']);
      })
      .catch((error) => {
        console.log('Errors', error);
      });
  };

  useEffect(() => {
    getDealsDetails();
    getResto();
    document.getElementById('page-loader').style.display = 'none';

    var element = document.getElementById('page-container');
    element.classList.add('show');
  }, []);

  function setDateFormat(e) {
    var d = new Date(e);
    return (
      ('0' + d.getDate()).slice(-2) +
      '-' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '-' +
      d.getFullYear() +
      ' ' +
      tConvert(
        ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2)
      )
    );
  }

  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }
  return (
    <>
      <Loader />

      <div
        id="page-container"
        className="fade page-sidebar-fixed page-header-fixed"
      >
        <Menu />

        <div id="content" className="content">
          <ol className="breadcrumb float-xl-right">
            <li className="breadcrumb-item">
              <NavLink to="/deals">
                <span className="basePath">Deals</span>
              </NavLink>
            </li>
            <li className="breadcrumb-item currentPath">Details</li>
          </ol>
          <div style={{ display: 'flex' }}>
            <i
              class="fa fa-arrow-left edit"
              onClick={useHistory().goBack}
              style={{
                cursor: 'pointer',
                fontSize: '20px',
                marginTop: '7px',
                marginRight: '10px',
              }}
            ></i>
            <h1 className="page-header">Deals Detail</h1>
          </div>

          <div className="card mainBody">
            <div className="card-body">
              <div
                className="row RestName p-5"
                style={{ borderRadius: '20px' }}
              >
                <div className="mx-auto ">
                  <span style={{ fontSize: '18px', fontWeight: '700' }}>
                    {dealsList.title}
                  </span>
                </div>
              </div>
              <br />

              <div className="row ">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Start Date</span>
                  <br />
                  <span className="restaurant_data">
                    {dealsList.start_date}
                  </span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">End Date</span>
                  <br />
                  <span className="restaurant_data">{dealsList.end_date}</span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Pts One</span>
                  <br />
                  <span className="restaurant_data">{dealsList.pts_one}</span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail ">
                  <span className="restaurant_heading">Updated At</span>
                  <br />
                  <span className="restaurant_data">{dealsList.updatedAt}</span>
                </div>
                <br />
              </div>

              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Restaurant Name</span>
                  <br />
                  <span className="restaurant_data">
                    {restoList?.restaurant_name
                      ? restoList?.restaurant_name
                      : 'N/A'}
                  </span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Restaurant Email</span>
                  <br />
                  <span className="restaurant_data">
                    {restoList?.email ? restoList?.email : 'N/A'}
                  </span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Phone no</span>
                  <br />
                  <span className="restaurant_data">
                    {restoList?.phone_number ? restoList?.phone_number : 'N/A'}
                  </span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Manager name</span>
                  <br />
                  <span className="restaurant_data">
                    {restoList?.manager_name ? restoList?.manager_name : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 restaurantDetail">
                  <span className="restaurant_heading">Terms Conditions</span>
                  <br />
                  <span className="restaurant_data">
                    {dealsDetails?.terms_conditions
                      ? dealsDetails?.terms_conditions
                      : 'N/A'}
                  </span>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 restaurantDetail">
                  <span className="restaurant_heading">Short Description</span>
                  <br />
                  <span className="restaurant_data">
                    {dealsDetails?.short_desc
                      ? dealsDetails?.short_desc
                      : 'N/A'}
                  </span>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 restaurantDetail">
                  <span className="restaurant_heading">Description</span>
                  <br />
                  <span className="restaurant_data">
                    {dealsDetails?.description
                      ? dealsDetails?.description
                      : 'N/A'}
                  </span>
                </div>
              </div>

              <span className="restaurant_heading">Image</span>
              <br />
              <div className="restaurantImage">
                {dealsDetails?.image != '' ? (
                  <img
                    className="restaurant_Image"
                    src={dealsDetails?.image}
                    alt="foodImage"
                  />
                ) : (
                  <>
                    <img
                      src={'/assets/img/icon/food-icon.png'}
                      alt="foodImage"
                      style={{
                        width: '100px',
                        height: '100px',
                        margin: '10px',
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealsDetails;
