import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import Loader from '../include/Loader';
import Menu from '../include/Menu';
import Footer from '../include/Footer';
import axios from 'axios';
export default function RestoModifier() {
  const [modifierList, setModifierList] = useState([]);
  const location = useLocation();

  var data = location.state;
  useEffect(() => {
    document.getElementById('page-loader').style.display = 'none';

    var element = document.getElementById('page-container');
    element.classList.add('show');
    getMenu();
  }, []);
  const getMenu = () => {
    const myurl =
      'http://54.177.165.108:3000/api/admin/restaurants-items-modifiers';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
    bodyFormData.append('item_id', data);

    axios({
      method: 'post',
      url: myurl,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        setModifierList(response['data']['data']);
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
              {/* <NavLink to="/restaurantItems"> */}
              <span className="basePath" onClick={useHistory().goBack}>
                Restaurant Items
              </span>
              {/* </NavLink> */}
            </li>
            <li className="breadcrumb-item  currentPath">
              Restaurant Modifier
            </li>
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
            <h1 className="page-header">Restaurant Modifier</h1>
          </div>

          <div className="card mainBody">
            <div className="card-body">
              <div
                className="row RestName p-5"
                style={{ borderRadius: '20px' }}
              >
                <div className="mx-auto ">
                  <span style={{ fontSize: '18px', fontWeight: '700' }}>
                    Food Order Detail
                  </span>
                </div>
              </div>
              <br />

              <div className="p-5 d-flex flex-wrap justify-content-around">
                {modifierList.length !== 0 ? (
                  modifierList?.map((e, i) => {
                    return (
                      <>
                        <div
                          className="card editBtn"
                          style={{
                            width: '18rem',
                            borderRadius: '20px',
                            margin: '10px',
                          }}
                        >
                          <div className="card-body ">
                            <span className="font-weight-bold ">
                              {e.group_name}
                              <div className="pull-right">
                                <span className="badge badge-danger">
                                  Price
                                </span>
                              </div>
                            </span>
                            <br />
                            <div className="mt-2">
                              {e.modifiers.map((e, i) => {
                                return (
                                  <>
                                    <span>
                                      {e.modifier_name}
                                      <div className="pull-right mr-1">
                                        {e.price}
                                      </div>
                                    </span>
                                    <br />
                                  </>
                                );
                              })}
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
                        alt="RestoImage"
                        style={{
                          width: '50px',
                          height: '50px',
                          margin: '10px',
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
