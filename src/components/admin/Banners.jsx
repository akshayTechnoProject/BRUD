import React, { useState, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { TableHeader, Pagination, Search } from './Table';
import { Dropdown, Table } from 'react-bootstrap';
import Loader from './include/Loader';
import Menu from './include/Menu';
import Footer from './include/Footer';
import axios from 'axios';

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [addPicture, setAddPicture] = useState(false);
  const [picture, setPicture] = useState({});
  const [pictureName, setPictureName] = useState({});
  const [error, setError] = useState({});
  const [disable, setDisable] = useState(false);
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
      name: 'Delete',
      field: 'delete',
      sortable: false,
    },
  ];
  const getBanners = () => {
    const myurl = 'http://54.177.165.108:3000/api/admin/banners-list';
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

          return e;
        });
        setBanners(indexedData);
      })
      .catch((error) => {
        console.log('Errors', error);
      });
  };

  useEffect(() => {
    getBanners();

    document.getElementById('page-loader').style.display = 'none';

    var element = document.getElementById('page-container');
    element.classList.add('show');
  }, []);

  function deleteBanner(id) {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      const myurl = `http://54.177.165.108:3000/api/admin/delete-banner`;
      var bodyFormData = new URLSearchParams();
      bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
      bodyFormData.append('banner_id', id);
      axios({
        method: 'post',
        url: myurl,
        data: bodyFormData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .then((response) => {
          console.log('delete', response);
          getBanners();
        })
        .catch((error) => {
          console.log('Errors', error);
        });
    }
  }

  const uploadPicture = async (e) => {
    e.preventDefault();

    setDisable(true);
    setPicture(e.target.files[0]);
    setAddPicture(true);
    console.log('PHOTO===>', e?.target?.files[0]);

    const myurl = `http://54.177.165.108:3000/api/admin/upload-img`;
    var bodyFormData = new FormData();
    bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
    bodyFormData.append('image', e?.target?.files[0]);
    //alert(bodyFormData);
    axios({
      method: 'post',
      url: myurl,
      data: bodyFormData,
    })
      .then((result) => {
        console.log('Success:=====', result);
        console.log('111111', banners);
        setPictureName(result?.data?.data?.filepath_url);
        setPicture(result?.data?.data?.filepath_url);
        setDisable(false);
        //getBanners();
      })
      .catch((error) => {
        console.error('Error:', error);
        setDisable(false);
        setPicture();
        setAddPicture(false);
      });
  };

  const validateImage = () => {
    let isValid = true;
    let error = {};
    if (addPicture === false) {
      isValid = false;
      error['img_error'] = 'Please choose an image';
    }
    setError(error);
    return isValid;
  };
  const setImageAction = async (event) => {
    event.preventDefault();
    if (validateImage()) {
      const myurl = `http://54.177.165.108:3000/api/admin/add-banner`;
      var bodyFormData = new URLSearchParams();
      bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
      bodyFormData.append('image', picture);

      axios({
        method: 'post',
        url: myurl,
        data: bodyFormData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .then((result) => {
          console.log('Success::::::::', result);
          getBanners();
          setPicture({});
          setPictureName({});
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };
  const commentsData = useMemo(() => {
    let computedComments = banners;
    if (search) {
      computedComments = computedComments.filter((banners) =>
        banners.sr_no.toString().toLowerCase().includes(search.toLowerCase())
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
  }, [currentPage, search, sorting, banners, limit]);
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
            <li className="breadcrumb-item active currentPath">Banners</li>
          </ol>
          <h1 className="page-header">Banners</h1>
          <button
            type="button"
            className="btn btn-secondary mb-3"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
            style={{ borderRadius: '20px' }}
          >
            ADD BANNER
          </button>
          <div
            className="collapse"
            id="collapseExample"
            style={{ borderRadius: '20px' }}
          >
            <div className="card card-body" style={{ borderRadius: '20px' }}>
              <form onSubmit={setImageAction} encType="multipart/form-data">
                <label
                  for="exampleInputPassword1"
                  style={{ fontSize: '16px', fontWeight: '600' }}
                >
                  Image:
                </label>
                <br />
                <input
                  type="file"
                  name="image"
                  onChange={uploadPicture}
                  style={{ marginLeft: '-10px' }}
                />
                <div className="text-danger">{error.img_error}</div>
                <br />
                <button
                  className="btn btn-success save-btp"
                  type="submit"
                  name="upload"
                  style={{
                    width: '120px',
                    borderRadius: '5px',
                    fontSize: '15px',
                    borderRadius: '20px',
                  }}
                  disabled={disable}
                >
                  {disable ? 'Processing...' : 'Upload'}
                </button>
              </form>
            </div>
          </div>
          <br />

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
                                <img
                                  src={e.image}
                                  width="70px"
                                  alt="Img"
                                  height="50px"
                                />
                              </td>
                              <td onClick={() => deleteBanner(e.id)}>
                                <i
                                  className="fa fa-trash delete"
                                  style={{
                                    cursor: 'pointer',
                                    marginLeft: '13px',
                                  }}
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
          <Footer />
        </div>
      </div>
    </>
  );
}
