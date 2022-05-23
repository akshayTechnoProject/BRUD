import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Loader from '../include/Loader';
import Menu from '../include/Menu';
import Footer from '../include/Footer';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

export default function AddDeals(props) {
  const [data, setData] = useState(10);

  const [resto, setResto] = useState([]);
  const [getItemList, setGetItemList] = useState();
  const [restoList, setRestoList] = useState([]);
  const [itemID, setItemID] = useState();
  const [itemName, setItemName] = useState();
  const [change, setChange] = useState(false);
  const [itemIDArray, setItemIDArray] = useState([]);
  const [itemNameArray, setItemNameArray] = useState([]);
  const [restDataID, setRestDataID] = useState();

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
  }, [change]);

  const selectRestaurant = async (e) => {
    console.log('::::', e.target.value);
    await getItem(e.target.value);
  };
  const getItem = (id) => {
    const myURL =
      'http://54.177.165.108:3000/api/admin/deals-restaurants-items-list';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
    bodyFormData.append('restaurant_id', id);

    axios({
      method: 'post',
      url: myURL,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then(async (response) => {
        console.log('getItemList', response['data']['data']);
        setGetItemList(response['data']['data']);
      })
      .catch((error) => {
        console.log('Errors', error);
      });
  };
  const selectItem = (e) => {
    console.log('Item Id:', e.target.value);
    setItemID(e.target.value);
  };

  console.log('Item Array:', itemIDArray);

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
                <div class="form-group w-75">
                  <label for="inputState">Restaurant Name:</label>
                  <select
                    id="inputState"
                    class="form-control ml-0"
                    style={{ borderRadius: '20px' }}
                    onChange={(e) => {
                      setRestDataID(e.target.value);
                      selectRestaurant(e);
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
                          <option value={e?.id}>
                            {e?.restaurant_name} : {e?.email}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
                {restDataID && getItemList ? (
                  <div class="form-group w-75">
                    <label for="inputState">Items:</label>
                    <div className="d-flex">
                      <select
                        id="inputState"
                        class="form-control ml-0"
                        style={{ borderRadius: '20px' }}
                        onChange={selectItem}
                      >
                        <option selected>Choose Items</option>
                        {getItemList.map((e, i) => {
                          return (
                            <option value={e?.id} name={e?.item_name}>
                              {e?.item_name}
                            </option>
                          );
                        })}
                      </select>
                      <button
                        className="btn btn-sm btn-primary ml-2"
                        style={{
                          borderRadius: '20px',
                          height: '30px',
                          marginTop: '6px',
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          if (itemID)
                            setItemIDArray([
                              ...new Set([...itemIDArray, itemID]),
                            ]);
                          setItemNameArray([
                            ...new Set([...itemNameArray, itemID]),
                          ]);
                          setItemID('');
                        }}
                      >
                        Add
                      </button>
                    </div>
                    <div className="topDestinationsDiv row">
                      {itemIDArray.length !== 0 ? (
                        <div className="row ml-2 mt-2">
                          {itemIDArray.map((subItems, i) => {
                            return (
                              <button
                                className="btn btn-primary m-4 placeButton"
                                style={{ borderRadius: '20px' }}
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                {subItems}
                                <span className="placeDeleteIcon">
                                  <i
                                    className="fa fa-trash placeDeleteIcon"
                                    onClick={(e1) => {
                                      e1.preventDefault();
                                      let array = itemIDArray;
                                      let index = i;

                                      if (index !== -1) {
                                        array.splice(index, 1);
                                        setItemIDArray(array);
                                        setChange(!change);
                                      }
                                    }}
                                  ></i>
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
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
