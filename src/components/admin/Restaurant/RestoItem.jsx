import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import Loader from '../include/Loader';
import Menu from '../include/Menu';
import Footer from '../include/Footer';
import axios from 'axios';
export default function RestoItems() {
  const [menuList, setMenuList] = useState([]);
  const location = useLocation();
  let history = useHistory();

  var data = location.state;
  useEffect(() => {
    document.getElementById('page-loader').style.display = 'none';

    var element = document.getElementById('page-container');
    element.classList.add('show');
    getMenu();
  }, []);
  const getMenu = () => {
    const myurl = 'http://54.177.165.108:3000/api/admin/restaurants-items';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');

    bodyFormData.append('restaurant_id', data);

    axios({
      method: 'post',
      url: myurl,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        setMenuList(response['data']['data']);
      })
      .catch((error) => {
        console.log('Errors', error);
      });
  };
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
              <NavLink to="/restaurants">
                <span className="basePath">Restaurants</span>
              </NavLink>
            </li>
            <li className="breadcrumb-item  currentPath">Restaurant Items</li>
          </ol>
          <div style={{ display: 'flex' }}>
            <i
              className="fa fa-arrow-left edit"
              onClick={useHistory().goBack}
              style={{
                cursor: 'pointer',
                fontSize: '20px',
                marginTop: '7px',
                marginRight: '10px',
              }}
            ></i>
            <h1 className="page-header"> Restaurant Items</h1>
          </div>

          <div className="card mainBody">
            <div className="card-body">
              <div
                className="row RestName p-5"
                style={{ borderRadius: '20px' }}
              >
                <div className="mx-auto ">
                  <span style={{ fontSize: '18px', fontWeight: '700' }}>
                    Food Order Card
                  </span>
                </div>
              </div>
              <br />

              <div
                className="d-flex flex-wrap justify-content-around"
                style={{ padding: '30px' }}
              >
                {menuList.length !== 0 ? (
                  menuList?.map((e, i) => {
                    return (
                      <div
                        className="card mb-5 mr-2 pb-0 editBtn "
                        style={{
                          width: '15rem',
                          // height: "23rem",
                          borderRadius: '20px',
                        }}
                      >
                        <img
                          className="card-img-top "
                          style={{
                            width: '15rem',
                            height: '12rem',
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px',
                          }}
                          src={
                            !e.image
                              ? 'https://i.imgur.com/eFWRUuR.jpg'
                              : e.image
                          }
                          alt="Card_image_cap"
                        />

                        <div className="card-body ">
                          <h5
                            className="card-title"
                            style={{ marginBottom: '-2px' }}
                          >
                            {e.item_name}
                          </h5>
                          {e.category_type}
                          {e.item_desc ? (
                            <p
                              className="card-text overflow-auto restoScroll"
                              style={{ height: '60px', overflowY: 'scroll' }}
                            >
                              {e.item_desc}
                            </p>
                          ) : (
                            <p
                              className="card-text overflow-auto restoScroll"
                              style={{ minHeight: '60px', overflowY: 'scroll' }}
                            >
                              {e.item_desc}
                            </p>
                          )}
                          {/* <br /> */}

                          <hr />
                          <div>
                            <span>
                              ₹ {e.price.replace('$', '')}
                              <div class="pull-right">
                                <span class="badge badge-success">
                                  {e.product_type}
                                </span>
                              </div>
                            </span>
                            <br />
                            <br />
                            <button
                              className="btn btn-primary  editBtn  "
                              style={{
                                backgroundColor: '#f55800',
                                opacity: '0.8',
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px',
                                borderTopRightRadius: '0px',
                                borderTopLeftRadius: '0px',
                                marginBottom: '-15px',
                                width: '15rem',
                                // padding: "-10px",
                                marginLeft: '-16px',
                                height: '50px',
                                border: 'none',
                              }}
                              onClick={() =>
                                history.push({
                                  pathname: '/restaurantModifier',
                                  state: e.id,
                                })
                              }
                            >
                              View <i className="fa fa-eye text-right " />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="d-flex flex-wrap justify-content-around">
                    {/* No data Available */}
                    <img
                      src={'/assets/img/icon/cart-icon.png'}
                      alt="RestoImage"
                      style={{
                        width: '30px',
                        height: '30px',
                        margin: '10px',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
