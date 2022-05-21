import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../include/Loader';
import Menu from '../include/Menu';
import Footer from '../include/Footer';
import { NavLink, useHistory } from 'react-router-dom';

export default function RestoDetails() {
  const location = useLocation();
  var data = location.state;
  useEffect(() => {
    document.getElementById('page-loader').style.display = 'none';

    var element = document.getElementById('page-container');
    element.classList.add('show');
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
            <li className="breadcrumb-item">
              <NavLink to="/restaurants">
                <span className="basePath">Restaurants</span>
              </NavLink>
            </li>
            <li className="breadcrumb-item currentPath">
              {data.restaurant_name}
            </li>
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
            <h1 className="page-header">Restaurant Detail</h1>
          </div>

          <div className="card mainBody">
            <div className="card-body">
              <div
                className="row RestName p-5"
                style={{ borderRadius: '20px' }}
              >
                <div className="mx-auto ">
                  <span style={{ fontSize: '18px', fontWeight: '700' }}>
                    {data.restaurant_name}
                  </span>
                </div>
              </div>
              <br />

              <div className="row">
                {/* <div className="RestData"> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Restaurant Name</span>
                  <br />
                  <span className="restaurant_data">
                    {data.restaurant_name}
                  </span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Restaurant Email</span>
                  <br />
                  <span className="restaurant_data">{data.email}</span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Phone no</span>
                  <br />
                  <span className="restaurant_data">{data.phone_number}</span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Manager name</span>
                  <br />
                  <span className="restaurant_data">{data.manager_name}</span>
                </div>
              </div>
              <div className="row ">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail ">
                  <span className="restaurant_heading">Since</span>
                  <br />
                  <span className="restaurant_data">
                    {data.createdAt.slice(0, 10)}
                  </span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">Address</span>
                  <br />
                  <span className="restaurant_data">{data.full_address}</span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">City</span>
                  <br />
                  <span className="restaurant_data">{data.city}</span>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 restaurantDetail">
                  <span className="restaurant_heading">State</span>
                  <br />
                  <span className="restaurant_data">{data.state}</span>
                </div>
                <br />
              </div>
              <br />
              <span className="restaurant_heading">Restaurant Image</span>
              <br />
              <div className="restaurantImage">
                {/* <img src={data.image} alt="RestoImage" /> */}
                {data.images[0] != '' ? (
                  data.images[0]
                    ?.toString()
                    ?.split(',')
                    ?.map((e, i) => {
                      {
                        /* console.log(e); */
                      }
                      return (
                        <>
                          <img
                            className="restaurant_Image"
                            src={
                              'http://54.177.165.108:3000/uploads/' +
                              e.toString()
                            }
                            alt="RestoImage"
                          />
                        </>
                      );
                    })
                ) : (
                  <>
                    <img
                      src={'/assets/img/icon/restaurantIcon.png'}
                      alt="RestoImage"
                      style={{
                        width: '100px',
                        height: '100px',
                        margin: '10px',
                      }}
                    />
                  </>
                )}
              </div>

              <br />
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="table-responsive">
                        <table id="order-listing" className="table">
                          <thead>
                            <tr>
                              <th>Sunday</th>
                              <th>Monday</th>
                              <th>Tuesday</th>
                              <th>Wednesday</th>
                              <th>Thursday</th>
                              <th>Friday</th>
                              <th>Saturday</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.cafe_timing.map((e, i) => {
                              return (
                                <tr>
                                  <td>
                                    <b>Time :</b> {e?.sunday?.time}
                                  </td>

                                  <td>
                                    <b>Time :</b> {e?.monday?.time}
                                  </td>
                                  {/* <td><b>Time :</b> {e?.tuesday?.time}</td> */}
                                  <td>
                                    <b>Start :</b> {e?.tuesday?.start}
                                    <br />
                                    <b>End :</b> {e?.tuesday?.end}
                                  </td>
                                  {/* <td>{e?.wednesday?.time}</td> */}
                                  <td>
                                    <b>Start :</b> {e?.wednesday?.start}
                                    <br />
                                    <b>End :</b> {e?.wednesday?.end}
                                  </td>
                                  {/* <td>{e?.thursday?.time}</td> */}
                                  <td>
                                    <b>Start :</b> {e?.thursday?.start}
                                    <br></br>
                                    <b>End :</b> {e?.thursday?.end}
                                  </td>
                                  <td>
                                    <b>Time :</b> {e?.friday?.time}
                                  </td>
                                  <td>
                                    <b>Time :</b> {e?.saturday?.time}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
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
