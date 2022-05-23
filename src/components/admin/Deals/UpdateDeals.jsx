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
  var data1 = location.state;
  // console.log("dattttttt", data1);
  const [deal, setdeal] = useState({
    ...data1,
    img: data1.image.split("/").pop(),
    // item_id: data1.item_id.split(","),
  });
  const [error, setError] = useState({});

  const [data, setData] = useState(10);
  const [img, setImg] = useState({
    src: "",
    alt: "",
  });
  const [resto, setResto] = useState([]);
  const [getItemList, setGetItemList] = useState([]);
  const [getItemListArray, setGetItemListArray] = useState();
  const [restoList, setRestoList] = useState([]);
  const [itemID, setItemID] = useState({});
  const [change, setChange] = useState(false);
  const [itemIDArray, setItemIDArray] = useState(data1.item_id.split(","));
  const [itemNameArray, setItemNameArray] = useState([]);
  const [restDataID, setRestDataID] = useState(deal.restaurant_id);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [addPicture, setAddPicture] = useState(true);
  const [picture, setPicture] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    pts_one: "",
    short_desc: "",
    description: "",
    terms_conditions: "",
    start_date: "",
    end_date: "",
  });

  const getRestoList = () => {
    const myURL = "http://54.177.165.108:3000/api/admin/deals-restaurants-list";
    var bodyFormData = new URLSearchParams();
    bodyFormData.append("auth_code", "Brud#Cust$&$Resto#MD");

    axios({
      method: "post",
      url: myURL,
      data: bodyFormData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then(async (response) => {
        console.log("getRestoList", response["data"]["data"]);
        for (let index = 0; index < response["data"]["data"]?.length; index++) {
          resto.push(response["data"]["data"][index]);
          restoList.push(response["data"]["data"][index].restaurant_name);
        }

        setResto([...new Set(resto)]);
        setRestoList([...new Set(restoList)]);
        let ktemp = resto.filter((e, i) => e.id == data1.restaurant_id);
        setdeal({
          ...deal,
          restaurant_name: [...new Set(ktemp)][0].restaurant_name,
        });
      })
      .catch((error) => {
        console.log("Errors", error);
      });
  };
  useEffect(() => {
    let k1 = data1.item_id.split(",");
    const intersection = getItemList.filter((element) =>
      itemIDArray.includes(element.id)
    );
    console.log(intersection);
    setItemNameArray(intersection);
  }, [itemIDArray]);
  useEffect(() => {
    const myURL =
      "http://54.177.165.108:3000/api/admin/deals-restaurants-items-list";
    var bodyFormData = new URLSearchParams();
    bodyFormData.append("auth_code", "Brud#Cust$&$Resto#MD");
    bodyFormData.append("restaurant_id", data1.restaurant_id);

    axios({
      method: "post",
      url: myURL,
      data: bodyFormData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then(async (response) => {
        console.log("getItemList", response["data"]["data"]);
        setGetItemList(response["data"]["data"]);
        let ktemp = response["data"]["data"].filter(
          (e, i) => e.id == deal.item_id
        );
        let k1 = data1.item_id.split(",");

        const intersection = response["data"]["data"].filter((element) =>
          k1.includes(element.id)
        );
        console.log(intersection);
        setItemNameArray(intersection);
        // let k12=[];
        setdeal({
          ...deal,
          item_name: [...new Set(ktemp)][0].item_name,
        });
      })
      .catch((error) => {
        console.log("Errors", error);
      });
  }, []);

  useEffect(() => {
    getRestoList();

    document.getElementById("page-loader").style.display = "none";

    var element = document.getElementById("page-container");
    element.classList.add("show");
  }, [change]);

  const selectRestaurant = async (e) => {
    console.log("::::", e.target.value);
    await getItem(e.target.value);
  };
  const getItem = (id) => {
    const myURL =
      "http://54.177.165.108:3000/api/admin/deals-restaurants-items-list";
    var bodyFormData = new URLSearchParams();
    bodyFormData.append("auth_code", "Brud#Cust$&$Resto#MD");
    bodyFormData.append("restaurant_id", id);

    axios({
      method: "post",
      url: myURL,
      data: bodyFormData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then(async (response) => {
        console.log("getItemList", response["data"]["data"]);
        setGetItemList(response["data"]["data"]);
      })
      .catch((error) => {
        console.log("Errors", error);
      });
  };
  const validate = () => {
    let isValid = true;
    let input = deal;
    let error = {};

    if (!deal.restaurant_id) {
      isValid = false;
      error["restaurant"] = "Please select restaurant";
    }
    if (itemIDArray.length == 0) {
      isValid = false;
      error["restItems"] = "Please select restaurant item";
    }
    if (!addPicture) {
      isValid = false;
      error["image"] = "Please select image";
    }
    if (!input["pts_one"].trim()) {
      isValid = false;
      error["pts_one"] = "Please enter pts one";
    }
    if (!input["title"].trim()) {
      isValid = false;
      error["title"] = "Please enter title";
    }
    if (!input["short_desc"].trim()) {
      isValid = false;
      error["short_desc"] = "Please enter short description";
    }
    if (!input["description"].trim()) {
      isValid = false;
      error["description"] = "Please enter description";
    }
    if (!input["terms_conditions"].trim()) {
      isValid = false;
      error["terms_conditions"] = "Please enter terms condition";
    }
    if (!input["start_date"].trim()) {
      isValid = false;
      error["start_date"] = "Please select start date";
    }
    if (!input["end_date"].trim()) {
      isValid = false;
      error["end_date"] = "Please select end date";
    }
    if (input["start_date"].trim() && input["end_date"].trim()) {
      if (deal.end_date < deal.start_date) {
        isValid = false;

        error["end_date"] = "End date should be greater than the start date";
      } else {
        var date = deal.end_date;
        var array = date.split("-");
        var reverseArray = array.reverse();
        setEndDate(reverseArray.join("-"));
        console.log("-----", deal);
        date = deal.start_date;
        array = date.split("-");
        reverseArray = array.reverse();
        setStartDate(reverseArray.join("-"));
      }
    }
    setError(error);
    return isValid;
  };

  const uploadPicture = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });

      setDisable(true);
      setPicture(e.target.files[0]);
      setAddPicture(true);
      console.log("PHOTO===>", e?.target?.files[0]);

      const myurl = `http://54.177.165.108:3000/api/admin/upload-img`;
      var bodyFormData = new FormData();
      bodyFormData.append("auth_code", "Brud#Cust$&$Resto#MD");
      bodyFormData.append("image", e?.target?.files[0]);
      axios({
        method: "post",
        url: myurl,
        data: bodyFormData,
      })
        .then((result) => {
          console.log("Success:=====", result);
          setdeal({
            ...deal,
            image: result?.data?.data?.url,
            img: result?.data?.data?.filepath_url,
          });
          setDisable(false);
          //getBanners();
        })
        .catch((error) => {
          console.error("Error:", error);
          setDisable(false);
          setPicture();
          setAddPicture(false);
        });
    } else {
      setdeal(...deal);
      setPicture();
      setAddPicture(false);
      setDisable(false);
      setImg({ src: "", alt: "" });
    }
  };

  const submitHendler = (e) => {
    e.preventDefault();
    setDisable(true);

    if (validate()) {
      const myurl = "http://54.177.165.108:3000/api/admin/update-deals";
      var bodyFormData = new URLSearchParams();
      bodyFormData.append("auth_code", "Brud#Cust$&$Resto#MD");
      bodyFormData.append("deals_id", deal.id);
      bodyFormData.append("restaurant_id", deal.restaurant_id);
      bodyFormData.append("item_id", itemIDArray.join(","));
      bodyFormData.append("pts_one", deal.pts_one);
      bodyFormData.append("title", deal.title);
      bodyFormData.append("short_desc", deal.short_desc);
      bodyFormData.append("description", deal.description);
      bodyFormData.append("terms_conditions", deal.terms_conditions);
      bodyFormData.append("image", deal.img);
      bodyFormData.append("start_date", deal.start_date);
      bodyFormData.append("end_date", deal.end_date);

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
    } else {
      setDisable(false);
    }
  };

  return (
    <>
      <Loader />
      {console.log(deal)}
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
                    {deal.title}
                  </span>
                </div>
              </div>
              <br />

              <div className="container">
                <form onSubmit={submitHendler} className="addDealsForm">
                  <div class="form-group ">
                    <label for="inputState">Restaurant Name:</label>
                    <select
                      id="inputState"
                      class="form-control ml-0"
                      style={{ borderRadius: "20px" }}
                      onChange={(e) => {
                        if (e.target.value != "Choose Restaurant") {
                          setRestDataID(e.target.value);
                          setdeal({ ...deal, restaurant_id: e.target.value });

                          selectRestaurant(e);
                          console.log(e.target.value);
                        } else {
                          setRestDataID("");
                          setItemIDArray([]);
                          setItemID("");
                        }
                      }}
                    >
                      <option value={deal.restaurant_id}>
                        {deal.restaurant_name}
                      </option>
                      {resto.map((e, i) => {
                        if (
                          e?.restaurant_name != "" &&
                          e?.restaurant_name != undefined &&
                          e?.restaurant_name != "N/A"
                        ) {
                          return (
                            <option value={e?.id}>
                              {e?.restaurant_name} &nbsp; → &nbsp;
                              {e?.email ? e?.email : "N/A"}
                            </option>
                          );
                        }
                      })}
                    </select>
                    <div className="text-danger">{error.restaurant}</div>
                  </div>
                  {deal.restaurant_id && getItemList ? (
                    <div class="form-group ">
                      <label for="inputState">Items:</label>
                      <div className="d-flex">
                        <select
                          id="inputState"
                          class="form-control ml-0"
                          style={{ borderRadius: "20px" }}
                          onChange={(e) => {
                            if (e.target.value != "Choose Items") {
                              setItemID(e.target.value);
                              setdeal({ ...deal, item_id: e.target.value });
                            } else {
                              setItemID("");
                            }
                          }}
                        >
                          <option selected>Choose Items</option>
                          {getItemList.map((e, i) => {
                            return (
                              <option value={e?.id} name={e?.item_name}>
                                {e?.category_type} &nbsp; → &nbsp;
                                {e?.item_name} &nbsp; → &nbsp; price:{" "}
                                {e?.price?.replace("$", "")}
                              </option>
                            );
                          })}
                        </select>
                        <button
                          className="btn btn-sm btn-primary ml-2"
                          style={{
                            borderRadius: "20px",
                            height: "30px",
                            marginTop: "6px",
                            backgroundColor: "#f55800",
                            color: "#fff",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            if (itemID)
                              setItemIDArray([
                                ...new Set([...itemIDArray, itemID]),
                              ]);
                            // setItemNameArray([
                            //   ...new Set([...itemNameArray, itemID]),
                            // ]);
                            setItemID("");
                          }}
                        >
                          Add
                        </button>
                      </div>
                      <div className="text-danger">{error.restItems}</div>
                      <div className="topDestinationsDiv row">
                        {itemIDArray?.length !== 0 ? (
                          <div className="row ml-2 mt-2">
                            {itemNameArray.map((subItems, i) => {
                              return (
                                <button
                                  className="btn btn-primary m-4 placeButton"
                                  style={{
                                    borderRadius: "20px",
                                    backgroundColor: "#f55800",
                                    color: "#fff",
                                  }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                >
                                  {subItems.category_type +
                                    " -> " +
                                    subItems.item_name +
                                    "-> " +
                                    subItems.price.replace("$", "")}
                                  <span className="placeDeleteIcon">
                                    <i
                                      className="fa fa-trash placeDeleteIcon"
                                      style={{ marginLeft: "5px" }}
                                      onClick={(e1) => {
                                        e1.preventDefault();
                                        let array = itemIDArray;
                                        let index = i;

                                        if (index !== -1) {
                                          array.splice(index, 1);
                                          setItemIDArray(array);
                                          // setChange(!change);
                                        }
                                        let array1 = itemNameArray;

                                        if (index !== -1) {
                                          array1.splice(index, 1);
                                          setItemNameArray(array1);
                                          // setChange(!change);
                                        }
                                        setChange(!change);
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
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputPassword1"
                      placeholder="title"
                      style={{ borderRadius: "20px" }}
                      name="title"
                      value={deal.title}
                      onChange={(e) =>
                        setdeal({
                          ...deal,
                          title: e.target.value,
                        })
                      }
                    />
                    <div className="text-danger">{error.title}</div>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">PTS One:</label>
                    <input
                      type="number"
                      className="form-control ml-0"
                      id="exampleInputPassword1"
                      placeholder="pts one"
                      style={{ borderRadius: "20px" }}
                      name="pts_one"
                      value={deal.pts_one}
                      onChange={(e) =>
                        setdeal({
                          ...deal,
                          pts_one: e.target.value,
                        })
                      }
                    />
                    <div className="text-danger">{error.pts_one}</div>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">
                      Short Description:
                    </label>
                    <input
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputPassword1"
                      placeholder="short description"
                      style={{ borderRadius: "20px" }}
                      name="short_desc"
                      value={deal.short_desc}
                      onChange={(e) =>
                        setdeal({
                          ...deal,
                          short_desc: e.target.value,
                        })
                      }
                    />
                    <div className="text-danger">{error.short_desc}</div>
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">
                      Description:
                    </label>
                    <textarea
                      className="form-control ml-0"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      style={{ borderRadius: "20px" }}
                      name="description"
                      value={deal.description}
                      onChange={(e) =>
                        setdeal({
                          ...deal,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                    <div className="text-danger">{error.description}</div>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Terms Conditions:</label>
                    <input
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputPassword1"
                      placeholder="terms conditions"
                      style={{ borderRadius: "20px" }}
                      name="terms_conditions"
                      value={deal.terms_conditions}
                      onChange={(e) =>
                        setdeal({
                          ...deal,
                          terms_conditions: e.target.value,
                        })
                      }
                    />
                    <div className="text-danger">{error.terms_conditions}</div>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Image:</label>
                    <br />
                    <input
                      type="file"
                      name="image"
                      onChange={uploadPicture}
                      style={{ marginLeft: "-10px" }}
                    />
                    <br />
                    {deal.image != "" ? (
                      <img
                        src={deal.image}
                        className="form-img__img-preview"
                        style={{ width: "84px", height: "84px" }}
                        alt="imgs"
                      />
                    ) : (
                      <img
                        src="https://www.teaforturmeric.com/wp-content/uploads/2021/11/Masala-Chai-Tea-Recipe-Card.jpg"
                        className="form-img__img-preview"
                        style={{ width: "84px", height: "84px" }}
                        alt="imgs"
                      />
                    )}
                    <div className="text-danger">{error.image}</div>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Start Date:</label>
                    <input
                      type="date"
                      className="form-control ml-0"
                      id="date"
                      placeholder="DD-MM-YYYY"
                      style={{ borderRadius: "20px" }}
                      name="start_date"
                      value={deal.start_date?.split("-").reverse().join("-")}
                      onChange={(e) => {
                        setdeal({
                          ...deal,
                          start_date: e.target.value
                            ?.split("-")
                            .reverse()
                            .join("-"),
                        });
                      }}
                    />
                    <div className="text-danger">{error.start_date}</div>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">End Date:</label>
                    <input
                      type="date"
                      className="form-control ml-0"
                      id="date"
                      placeholder="DD-MM-YYYY"
                      style={{ borderRadius: "20px" }}
                      name="end_date"
                      value={deal.end_date?.split("-").reverse().join("-")}
                      onChange={(e) => {
                        setdeal({
                          ...deal,
                          end_date: e.target.value
                            ?.split("-")
                            .reverse()
                            .join("-"),
                        });
                      }}
                    />
                    <div className="text-danger">{error.end_date}</div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={disable}
                  >
                    {disable ? "Processing..." : "Submit"}
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
