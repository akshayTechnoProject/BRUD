import React, { useState, useEffect, useMemo } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
import { TableHeader, Pagination, Search } from "../Table";
import { Dropdown, Table } from "react-bootstrap";
import Loader from "../include/Loader";
import Menu from "../include/Menu";
import axios from "axios";
import AddDeals from "./AddDeals";
import { Link } from "react-router-dom";

const Deals = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [limit, setlimit] = useState(10);
  const [data, setData] = useState(10);
  const Header = [
    {
      name: "Sr. NO.",
      field: "sr_no",
      sortable: false,
    },
    {
      name: "Image",
      field: "image",
      sortable: false,
    },
    {
      name: "Title",
      field: "title",
      sortable: false,
    },
    {
      name: "Start Date",
      field: "start_date",
      sortable: false,
    },
    {
      name: "End Date",
      field: "end_date",
      sortable: false,
    },
    {
      name: "Details",
      field: "details",
      sortable: false,
    },
    {
      name: "Update",
      field: "Update",
      sortable: false,
    },
    {
      name: "Delete",
      field: "delete",
      sortable: false,
    },
  ];
  let history = useHistory();

  const [dealsList, setDealsList] = useState([]);
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  const getDeals = (id) => {
    const myURL = "http://54.177.165.108:3000/api/admin/deals-list";
    var bodyFormData = new URLSearchParams();
    bodyFormData.append("auth_code", "Brud#Cust$&$Resto#MD");

    axios({
      method: "post",
      url: myURL,
      data: bodyFormData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then(async (response) => {
        console.log(response["data"]["data"]);
        setData(response["data"]["data"]);

        var indexedData = await response["data"]["data"]?.map((e, i) => {
          e = { ...e };
          e = { ...e, sr_no: i + 1 };
          e = {
            ...e,
            createdAt: e?.createdAt ? setDateFormat(e.createdAt) : "N/A",
            description: e?.description ? e?.description : "N/A",
            end_date: e?.end_date ? e?.end_date : "N/A",
            id: e?.id ? e?.id : "N/A",

            item_id: e?.item_id ? e?.item_id : "N/A",
            pts_one: e?.pts_one ? e?.pts_one : "N/A",
            short_desc: e?.short_desc ? e?.short_desc : "N/A",
            start_date: e?.start_date ? e?.start_date : "N/A",
            status: e?.status ? e?.status : "N/A",
            terms_conditions: e?.terms_conditions ? e?.terms_conditions : "N/A",
            title: e?.title ? e?.title : "N/A",
            pts_two: e?.pts_two ? e?.pts_two : "N/A",
            updatedAt: e?.updatedAt ? e?.updatedAt : "N/A",
            restaurant_id: e?.restaurant_id ? e?.restaurant_id : "N/A",
            image: e?.image ? (
              <img src={e?.image} width="70px" height="60px" alt="Img" />
            ) : (
              <img
                src="./assets/img/icon/food-icon.png"
                width="50px"
                height="50px"
                alt="Img"
              />
            ),
          };
          //getRestoName(e?.restaurant_id);
          return e;
        });
        setDealsList(indexedData);
        console.log("0000", indexedData);
      })
      .catch((error) => {
        console.log("Errors", error);
      });
  };

  useEffect(() => {
    getDeals();
    //resto.map((e, i) => {
    //restoListEmail.push(e.email);
    //restoList.push(e.restaurant_name);
    //});
    //setRestoListEmail([...new Set(restoListEmail)]);
    //setRestoList([...new Set(restoList)]);

    document.getElementById("page-loader").style.display = "none";

    var element = document.getElementById("page-container");
    element.classList.add("show");
  }, []);

  function setDateFormat(e) {
    var d = new Date(e);
    return (
      ("0" + d.getDate()).slice(-2) +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      d.getFullYear() +
      " " +
      tConvert(
        ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
      )
    );
  }

  const commentsData = useMemo(() => {
    let computedComments = dealsList;

    if (search) {
      computedComments = computedComments.filter(
        (dealsList) =>
          dealsList.restaurant_name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          dealsList.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTotalItems(computedComments.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedComments.slice(
      (currentPage - 1) * limit,
      (currentPage - 1) * limit + limit
    );
  }, [currentPage, search, sorting, dealsList, limit]);

  const deleteBanner = (id) => {
    if (window.confirm("Are you sure you wish to delete it?")) {
      const myurl = `http://54.177.165.108:3000/api/admin/deals-delete`;
      var bodyFormData = new URLSearchParams();
      bodyFormData.append("auth_code", "Brud#Cust$&$Resto#MD");
      bodyFormData.append("deals_id", id);
      axios({
        method: "post",
        url: myurl,
        data: bodyFormData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then((response) => {
          console.log("delete", response);
          getDeals();
        })
        .catch((error) => {
          console.log("Errors", error);
        });
    }
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
              <NavLink to="/dashboard">
                <span className="basePath">Dashboard</span>
              </NavLink>
            </li>
            <li className="breadcrumb-item active currentPath">Deals</li>
          </ol>
          <h1 className="page-header">Deals</h1>
          <button
            className="btn btn-secondary mb-3"
            type="button"
            style={{ borderRadius: "20px" }}
          >
            <Link to="/addDeals">Add Deals</Link>
          </button>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "20px",
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
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "300",
                        paddingTop: "0px",
                        paddingBottom: "0px",
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
                            cursor: "auto",
                            backgroundColor: "white",
                            borderColor: "#d5dbe0",
                            paddingBottom: "3px",
                            paddingTop: "3px",
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
                              <td>{e?.sr_no}</td>
                              <td>{e?.image}</td>
                              <td>{e?.title ? e?.title : "N/A"}</td>
                              <td>{e?.start_date}</td>
                              <td>{e?.end_date}</td>

                              <td>
                                <i
                                  className="fa fa-eye edit"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    history.push({
                                      pathname: "/dealsDetails",
                                      state: data[i],
                                    })
                                  }
                                ></i>
                              </td>
                              <td>
                                <i
                                  className="fa fa-pen edit"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    history.push({
                                      pathname: "/updateDeals",
                                      state: data[i],
                                    });
                                  }}
                                ></i>
                              </td>
                              <td onClick={() => deleteBanner(e?.id)}>
                                <i
                                  class="fa fa-trash delete"
                                  style={{
                                    cursor: "pointer",
                                    marginLeft: "13px",
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
                    overflowX: "auto",
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

export default Deals;
