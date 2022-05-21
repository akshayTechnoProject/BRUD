import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Loader from '../include/Loader';
import Menu from '../include/Menu';
import Footer from '../include/Footer';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

export default function AddDeals(props) {
  const [data, setData] = useState(10);

  const [resto, setResto] = useState([]);
  const [restoList, setRestoList] = useState([]);
  const [restData, setRestData] = useState({});
  const [restoListEmail, setRestoListEmail] = useState([]);

  const getRestoList = () => {
    const myURL = 'http://54.177.165.108:3000/api/admin/deals-restaurants-list';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');

    axios({
      method: 'post',
      url: myURL,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then(async (response) => {
        console.log('getRestoList', response['data']['data']);
        for (let index = 0; index < response['data']['data']?.length; index++) {
          resto.push(response['data']['data'][index]);
          restoList.push(response['data']['data'][index].restaurant_name);
          setResto([...new Set(resto)]);
          setRestoList([...new Set(restoList)]);
        }
        console.log('111', resto);
        console.log('222', restoList);
      })
      .catch((error) => {
        console.log('Errors', error);
      });
  };

  useEffect(() => {
    getRestoList();
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
              <NavLink to="/deals">
                <span className="basePath">Deals</span>
              </NavLink>
            </li>
            <li className="breadcrumb-item currentPath">Add Deals</li>
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
            <h1 className="page-header">Update Restaurant Detail</h1>
          </div>

          <div className="card mainBody">
            <div className="card-body">
              <div
                className="row RestName p-5"
                style={{ borderRadius: '20px' }}
              >
                <div className="mx-auto ">
                  <span style={{ fontSize: '18px', fontWeight: '700' }}>
                    Add Deals
                  </span>
                </div>
              </div>
              <br />
              <form>
                <div className="form-group">
                  <label for="exampleInputEmail1">Restaurant Name:</label>
                  <input
                    type="email"
                    className="form-control ml-0"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Restaurant name"
                    style={{ borderRadius: '20px' }}
                  />
                </div>
                <div class="form-group w-50">
                  <label for="inputState">Restaurant Name:</label>
                  <select
                    id="inputState"
                    class="form-control ml-0"
                    style={{ borderRadius: '20px' }}
                    onChange={(e) => {
                      setRestData(e.target.value);
                      console.log('::::', e.target.value);
                    }}
                  >
                    <option selected>Choose Restaurant</option>
                    {resto.map((e, i) => {
                      if (
                        e?.restaurant_name != '' &&
                        e?.restaurant_name != undefined &&
                        e?.restaurant_name != 'N/A'
                      ) {
                        return (
                          <option value={(e?.id, e?.restaurant_name, e?.email)}>
                            {e?.restaurant_name} : {e?.email}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Items:</label>
                  <input
                    type="password"
                    className="form-control ml-0"
                    id="exampleInputPassword1"
                    placeholder="items"
                    style={{ borderRadius: '20px' }}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Title:</label>
                  <input
                    type="password"
                    className="form-control ml-0"
                    id="exampleInputPassword1"
                    placeholder="title"
                    style={{ borderRadius: '20px' }}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">PTS One:</label>
                  <input
                    type="password"
                    className="form-control ml-0"
                    id="exampleInputPassword1"
                    placeholder="pts one"
                    style={{ borderRadius: '20px' }}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Short Description:</label>
                  <input
                    type="password"
                    className="form-control ml-0"
                    id="exampleInputPassword1"
                    placeholder="short description"
                    style={{ borderRadius: '20px' }}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">Description:</label>
                  <textarea
                    className="form-control ml-0"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    style={{ borderRadius: '20px' }}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Terms Conditions:</label>
                  <input
                    type="password"
                    className="form-control ml-0"
                    id="exampleInputPassword1"
                    placeholder="terms conditions"
                    style={{ borderRadius: '20px' }}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Image:</label>
                  <br />
                  <input
                    type="file"
                    name="image"
                    //onChange={uploadPicture}
                    style={{ marginLeft: '-10px' }}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Start Date:</label>
                  <input
                    type="password"
                    className="form-control ml-0"
                    id="exampleInputPassword1"
                    placeholder="start date"
                    style={{ borderRadius: '20px' }}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">End Date:</label>
                  <input
                    type="password"
                    className="form-control ml-0"
                    id="exampleInputPassword1"
                    placeholder="end date"
                    style={{ borderRadius: '20px' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
