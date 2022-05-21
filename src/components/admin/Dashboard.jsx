import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import Loader from './include/Loader';
import Menu from './include/Menu';
import Footer from './include/Footer';
import axios from 'axios';

function Dashboard() {
  const [restaurants, setRestaurants] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [orders, setOrders] = useState(0);

  const getDashboard = () => {
    const myurl = 'http://54.177.165.108:3000/api/admin/dashboard-widget';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');

    axios({
      method: 'post',
      url: myurl,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        setRestaurants(response['data']['data']['restaurant']);
        setCustomers(response['data']['data']['users']);
        setOrders(response['data']['data']['order']);
      })
      .catch((error) => {
        console.log('Errors', error);
      });
  };

  useEffect(() => {
    document.getElementById('page-loader').style.display = 'none';

    var element = document.getElementById('page-container');
    element.classList.add('show');

    getDashboard();
  }, []);

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
            <li className="breadcrumb-item basePath ">
              <a href="javascript:;">Home</a>
            </li>
            <li className="breadcrumb-item active currentPath">Dashboard</li>
          </ol>
          <h1 className="page-header">Dashboard </h1>
          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="widget widget-stats bg-blue">
                <div className="stats-icon">
                  <i className="fa fa-building"></i>
                </div>
                <div className="stats-info">
                  <h4>Total Restaurants</h4>
                  <p>{restaurants}</p>
                </div>
                <div className="stats-link">
                  <NavLink to="/restaurants">
                    View Detail <i className="fa fa-arrow-alt-circle-right"></i>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="widget widget-stats bg-info">
                <div className="stats-icon">
                  <i className="fa fa-users"></i>
                </div>
                <div className="stats-info">
                  <h4>Total Customers</h4>
                  <p>{customers}</p>
                </div>
                <div className="stats-link">
                  <NavLink to="/customers">
                    View Detail <i className="fa fa-arrow-alt-circle-right"></i>
                  </NavLink>
                </div>
              </div>
            </div>
            {/* <div className="col-xl-3 col-md-6">
                  <div className="widget widget-stats bg-orange">
                     <div className="stats-icon"><i className="fa fa-dollar-sign"></i></div>
                     <div className="stats-info">
                        <h4>Total Revenue</h4>
                        <p>1,291,922</p>
                     </div>
                     <div className="stats-link">
                        <a href="javascript:;">View Detail <i className="fa fa-arrow-alt-circle-right"></i></a>
                     </div>
                  </div>
               </div> */}
            <div className="col-xl-3 col-md-6">
              <div className="widget widget-stats bg-red">
                <div className="stats-icon">
                  <i className="fa fa-shopping-cart"></i>
                </div>
                <div className="stats-info">
                  <h4>Total Orders</h4>
                  <p>{orders}</p>
                </div>
                <div className="stats-link">
                  <NavLink to="/orders">
                    View Detail <i className="fa fa-arrow-alt-circle-right"></i>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
