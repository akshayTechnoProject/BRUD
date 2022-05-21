import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './include/Loader';
import Menu from './include/Menu';
import Footer from './include/Footer';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function OrdersDetails() {
  const location = useLocation();
  console.log(location.state);
  var data = location.state;
  const [orderData, setOrderData] = useState([]);
  const [restoList, setRestoList] = useState([]);

  const getOrderDetail = () => {
    const myurl = 'http://54.177.165.108:3000/api/admin/order-details';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
    bodyFormData.append('order_id', data._id);

    axios({
      method: 'post',
      url: myurl,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        console.log('Order ::::::::::::', response['data']['data']);

        setOrderData(response['data']['data']);
      })
      .catch((error) => {
        console.log('Errors', error);
      });
  };
  const getResto = () => {
    const myurl = 'http://54.177.165.108:3000/api/admin/restaurants-details';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
    bodyFormData.append('restaurant_id', data.restaurant_id);

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
    getOrderDetail();
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
  }
  return (
    <>
      <Loader />

      <div
        id="page-container"
        className="fade page-sidebar-fixed page-header-fixed"
      >
        <Menu />
        {console.log(data)}

        <div id="content" className="content">
          <ol className="breadcrumb float-xl-right">
            <li className="breadcrumb-item">
              <NavLink to="/restaurants">
                <span className="basePath">Orders</span>
              </NavLink>
            </li>
            <li className="breadcrumb-item currentPath">Orders Details</li>
          </ol>
          <div style={{ display: 'flex' }}>
            <i
              className="fa fa-arrow-left"
              onClick={useHistory().goBack}
              style={{
                cursor: 'pointer',
                fontSize: '20px',
                marginTop: '7px',
                marginRight: '10px',
              }}
            ></i>
            <h1 className="page-header">Orders Detail</h1>
          </div>

          <div className="card mainBody">
            <div className="card-body">
              <div
                className="row RestName p-5"
                style={{ borderRadius: '20px' }}
              >
                <div className="mx-auto ">
                  <span style={{ fontSize: '18px', fontWeight: '700' }}>
                    Order Detail
                  </span>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Order Code</span>
                  <br />
                  <span className="restaurant_data">{data.order_code}</span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Items Count</span>
                  <br />
                  <span className="restaurant_data">{data.items_count}</span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Total</span>
                  <br />
                  <span className="restaurant_data">{data.total}</span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Payment Type</span>
                  <br />
                  <span className="restaurant_data">{data.payment_type}</span>
                </div>
              </div>
              <br />

              <div className="row p-5" style={{ borderRadius: '20px' }}>
                <div className="mx-auto ">
                  <span style={{ fontSize: '18px', fontWeight: '700' }}>
                    Restaurant Detail
                  </span>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Restaurant Name</span>
                  <br />
                  <span className="restaurant_data">
                    {restoList.restaurant_name}
                  </span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Restaurant Email</span>
                  <br />
                  <span className="restaurant_data">{restoList.email}</span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Phone no</span>
                  <br />
                  <span className="restaurant_data">
                    {restoList.phone_number}
                  </span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Manager name</span>
                  <br />
                  <span className="restaurant_data">
                    {restoList.manager_name}
                  </span>
                </div>
              </div>

              <br />
              <div className="row p-5" style={{ borderRadius: '20px' }}>
                <div className="mx-auto ">
                  <span style={{ fontSize: '18px', fontWeight: '700' }}>
                    Cart Items
                  </span>
                </div>
              </div>

              <div className="team-boxed">
                <div className="row people">
                  {data?.cart_items != '' ? (
                    data?.cart_items?.map((e, i) => {
                      console.log('orderCartDetail:::::', e);
                      return (
                        <>
                          <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6 col-12 item">
                            <div className="box">
                              {e?.item_image ? (
                                <>
                                  <img
                                    className="CardImage"
                                    src={e?.item_image}
                                    alt="Card-img"
                                  />
                                </>
                              ) : (
                                <>
                                  <img
                                    src={'/assets/img/icon/food-icon.png'}
                                    alt="CardImage"
                                  />
                                </>
                              )}
                              <div className="boxDetail">
                                <h3 className="name">
                                  Item Name: {e.item_name}
                                </h3>
                                <p className="title">
                                  Total Items: {e.item_total}
                                </p>
                                <p className="title">modifiers</p>
                                {e.modifiers != ''
                                  ? e?.modifiers?.map((x, j) => {
                                      return (
                                        <>
                                          {j % 2 == 0 ? (
                                            <p className="modifiers mt-1">
                                              <b>Item:</b> {x}
                                            </p>
                                          ) : null}
                                          {j % 2 != 0 ? (
                                            <>
                                              <div className="modifiersList mb-3">
                                                <p className="modifiersListItem">
                                                  <b>Modifier Name:</b>{' '}
                                                  {x?.modifier_name != ''
                                                    ? x?.modifier_name
                                                    : 'N/A'}
                                                </p>
                                                <p className="modifiersListItem">
                                                  <b>Price:</b>{' '}
                                                  {x?.price != ''
                                                    ? x?.price
                                                    : 'N/A'}
                                                </p>
                                              </div>
                                            </>
                                          ) : null}
                                        </>
                                      );
                                    })
                                  : null}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <div className="row mx-auto">
                        <img
                          src={'/assets/img/icon/cart-icon.png'}
                          alt="image"
                          style={{
                            width: '100px',
                            height: '100px',
                            margin: '10px',
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <br />
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
