import React, { useState, useEffect } from "react";
import Loader from "../include/Loader";
import Menu from "../include/Menu";
import Footer from "../include/Footer";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function UpdateDeals() {
  const [disable, setDisable] = useState(false);
  const history = useHistory();
  const location = useLocation();
  var data = location.state;
  const [deal, setdeal] = useState(data);

  console.log("data", data);
  const SubmitEvent = (e) => {
    e.preventDefault();
    setDisable(true);

    if (validate()) {
      const myurl = "http://54.177.165.108:3000/api/admin/deals";
      var bodyFormData = new URLSearchParams();
      bodyFormData.append("auth_code", "Brud#Cust$&$Resto#MD");
      bodyFormData.append("deals_id", deal.id);
      bodyFormData.append("restaurant_id", deal.restaurant_name);
      bodyFormData.append("item_id", deal.manager_name);
      bodyFormData.append("pts_one", deal.pts_one);
      bodyFormData.append("title", deal.title);
      bodyFormData.append("short_desc", deal.short_desc);
      bodyFormData.append("description", deal.description);
      bodyFormData.append("terms_conditions", deal.terms_conditions);
      bodyFormData.append("image", deal.image);
      bodyFormData.append("start_date", deal.longitude);
      bodyFormData.append("end_date", deal.end);

      axios({
        method: "post",
        url: myurl,
        data: bodyFormData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then((response) => {
          console.log(response["data"]["data"]);
          console.log("Successfull!!!!");
          setDisable(false);
          toast.success("Updated Successfully...!");
          history.push(`/deals`);
        })
        .catch((error) => {
          console.log("Errors", error);
          setDisable(false);
        });
    }
  };

  useEffect(() => {
    document.getElementById("page-loader").style.display = "none";
    var element = document.getElementById("page-container");
    element.classList.add("show");
  });

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
            <li className="breadcrumb-item currentPath">
              {/* {data.restaurant_name} */}
            </li>
          </ol>
          <div style={{ display: "flex" }}>
            <i
              className="fa fa-arrow-left edit"
              onClick={useHistory().goBack}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                marginTop: "7px",
                marginRight: "10px",
              }}
            ></i>
            <h1 className="page-header">Update Restaurant Detail</h1>
          </div>

          <div className="card mainBody">
            <div className="card-body">
              <div
                className="row RestName p-5"
                style={{ borderRadius: "20px" }}
              >
                <div className="mx-auto ">
                  <span style={{ fontSize: "18px", fontWeight: "700" }}>
                    {}
                  </span>
                </div>
              </div>
              <br />

              <div className="container">
                <form onSubmit={SubmitEvent} className="updateResto">
                  <div className="form-group mb-4">
                    <label for="exampleInputEmail1">Restaurant Name:</label>
                    <input
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter restaurant name"
                      name="restaurant_name"
                      //value={restoDetail.restaurant_name}
                      //onChange={inputHandler}
                    />
                    {/* <div className="text-danger">{errors.restaurant_name}</div> */}
                  </div>
                  <div className="form-group mb-4">
                    <label for="exampleInputEmail1">Manager Name:</label>
                    <input
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter manager name"
                      name="manager_name"
                      //value={restoDetail.manager_name}
                      //onChange={inputHandler}
                    />
                    {/* <div className="text-danger">{errors.manager_name}</div> */}
                  </div>
                  <div className="form-group mb-4">
                    <label for="exampleInputEmail1">Country Code:</label>
                    <input
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter country code"
                      name="country_code"
                      //value={restoDetail.country_code}
                      //onChange={inputHandler}
                    />
                    {/* <div className="text-danger">{errors.country_code}</div> */}
                  </div>
                  <div className="form-group mb-4">
                    <label for="exampleInputEmail1">Phone Number:</label>
                    <input
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter phone number"
                      name="phone_number"
                      //value={restoDetail.phone_number}
                      //onChange={inputHandler}
                    />
                    {/* <div className="text-danger">{errors.phone_number}</div> */}
                  </div>

                  <button
                    type="submit"
                    className="btn "
                    disabled={disable}
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "#f55800",
                      color: "#fff",
                    }}
                  >
                    {disable ? "Processing..." : "Update"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
