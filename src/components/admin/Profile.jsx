import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loader from './include/Loader';
import Menu from './include/Menu';
import Footer from './include/Footer';
import axios from 'axios';

function Profile() {
  const [change, setChage] = useState(true);

  useEffect(() => {
    document.getElementById('page-loader').style.display = 'none';

    var element = document.getElementById('page-container');
    element.classList.add('show');
  }, [change]);

  const [{ alt, src }, setImg] = useState({
    src: '',
    alt: '',
  });
  const [addPicture, setAddPicture] = useState(false);
  const [picture, setPicture] = useState({});
  const [pictureName, setPictureName] = useState({});

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
      setAddPicture(true);
    }
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
        setPictureName(result?.data?.data?.filepath_url);
        setDisable(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const [profileInfo, setProfileInfo] = useState({
    name: localStorage.getItem('BRUD_Admin_NAME'),
  });
  const [profileImage, setProfileImage] = useState({
    image: localStorage.getItem('BRUD_Admin_IMAGE'),
  });
  const [errors, setErrors] = useState({});
  const [passErrors, setPassErrors] = useState({});

  const [disable, setDisable] = useState(false);
  const [disable1, setDisable1] = useState(false);

  const InputEvent = (e) => {
    const newProfileInfo = { ...profileInfo };
    newProfileInfo[e.target.name] = e.target.value;
    setProfileInfo(newProfileInfo);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validate()) {
      setDisable(true);

      const updateId = localStorage.getItem('BRUD_Admin_ID');

      const { name } = profileInfo;

      const myurl = 'http://54.177.165.108:3000/api/admin/update-profile';
      var bodyFormData = new URLSearchParams();
      bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
      bodyFormData.append('name', name);
      bodyFormData.append('image', pictureName);
      axios({
        method: 'post',
        url: myurl,
        data: bodyFormData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .then((response) => {
          console.log('111', response);
          if (response.data.sucecess == true) {
            localStorage.setItem('BRUD_Admin_NAME', profileInfo.name);
            localStorage.setItem(
              'BRUD_Admin_IMAGE',
              response?.data?.data?.image
            );
            setDisable(false);
            setPicture({});
            setPictureName({});
            console.log('===SUCCESSFUL===', response?.data?.data?.image);

            toast.success('Profile Updated Successfully.');
            setProfileInfo({
              name: localStorage.getItem('BRUD_Admin_NAME'),
            });
            setProfileImage({
              image: localStorage.getItem('BRUD_Admin_IMAGE'),
            });
            console.log('----', profileImage);
          } else {
            setDisable(false);
          }
        })
        .catch((error) => {
          console.log('Errors', error);
        });

      //   const updateRef = firebase.firestore().collection('admin').doc(updateId);
      //   updateRef.update({
      //       name
      //   }).then((doc) => {
      //       localStorage.setItem("BRUD_Admin_NAME",profileInfo.name);
      //       setDisable(false);
      //       toast.success("Profile Updated Sucessfully...!");
      //       setProfileInfo({
      //         name: localStorage.getItem("BRUD_Admin_NAME"),
      //       });
      // }).catch((error) => {
      //     setDisable(false);
      //     console.log("Error getting documents: ", error);
      //   });
    }
  };

  const validate = () => {
    let input = profileInfo;

    let errors = {};
    let isValid = true;

    if (!input['name']) {
      isValid = false;
      errors['name_err'] = 'Please enter name';
    }
    if (addPicture === false) {
      isValid = false;
      errors['img_err'] = 'Please select image';
    }

    setErrors(errors);
    return isValid;
  };

  const initialValues = {
    old_password: '',
    new_password: '',
    confirm_password: '',
  };
  const [password, setPassword] = useState(initialValues);
  const changePassword = (event) => {
    const { name, value } = event.target;
    setPassword({ ...password, [name]: value });
  };
  const validatePass = () => {
    let input = password;

    let passErrors = {};
    let isValidPass = true;

    if (!input['old_password']) {
      isValidPass = false;
      passErrors['old_password'] = 'Please enter old password.';
    }
    if (!input['new_password']) {
      isValidPass = false;
      passErrors['new_password'] = 'Please enter new password.';
    }
    if (!input['confirm_password']) {
      isValidPass = false;
      passErrors['confirm_password'] = 'Please enter confirm password.';
    }
    if (input['new_password'] != '' && input['confirm_password'] != '') {
      if (input['new_password'] != input['confirm_password']) {
        isValidPass = false;
        passErrors['password_error'] =
          'New password and confirm password are not same.';
      }
    }

    setPassErrors(passErrors);
    return isValidPass;
  };

  const changePass = (e) => {
    e.preventDefault();
    setDisable1(true);
    if (validatePass()) {
      const myurl = 'http://54.177.165.108:3000/api/admin/change-password';
      var bodyFormData = new URLSearchParams();
      bodyFormData.append('auth_code', 'Brud#Cust$&$Resto#MD');
      bodyFormData.append('old_password', password.old_password);
      bodyFormData.append('new_password', password.new_password);
      bodyFormData.append('confirm_password', password.confirm_password);

      axios({
        method: 'post',
        url: myurl,
        data: bodyFormData,
        //body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => {
          if (response.data.sucecess == true) {
            setDisable1(false);
            toast.success('Password Updated Successfully.');
            console.log('Password updated successfully', response);
            setChage(!change);
          } else {
            setDisable1(false);
          }
        })
        .catch((error) => {
          console.log('Errors', error);
          setDisable1(false);
          toast.error('Invalid Inputs!');
        });
    } else {
      setDisable1(false);
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
            <li className="breadcrumb-item active currentPath">Profile</li>
          </ol>
          <h1 className="page-header">Profile</h1>

          <div className="row">
            <div className="col-xl-6 p-5">
              <div
                className="card "
                style={{
                  height: 'auto',
                  padding: '20px',
                  borderRadius: '20px',
                }}
              >
                <div className="mx-auto">
                  <h3 class="card-title mx-auto" style={{ color: '#f55800' }}>
                    Profile Setting
                  </h3>
                </div>
                <form
                  onSubmit={(e) => submitHandler(e)}
                  className="profileForm"
                >
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      Name:
                    </label>

                    <input
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputName"
                      placeholder="Enter name here.."
                      name="name"
                      value={profileInfo.name}
                      onChange={InputEvent}
                    />
                    <div className="text-danger">{errors.name_err}</div>
                  </div>

                  <div className="mb-3">
                    <label for="exampleInputImage">Image: </label>
                    {profileImage.image != '' ? (
                      <img
                        src={profileImage.image}
                        className="form-img__img-preview ml-2"
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '10px',
                        }}
                        alt="Profile_Picture"
                      />
                    ) : (
                      <>
                        <img
                          src={'/assets/img/icon/profile-icon.png'}
                          alt="RestoImage"
                          className="form-img__img-preview ml-2"
                          style={{
                            width: '100px',
                            height: '100px',
                            margin: '10px',
                          }}
                        />
                      </>
                    )}

                    <br />

                    <input
                      type="file"
                      className="form-control ml-0"
                      id="exampleInputImage"
                      onChange={handleImg}
                    />
                    {src != '' ? (
                      <img
                        src={src}
                        className="form-img__img-preview"
                        style={{ width: '84px', height: '84px' }}
                        alt="imgs"
                      />
                    ) : (
                      ''
                    )}
                    <div className="text-danger">{errors.img_err}</div>
                  </div>
                  <button
                    type="submit"
                    className="btn m-r-5"
                    disabled={disable}
                    style={{
                      borderRadius: '20px',
                      backgroundColor: '#f55800',
                      color: '#fff',
                    }}
                  >
                    {disable ? 'Processing...' : 'Submit'}
                  </button>
                  <button
                    type="reset"
                    className="btn "
                    value="Reset"
                    onClick={(e) => {
                      setAddPicture(false);
                      setImg({ src: '', alt: '' });
                    }}
                    style={{
                      borderRadius: '20px',
                      border: '1px solid #f55800',
                      color: '#f55800',
                      backgroundColor: '#fff4ee',
                    }}
                  >
                    Reset
                  </button>
                </form>
              </div>
            </div>

            <div className="col-xl-6 p-5">
              <div
                className="card "
                style={{
                  height: 'auto',
                  padding: '20px',
                  borderRadius: '20px',
                }}
              >
                <div className="mx-auto">
                  <h3 class="card-title mx-auto" style={{ color: '#f55800' }}>
                    Change Password
                  </h3>
                </div>
                <form onSubmit={changePass} className="changePassForm">
                  <div className="mb-3">
                    <label for="exampleInputOldPass">Old Password:</label>
                    <input
                      type="password"
                      className="form-control ml-0"
                      id="exampleInputOldPass"
                      placeholder="Enter Old Password"
                      name="old_password"
                      value={password.old_password}
                      onChange={changePassword}
                    />
                    <div className="text-danger ">
                      {passErrors.old_password}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label for="exampleInputNewPass">New Password:</label>
                    <input
                      type="password"
                      className="form-control ml-0"
                      id="exampleInputNewPass"
                      placeholder="Enter New Password"
                      name="new_password"
                      value={password.new_password}
                      onChange={changePassword}
                    />
                    <div className="text-danger ">
                      {passErrors.new_password}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputConfirmPass">
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      className="form-control ml-0"
                      id="exampleInputConfirmPass"
                      placeholder="Enter Confirm Password"
                      name="confirm_password"
                      value={password.confirm_password}
                      onChange={changePassword}
                    />
                    <div className="text-danger ">
                      {passErrors.confirm_password}
                    </div>
                    <div className="text-danger ">
                      {passErrors.password_error}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn m-r-5"
                    disabled={disable1}
                    style={{
                      borderRadius: '20px',
                      backgroundColor: '#f55800',
                      color: '#fff',
                    }}
                  >
                    {disable1 ? 'Processing...' : 'Submit'}
                  </button>
                  <button
                    type="reset"
                    className="btn "
                    value="Reset"
                    onClick={(e) => {
                      setPassword(initialValues);
                      setPassErrors({});
                    }}
                    style={{
                      borderRadius: '20px',
                      border: '1px solid #f55800',
                      color: '#f55800',
                      backgroundColor: '#fff4ee',
                    }}
                  >
                    Reset
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

export default Profile;
