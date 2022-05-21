import React, { useState, useEffect, useMemo } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { TableHeader, Pagination, Search } from "./Table";
import { Dropdown, Table } from "react-bootstrap";
import Loader from "./include/Loader";
import Menu from "./include/Menu";
import Footer from "./include/Footer";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [limit, setlimit] = useState(10);
  let history = useHistory();

  const Header = [
    {
      name: "Sr. NO.",
      field: "sr_no",
      sortable: false,
    },
    {
      name: "Order Code",
      field: "order_code",
      sortable: false,
    },
    {
      name: "Order Instructions",
      field: "order_instructions",
      sortable: false,
    },
    {
      name: "Total",
      field: "total",
      sortable: false,
    },
    {
      name: "Items Count",
      field: "items_count",
      sortable: false,
    },
    {
      name: "Payment Type",
      field: "payment_type",
      sortable: false,
    },
    {
      name: "Created At",
      field: "createdAt",
      sortable: false,
    },
    {
      name: "Details",
      field: "details",
      sortable: false,
    },
  ];
  const getOrders = () => {
    const myurl = "http://54.177.165.108:3000/api/admin/order-list";
    var bodyFormData = new URLSearchParams();
    bodyFormData.append("auth_code", "Brud#Cust$&$Resto#MD");

    axios({
      method: "post",
      url: myurl,
      data: bodyFormData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => {
        console.log(response["data"]["data"]);
        var indexedData = response["data"]["data"]?.map((e, i) => {
          e = { ...e };
          e = { ...e, sr_no: i + 1 };
          e = {
            ...e,
            createdAt: setDateFormat(e.createdAt),
            order_code: e.order_code ? e.order_code : "N/A",
            order_instructions: e.order_instructions
              ? e.order_instructions
              : "N/A",
            total: e.total ? e.total : "N/A",

            items_count: e.items_count ? e.items_count : "N/A",
            payment_type: e.payment_type ? e.payment_type : "N/A",
            createdat: e.createdat ? e.createdat : "N/A",
          };
          return e;
        });
        setOrders(indexedData);
      })
      .catch((error) => {
        console.log("Errors", error);
      });
  };

  useEffect(() => {
    getOrders();

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
  const commentsData = useMemo(() => {
    let computedComments = orders;

    if (search) {
      computedComments = computedComments.filter(
        (orders) =>
          orders.order_code.toLowerCase().includes(search.toLowerCase())
        // orders.email.toLowerCase().includes(search.toLowerCase())
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
  }, [currentPage, search, sorting, orders, limit]);
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
            <li className="breadcrumb-item active currentPath">Orders</li>
          </ol>
          <h1 className="page-header">Orders</h1>

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
                              <td>{e.order_code}</td>
                              <td>{e.order_instructions}</td>
                              <td>{e.total}</td>
                              <td>{e.items_count}</td>
                              <td>{e.payment_type}</td>
                              <td>{e.createdAt}</td>
                              <td
                                onClick={() =>
                                  history.push({
                                    pathname: "/ordersDetails",
                                    state: e,
                                  })
                                }
                              >
                                <i
                                  className="fa fa-eye edit"
                                  style={{ cursor: "pointer" }}
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

        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Orders;
