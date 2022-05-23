import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

function Menu() {
  const history = useHistory();
  if (localStorage.getItem('BRUD_Admin_ID') == null) {
    toast.error('Please login first...!');
    history.push(`/brud-admin`);
  }

  const Logout = () => {
    localStorage.removeItem('BRUD_Admin_ID');
    localStorage.removeItem('BRUD_Admin_EMAIL');
    localStorage.removeItem('BRUD_Admin_NAME');
    toast.success('Logout Successfully...!');
    history.push(`/brud-admin`);
  };

  var dashboardClass = window.location.pathname.match(/^\/dashboard/)
    ? 'active'
    : '';
  var restaurantsClass =
    window.location.pathname.match(/^\/restaurants/) ||
    window.location.pathname.match(/^\/restaurantItems/) ||
    window.location.pathname.match(/^\/restaurantModifier/) ||
    window.location.pathname.match(/^\/restaurantDetails/) ||
    window.location.pathname.match(/^\/updateRestaurantDetails/)
      ? 'active'
      : '';

  // var addRestaurantsClass = window.location.pathname.match(/^\/add-restaurant/) ? "active" : "";

  var customersClass = window.location.pathname.match(/^\/customers/)
    ? 'active'
    : '';
  //  if(addRestaurantsClass=='active'){
  //      restaurantsClass = 'active';
  //  }
  var bannersClass = window.location.pathname.match(/^\/banners/)
    ? 'active'
    : '';

  var categoryClass = window.location.pathname.match(/^\/category/)
    ? 'active'
    : '';
  var dealsClass =
    window.location.pathname.match(/^\/deals/) ||
    window.location.pathname.match(/^\/updateDeals/) ||
    window.location.pathname.match(/^\/dealsDetails/)
      ? 'active'
      : '';

  var orderClass = window.location.pathname.match(/^\/orders/) ? 'active' : '';

  return (
    <>
      <div id="header" className="header navbar-default">
        <div className="navbar-header">
          <NavLink to="/dashboard" className="navbar-brand ">
            <img
              src="/assets/img/logo/adminLogo.png"
              alt="BRUD-logo"
              className="d-inline-block align-text-top mr-2"
            />
            <span className="BrudAdmin">
              <b>BRUD</b> Admin
            </span>
          </NavLink>

          {/* <span className="navbar-logo">
              <img src="/assets/img/logo/adminLogo.png" alt="adminLogo"></img>
            </span>
            <span className="BrudAdmin">
              <b>BRUD</b> Admin
            </span> */}

          <button
            type="button"
            className="navbar-toggle"
            data-click="sidebar-toggled"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        {/* <button
          type="button"
          className="navbar-toggle"
          data-click="sidebar-toggled"
        >
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button> */}
        <ul className="navbar-nav navbar-right">
          <li className="dropdown navbar-user">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <img src="assets/img/user/user-13.jpg" alt="" />
              <span className="d-none d-md-inline userName">
                {localStorage.getItem('BRUD_Admin_NAME')}
              </span>{' '}
              <b className="caret"></b>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              style={{ borderRadius: '20px', padding: '5px ' }}
            >
              <span className="dropdown-item">
                <NavLink to="/admin-profile" style={{ textDecoration: 'none' }}>
                  <span className="DropdownItem">Edit Profile</span>
                </NavLink>
              </span>
              <a onClick={Logout} className="dropdown-item DropdownItem">
                Log Out
              </a>
            </div>
          </li>
        </ul>
      </div>

      <div id="sidebar" className="sidebar">
        <div data-scrollbar="true" data-height="100%">
          <div className="nav-header">
            {/* <NavLink to="/dashboard" className="navbar-brand ">
              <span className="d-flex">
                <img
                  src="/assets/img/logo/adminLogo.png"
                  alt="BRUD-logo"
                  width="50px"
                  className="d-inline-block align-text-top mr-2 ml-2"
                />
                <span className="BrudAdmin mt-0">
                  <b>BRUD</b> Admin
                </span>
              </span>
              
            </NavLink> */}
            {/* <span className="navbar-logo">
              <img src="/assets/img/logo/adminLogo.png" alt="adminLogo"></img>
            </span>
            <span className="BrudAdmin">
              <b>BRUD</b> Admin
            </span> */}
          </div>
          <ul className="nav">
            <li>
              <NavLink
                to="/dashboard"
                className={dashboardClass}
                activeClassName="active"
              >
                <div className="menuItemDiv">
                  <i className="fa fa-th-large menuIcon"></i>
                  <span className="menuItem">Dashboard</span>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/restaurants"
                className={restaurantsClass}
                activeClassName="active"
              >
                <div className="menuItemDiv">
                  <i className="fa fa-building menuIcon"></i>
                  <span className="menuItem">Restaurants</span>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/customers"
                className={customersClass}
                activeClassName="active"
              >
                <div className="menuItemDiv">
                  <i className="fa fa-users menuIcon"></i>
                  <span className="menuItem">Customers</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/banners"
                className={bannersClass}
                activeClassName="active"
              >
                <div className="menuItemDiv">
                  <i class="fa fa-image menuIcon"></i>
                  {/* <i className="fa fa-building menuIcon"></i> */}
                  <span className="menuItem">Banners</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/category"
                className={categoryClass}
                activeClassName="active"
              >
                <div className="menuItemDiv">
                  <i class="fa fa-list menuIcon"></i>
                  <span className="menuItem">Category</span>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/orders"
                className={orderClass}
                activeClassName="active"
              >
                <div className="menuItemDiv">
                  <i class="fa fa-shopping-cart menuIcon"></i>
                  <span className="menuItem">Orders</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/deals"
                className={dealsClass}
                activeClassName="active"
              >
                <div className="menuItemDiv">
                  {/* <i class="fa fa-handshake menuIcon"></i> */}
                  <i class="fa fa-tags menuIcon"></i>
                  <span className="menuItem ">Deals</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="sidebar-bg"></div>
    </>
  );
}

export default Menu;
