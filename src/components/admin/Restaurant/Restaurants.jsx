import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
// import { toast } from "react-toastify";
import { TableHeader, Pagination, Search } from '../Table';
import { Dropdown, Table } from 'react-bootstrap';
import Loader from '../include/Loader';
import Menu from '../include/Menu';
// import Footer from "./include/Footer";
import axios from 'axios';

const Restaurants = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: '', order: '' });
  const [limit, setlimit] = useState(10);
  const Header = [
    {
      name: 'Sr. NO.',
      field: 'sr_no',
      sortable: false,
    },
    {
      name: 'Image',
      field: 'image',
      sortable: false,
    },
    {
      name: 'Restaurant Name',
      field: 'restaurant_name',
      sortable: false,
    },
    {
      name: 'Manager Name',
      field: 'manager_name',
      sortable: false,
    },
    {
      name: 'Email',
      field: 'email',
      sortable: false,
    },
    {
      name: 'Phone Number',
      field: 'phone_number',
      sortable: false,
    },
    {
      name: 'Address',
      field: 'address',
      sortable: false,
    },
    {
      name: 'Created At',
      field: 'createdAt',
      sortable: false,
    },
    {
      name: 'Details',
      field: 'details',
      sortable: false,
    },
    {
      name: 'Update',
      field: 'Update',
      sortable: false,
    },
    {
      name: 'Menu',
      field: 'Menu',
      sortable: false,
    },
  ];
  let history = useHistory();

  const [restoList, setRestoList] = useState([]);
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
  const getResto = () => {
    const myurl = 'http://54.177.165.108:3000/api/admin/restaurants-list';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');

    axios({
      method: 'post',
      url: myurl,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        console.log(response['data']['data']);
        var indexedData = response['data']['data']?.map((e, i) => {
          e = { ...e };
          e = { ...e, sr_no: i + 1 };
          e = {
            ...e,
            createdAt: setDateFormat(e.createdAt),
            email: e.email ? e.email : 'N/A',
            restaurant_name: e.restaurant_name ? e.restaurant_name : 'N/A',
            manager_name: e.manager_name ? e.manager_name : 'N/A',

            phone_number: e.phone_number ? e.phone_number : 'N/A',
            full_address: e.full_address ? e.full_address : 'N/A',
            createdat: e.createdat ? e.createdat : 'N/A',
          };
          return e;
        });
        setRestoList(indexedData);
      })
      .catch((error) => {
        console.log('Errors', error);
      });
  };

  useEffect(() => {
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
  const commentsData = useMemo(() => {
    let computedComments = restoList;

    if (search) {
      computedComments = computedComments.filter(
        (restoList) =>
          restoList.restaurant_name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          restoList.manager_name.toLowerCase().includes(search.toLowerCase()) ||
          restoList.email.toLowerCase().includes(search.toLowerCase()) ||
          restoList.phone_number.toLowerCase().includes(search.toLowerCase()) ||
          restoList.full_address.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTotalItems(computedComments.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;
      computedComments = computedComments.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedComments.slice(
      (currentPage - 1) * limit,
      (currentPage - 1) * limit + limit
    );
  }, [currentPage, search, sorting, restoList, limit]);
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
              <NavLink to="/dashboard">
                <span className="basePath">Dashboard</span>
              </NavLink>
            </li>
            <li className="breadcrumb-item active currentPath">Restaurants</li>
          </ol>
          <h1 className="page-header">Restaurants</h1>

          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '20px',
            }}
          >
            <div className="row w-100">
              <div className="mb-3 col-12 text-center">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-sm-6 col-12 mb-3">
                    <div className="ml-0">
                      <div className="d-flex">
                        <h5 className="mt-2 mr-1">Search: </h5>
                        <Search
                          onSearch={(value) => {
                            setSearch(value);
                            setCurrentPage(1);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-sm-6 col-12 d-flex justify-content-end mb-3">
                    <div
                      style={{
                        color: 'black',
                        fontSize: '12px',
                        fontWeight: '300',
                        paddingTop: '0px',
                        paddingBottom: '0px',
                      }}
                      className="align-self-center"
                    >
                      <b>Rows per page :&nbsp;</b>
                    </div>
                    <div className="align-self-center">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="none"
                          id="dropdown-basic"
                          style={{
                            cursor: 'auto',
                            backgroundColor: 'white',
                            borderColor: '#d5dbe0',
                            paddingBottom: '3px',
                            paddingTop: '3px',
                          }}
                        >
                          {limit}&nbsp;<i className="fa fa-caret-down"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {limit !== 10 ? (
                            <>
                              <Dropdown.Item
                                onClick={() => {
                                  setlimit(10);
                                }}
                              >
                                10
                              </Dropdown.Item>
                            </>
                          ) : null}

                          {limit !== 20 ? (
                            <>
                              <Dropdown.Item
                                onClick={() => {
                                  setlimit(20);
                                }}
                              >
                                20
                              </Dropdown.Item>
                            </>
                          ) : null}

                          {limit !== 30 ? (
                            <>
                              <Dropdown.Item
                                onClick={() => {
                                  setlimit(30);
                                }}
                              >
                                30
                              </Dropdown.Item>
                            </>
                          ) : null}

                          {limit !== 50 ? (
                            <>
                              <Dropdown.Item
                                onClick={() => {
                                  setlimit(50);
                                }}
                              >
                                50
                              </Dropdown.Item>
                            </>
                          ) : null}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>

                <div className="row ">
                  <div className="col-12">
                    <div className="table-responsive">
                      <Table striped bordered hover>
                        <thead>
                          <TableHeader
                            headers={Header}
                            onSorting={(field, order) =>
                              setSorting({ field, order })
                            }
                          />
                        </thead>
                        <tbody>
                          {commentsData.map((e, i) => (
                            <tr>
                              <td>{e.sr_no}</td>
                              <td>
                                {e?.image?.match('undefined') != 'undefined' ? (
                                  e?.image != null ? (
                                    <img
                                      src={e.image}
                                      width="70px"
                                      height="60px"
                                      alt="restoImg"
                                    />
                                  ) : (
                                    <img
                                      src="./assets/img/icon/restaurantIcon.png"
                                      width="50px"
                                      height="50px"
                                      alt="customer"
                                    />
                                  )
                                ) : (
                                  <img
                                    src="./assets/img/icon/restaurantIcon.png"
                                    width="50px"
                                    height="50px"
                                    alt="customer"
                                  />
                                )}
                              </td>
                              <td>{e.restaurant_name}</td>
                              <td>{e.manager_name}</td>
                              <td>{e.email}</td>
                              <td>{e.country_code + ' ' + e.phone_number}</td>
                              <td>
                                {e.full_address +
                                  ', ' +
                                  e.state +
                                  ', ' +
                                  e.city}
                              </td>

                              <td>{e.createdAt}</td>
                              <td
                                onClick={() =>
                                  history.push({
                                    pathname: '/restaurantDetails',
                                    state: e,
                                  })
                                }
                              >
                                <i
                                  className="fa fa-eye edit"
                                  style={{ cursor: 'pointer' }}
                                ></i>
                              </td>
                              <td
                                onClick={() =>
                                  history.push({
                                    pathname: '/updateRestaurantDetails',
                                    state: e,
                                  })
                                }
                              >
                                <i
                                  className="fa fa-pen edit"
                                  style={{ cursor: 'pointer' }}
                                ></i>
                              </td>
                              <td
                                onClick={() =>
                                  history.push({
                                    pathname: '/restaurantItems',
                                    state: e.id,
                                  })
                                }
                              >
                                <i
                                  className="fa fa-bars edit"
                                  style={{ cursor: 'pointer' }}
                                ></i>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
                <div
                  className="mt-2 d-flex justify-content-sm-center justify-content-xs-center justify-content-lg-end"
                  style={{
                    overflowX: 'auto',
                  }}
                >
                  <Pagination
                    total={totalItems}
                    itemsPerPage={limit}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurants;
