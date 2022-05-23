import React, { useEffect, useState, useMemo } from 'react';
import Footer from './include/Footer';
import Loader from './include/Loader';
import Menu from './include/Menu';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { TableHeader, Pagination, Search } from './Table';
import { Dropdown, Table } from 'react-bootstrap';
export default function Category() {
  const [catList, setcatList] = useState([]);
  const [change, setChange] = useState(true);
  const [catName, setCatName] = useState('');
  const [catID, setCatID] = useState('');
  const [addLoad, setAddLoad] = useState(false);
  const [visible, setvisible] = useState(false);
  const [visibleEditMessage, setVisibleEditMessage] = useState(false);
  const [visibleMessage, setvisibleMessage] = useState(false);
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
      name: 'Category Name',
      field: 'category_name',
      sortable: false,
    },
    {
      name: 'Edit',
      field: 'edit',
      sortable: false,
    },
    {
      name: 'Delete',
      field: 'delete',
      sortable: false,
    },
  ];
  const getResto = () => {
    const myurl = 'http://54.177.165.108:3000/api/admin/category-list';
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
            category_name: e.category_name ? e.category_name : 'N/A',
          };
          return e;
        });
        setcatList(indexedData);
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

    setAddLoad(false);
  }, [change]);

  const deleteCat = (e) => {
    const myurl = `http://54.177.165.108:3000/api/admin/delete-category`;
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
    bodyFormData.append('category_id', e.id);

    if (window.confirm(`Do you want to remove ${e.category_name}?`)) {
      axios({
        method: 'post',
        url: myurl,
        data: bodyFormData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .then((response) => {
          setChange(!change);
        })
        .catch((error) => {
          console.log('Errors', error);
        });
    } else {
    }
  };
  const updateCat = (row) => {
    const myurl = 'http://54.177.165.108:3000/api/admin/update-category';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
    bodyFormData.append('category_id', catID);
    bodyFormData.append('category_name', row);

    axios({
      method: 'post',
      url: myurl,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        setChange(!change);
        setvisible(false);
      })
      .catch((error) => {
        console.log('Errors', error);
      });
  };

  const addIntoAPI = (e) => {
    const myurl = 'http://54.177.165.108:3000/api/admin/add-category';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
    bodyFormData.append('category_name', e);
    axios({
      method: 'post',
      url: myurl,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        setChange(!change);
      })
      .catch((error) => {
        console.log('Errors', error);
      });
  };
  const AddCat = () => {
    var temp = '';
    return (
      <>
        <form
          onSubmit={(e) => {
            setAddLoad(false);

            e.preventDefault();
            setAddLoad(true);
            if (temp.length !== 0) {
              setvisibleMessage(false);
              addIntoAPI(temp);
            } else {
              setvisibleMessage(true);
              setChange(!change);
            }
          }}
        >
          <div className="form-group">
            <label
              for="exampleInputPassword1"
              style={{ fontSize: '16px', fontWeight: '600' }}
            >
              Add Category:
            </label>
            <input
              type="text"
              onChange={(e) => {
                temp = e.target.value;
              }}
              placeholder="Add category"
              className="w-25 form-control ml-0"
              style={{ borderRadius: '20px' }}
            />
            {visibleMessage ? (
              <div className="text-danger ml-0">Please fill the input</div>
            ) : null}
          </div>
          <input
            type="submit"
            className="btn btn-success ml-0"
            disabled={addLoad}
            value={!addLoad ? 'Submit' : 'Processing...'}
            style={{ borderRadius: '20px' }}
          ></input>
        </form>
      </>
    );
  };
  const UpdateCatView = () => {
    var temp1 = '';
    return (
      <>
        <form
          onSubmit={(e) => {
            setAddLoad(false);

            e.preventDefault();

            setAddLoad(true);
            if (temp1.length !== 0) {
              setVisibleEditMessage(false);
              updateCat(temp1.length === 0 ? catName : temp1);
              setCatName('');
            } else {
              setVisibleEditMessage(true);
              setChange(!change);
            }
          }}
        >
          <div className="form-group">
            <label
              for="exampleInputPassword1"
              style={{ fontSize: '16px', fontWeight: '600' }}
            >
              Edit Category:
            </label>
            <input
              type="text"
              className="form-control ml-0 w-25"
              defaultValue={catName}
              onChange={(e) => (temp1 = e.target.value)}
              style={{ borderRadius: '20px' }}
            />
            {visibleEditMessage ? (
              <div className="text-danger ml-2">
                Please fill the input properly
              </div>
            ) : null}
          </div>
          <input
            type="submit"
            className="btn btn-success ml-0"
            value={!addLoad ? 'Submit' : 'Processing...'}
            disabled={addLoad}
            style={{ borderRadius: '20px' }}
          ></input>
        </form>
      </>
    );
  };
  const editCat = (e) => {
    setCatName('');
    const myurl = 'http://54.177.165.108:3000/api/admin/edit-category';
    var bodyFormData = new URLSearchParams();
    bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
    bodyFormData.append('category_id', e.id);

    axios({
      method: 'post',
      url: myurl,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        setCatName(response['data']['data'].category_name);
        setCatID(response['data']['data'].id);
      })
      .catch((error) => {
        console.log('Errors', error);
      });
  };
  const commentsData = useMemo(() => {
    let computedComments = catList;

    if (search) {
      computedComments = computedComments.filter(
        (catList) =>
          catList.category_name.toLowerCase().includes(search.toLowerCase())
        // catList.email.toLowerCase().includes(search.toLowerCase())
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
  }, [currentPage, search, sorting, catList, limit]);
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
            <li className="breadcrumb-item active currentPath">Category</li>
          </ol>
          <h1 className="page-header">Category</h1>
          <div>
            <button
              type="button"
              class="btn btn-secondary mb-3"
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
              onClick={() => {
                setvisible(false);
                setVisibleEditMessage(false);
              }}
              style={{ borderRadius: '20px' }}
            >
              ADD CATEGORY
            </button>
            <div
              className="collapse"
              id="collapseExample"
              style={{ borderRadius: '20px' }}
            >
              <div
                className="card card-body addCategory mb-3"
                style={{ borderRadius: '20px' }}
              >
                {visible ? <UpdateCatView /> : <AddCat />}
              </div>
            </div>
          </div>

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
                          {limit}&nbsp;<i class="fa fa-caret-down"></i>
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
                              <td>{e.category_name}</td>
                              {/* <td>{e.status}</td>  */}
                              <td
                                onClick={() => {
                                  setvisible(true);
                                  editCat(e);
                                  setvisibleMessage(false);
                                }}
                                data-toggle="collapse"
                                data-target="#collapseExample"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                              >
                                <i
                                  class="fa fa-pen edit"
                                  style={{ cursor: 'pointer' }}
                                ></i>
                              </td>
                              <td onClick={() => deleteCat(e)}>
                                <i
                                  class="fa fa-trash delete"
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

        {/* <Footer /> */}
      </div>
    </>
  );
}
