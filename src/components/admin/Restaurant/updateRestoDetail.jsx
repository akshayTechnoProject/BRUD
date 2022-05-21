import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../include/Loader';
import Menu from '../include/Menu';
import Footer from '../include/Footer';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import Restaurants from './Restaurants';
import { toast } from 'react-toastify';

export default function UpdateRestoDetail() {
  const history = useHistory();

  const location = useLocation();
  var data = location.state;
  const [errors, setErrors] = useState({});
  const [restoDetail, setRestoDeatil] = useState({
    id: data.id,
    restaurant_name: data.restaurant_name,
    manager_name: data.manager_name,
    country_code: data.country_code,
    phone_number: data.phone_number,
    full_address: data.full_address,
    city: data.city,
    state: data.state,
    lattitude: data.lattitude,
    longitude: data.longitude,
    image: data.image,
    images: data.images[0],
    about: data.about,
  });
  const [image, setImage] = useState({
    src: '',
    alt: '',
  });
  const [images, setImages] = useState({
    src: '',
    alt: '',
  });
  const [disable, setDisable] = useState(false);
  const [addPicture, setAddPicture] = useState(false);
  const [addPictures, setAddPictures] = useState(false);
  const [imageName, setImageName] = useState({});
  const [imagesName, setImagesName] = useState({});
  const [newImage, setNewImage] = useState(
    restoDetail?.image?.toString()?.split('/')?.pop()
  );
  const [newImages, setNewImages] = useState(restoDetail?.images?.toString());

  useEffect(() => {
    document.getElementById('page-loader').style.display = 'none';
    var element = document.getElementById('page-container');
    element.classList.add('show');
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setRestoDeatil({ ...restoDetail, [name]: value });
  };

  const validate = () => {
    let input = restoDetail;
    let error = {};
    let isValid = true;

    if (!input['restaurant_name']) {
      isValid = false;
      error['restaurant_name'] = 'Please enter a restaurant name.';
    }
    if (!input['city']) {
      isValid = false;
      error['city'] = 'Please enter a city name.';
    }
    if (!input['state']) {
      isValid = false;
      error['state'] = 'Please enter a state name.';
    }
    if (!input['manager_name']) {
      isValid = false;
      error['manager_name'] = 'Please enter a manager name.';
    }
    if (!input['lattitude']) {
      isValid = false;
      error['lattitude'] = 'Please enter a latitude.';
    }
    if (!input['longitude']) {
      isValid = false;
      error['longitude'] = 'Please enter a longitude.';
    }
    if (!input['about']) {
      isValid = false;
      error['about'] = 'Please enter a about field.';
    }
    if (!input['phone_number']) {
      isValid = false;
      error['phone_number'] = 'Please enter a phone number.';
    }
    if (!input['full_address']) {
      isValid = false;
      error['full_address'] = 'Please enter address.';
    }
    if (!input['country_code']) {
      isValid = false;
      error['country_code'] = 'Please enter a country code.';
    }

    if (newImage == null) {
      isValid = false;
      error['image'] = 'Please upload image.';
    }
    if (newImages == null) {
      isValid = false;
      error['images'] = 'Please upload image.';
    }
    setErrors(error);
    return isValid;
  };
  console.log(':::::::::::::::::', newImage);
  const handleImage = (e) => {
    e.preventDefault();
    setDisable(true);
    if (e.target.files[0]) {
      setImage({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
      setAddPicture(true);
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
          setImageName(result?.data?.data?.filepath_url);
          setNewImage(result?.data?.data?.filepath_url);
          setDisable(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setDisable(false);
        });
    } else {
      setAddPicture(false);
      setDisable(false);
    }
  };
  console.log('Restaurant Data', restoDetail);

  const handleImages = (e) => {
    e.preventDefault();
    setDisable(true);
    if (e.target.files[0]) {
      setImages({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    }
    if (e.target.files[0]) {
      const myurl = `http://54.177.165.108:3000/api/admin/upload-img`;
      var bodyFormData = new FormData();
      bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
      bodyFormData.append('image', e?.target?.files[0]);

      axios({
        method: 'post',
        url: myurl,
        data: bodyFormData,
      })
        .then((result) => {
          console.log('Success:+++++', result);
          setImagesName(result?.data?.data?.filepath_url);
          if (data?.images != null) {
            var newData =
              restoDetail?.images?.toString() +
              ',' +
              result?.data?.data?.filepath_url?.toString();

            setNewImages(newData);
          } else {
            var newData = restoDetail?.images?.toString();

            setNewImages(newData);
          }
          setDisable(false);
        })
        .catch((error) => {
          console.error('Error++++:', error);
          setDisable(false);
        });
      setAddPictures(true);
    } else {
      setAddPictures(false);
      setDisable(false);
    }
  };
  console.log('newImages', newImages);

  const submitHandler = (e) => {
    e.preventDefault();
    setDisable(true);

    if (validate()) {
      const myurl = 'http://54.177.165.108:3000/api/admin/restaurants-update';
      var bodyFormData = new URLSearchParams();
      bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
      bodyFormData.append('id', restoDetail.id);
      bodyFormData.append('restaurant_name', restoDetail.restaurant_name);
      bodyFormData.append('manager_name', restoDetail.manager_name);
      bodyFormData.append('country_code', restoDetail.country_code);
      bodyFormData.append('phone_number', restoDetail.phone_number);
      bodyFormData.append('full_address', restoDetail.full_address);
      bodyFormData.append('city', restoDetail.city);
      bodyFormData.append('state', restoDetail.state);
      bodyFormData.append('lattitude', restoDetail.lattitude);
      bodyFormData.append('longitude', restoDetail.longitude);
      bodyFormData.append('image', newImage);
      bodyFormData.append('images', newImages);
      bodyFormData.append('about', restoDetail.about);

      axios({
        method: 'post',
        url: myurl,
        data: bodyFormData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .then((response) => {
          console.log(response['data']['data']);
          console.log('Successfull!!!!');
          setDisable(false);
          toast.success('Updated Successfully...!');
          history.push(`/restaurants`);
        })
        .catch((error) => {
          console.log('Errors', error);
          setDisable(false);
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
              <NavLink to="/restaurants">
                <span className="basePath">Restaurants</span>
              </NavLink>
            </li>
            <li className="breadcrumb-item currentPath">
              {data.restaurant_name}
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
                    {data.restaurant_name}
                  </span>
                </div>
              </div>
              <br />

              <div className="container">
                <form onSubmit={submitHandler} className="updateResto">
                  <div className="form-group mb-4">
                    <label for="exampleInputEmail1">Restaurant Name:</label>
                    <input
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter restaurant name"
                      name="restaurant_name"
                      value={restoDetail.restaurant_name}
                      onChange={inputHandler}
                    />
                    <div className="text-danger">{errors.restaurant_name}</div>
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
                      value={restoDetail.manager_name}
                      onChange={inputHandler}
                    />
                    <div className="text-danger">{errors.manager_name}</div>
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
                      value={restoDetail.country_code}
                      onChange={inputHandler}
                    />
                    <div className="text-danger">{errors.country_code}</div>
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
                      value={restoDetail.phone_number}
                      onChange={inputHandler}
                    />
                    <div className="text-danger">{errors.phone_number}</div>
                  </div>
                  <div class="form-group mb-4">
                    <label for="exampleFormControlTextarea1">
                      Full Address:
                    </label>
                    <textarea
                      className="form-control ml-0"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="full_address"
                      value={restoDetail.full_address}
                      onChange={inputHandler}
                    ></textarea>
                    <div className="text-danger">{errors.full_address}</div>
                  </div>
                  <div className="form-group mb-4">
                    <label for="exampleInputEmail1">City:</label>
                    <input
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter city"
                      name="city"
                      value={restoDetail.city}
                      onChange={inputHandler}
                    />
                    <div className="text-danger">{errors.city}</div>
                  </div>
                  <div className="form-group mb-4">
                    <label for="exampleInputEmail1">State:</label>
                    <input
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter state"
                      name="state"
                      value={restoDetail.state}
                      onChange={inputHandler}
                    />
                    <div className="text-danger">{errors.state}</div>
                  </div>
                  <div className="form-group mb-4">
                    <label for="exampleInputEmail1">Latitude:</label>
                    <input
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter latitude "
                      name="lattitude"
                      value={restoDetail.lattitude}
                      onChange={inputHandler}
                    />
                    <div className="text-danger">{errors.lattitude}</div>
                  </div>
                  <div className="form-group mb-4">
                    <label for="exampleInputEmail1">Longitude:</label>
                    <input
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter longitude"
                      name="longitude"
                      value={restoDetail.longitude}
                      onChange={inputHandler}
                    />
                    <div className="text-danger">{errors.longitude}</div>
                  </div>
                  <div className="form-group mb-4">
                    <label for="exampleInputImage">Image: </label>
                    {image.src ? (
                      <>
                        <img
                          src={image.src}
                          className="form-img__img-preview"
                          style={{
                            width: '100px',
                            borderRadius: '20px',
                            margin: '5px',
                          }}
                          alt={image.alt}
                        />
                      </>
                    ) : null}
                    <br />
                    <input
                      type="file"
                      className="fileInput"
                      id="exampleInputImage"
                      onChange={handleImage}
                    />
                    <div className="text-danger">{errors.image}</div>
                    {restoDetail?.image?.match('undefined') != 'undefined' ? (
                      restoDetail?.image != null ? (
                        <img
                          src={restoDetail.image}
                          className="restaurant_Image"
                          style={{
                            borderRadius: '20px',
                          }}
                          alt="RestaurantImage"
                        />
                      ) : (
                        <img
                          src="./assets/img/icon/restaurantIcon.png"
                          className="form-img__img-preview"
                          style={{
                            width: '84px',
                            height: '84px',
                          }}
                          alt="restaurant_img"
                        />
                      )
                    ) : (
                      <img
                        src="./assets/img/icon/restaurantIcon.png"
                        className="form-img__img-preview"
                        style={{
                          width: '84px',
                          height: '84px',
                        }}
                        alt="restaurant_img"
                      />
                    )}
                  </div>
                  <div className="form-group mb-4">
                    <label for="exampleInputImage">Images: </label>

                    {images.src ? (
                      <>
                        <img
                          src={images.src}
                          className="form-img__img-preview"
                          style={{
                            width: '100px',
                            borderRadius: '20px',
                            margin: '5px',
                          }}
                          alt={images.alt}
                        />
                      </>
                    ) : null}
                    <br />
                    <input
                      type="file"
                      className="fileInput"
                      id="exampleInputImage"
                      onChange={handleImages}
                    />
                    <div className="text-danger">{errors.images}</div>

                    {restoDetail?.images != '' ? (
                      restoDetail?.images
                        ?.toString()
                        ?.split(',')
                        ?.map((e, i) => {
                          return (
                            <>
                              {e?.match('undefined') != 'undefined' ? (
                                <img
                                  className="restaurant_Image"
                                  src={
                                    'http://54.177.165.108:3000/uploads/' +
                                    e.toString()
                                  }
                                  style={{
                                    margin: '3px',
                                    borderRadius: '20px',
                                  }}
                                  alt="restaurantImages"
                                />
                              ) : null}
                            </>
                          );
                        })
                    ) : (
                      <img
                        src="./assets/img/icon/empty.png"
                        className="form-img__img-preview"
                        style={{
                          width: '84px',
                          height: '84px',
                        }}
                        alt="restaurant_img"
                      />
                    )}
                  </div>

                  <div class="form-group mb-4">
                    <label for="exampleFormControlTextarea1">About:</label>
                    <textarea
                      className="form-control ml-0"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="about"
                      value={restoDetail.about}
                      onChange={inputHandler}
                    ></textarea>
                    <div className="text-danger">{errors.about}</div>
                  </div>

                  <button
                    type="submit"
                    className="btn "
                    disabled={disable}
                    style={{
                      borderRadius: '20px',
                      backgroundColor: '#f55800',
                      color: '#fff',
                    }}
                  >
                    {disable ? 'Processing...' : 'Update'}
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
