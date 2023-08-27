import React, { useState } from 'react';
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked } from '@coreui/icons';
import googleLogo from '../../assets/google-logo.png';
import './Login.css';
import { auth, googleProvider } from '../../config/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const MyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  //sign in with google only works on localhost of computer when hosting it wont work
  //to make it work you need to use hosted url from firebase
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(err);
    }
  };

  const handleOtp = () => {
    console.log('otp');
    navigate('/otp');
  }

  const handleSuccessfulLogin = () => {
    navigate('/'); // Redirect the user to the login page
  };

  const emailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign up with email clicked');
      handleSuccessfulLogin();
    } catch (error) {
      console.log(error);
      setLoginError('Invalid email or password'); // Set the login error message
    }
  };

  return (

    <div className="bg-image bg-dark min-vh-100 d-flex align-items-center" >
      <CContainer className=" CContainer justify-content-center ">
        <CRow className="justify-content-center">
          <CCol md={10}>
            <CCard className="translucent-card card-shadow">
              <CCardBody className="card-body p-5 d-flex flex-column align-items-center">
                <CForm>
                  <h1 className="text-center mb-4">Login</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      🔐
                    </CInputGroupText>
                    <CFormInput type="password" placeholder="Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton onClick={emailLogin} color="primary">Login</CButton>
                  </div>
                  {loginError && <div className="text-center mt-3">{loginError}</div>}
                  <p className="text-center mt-3">
                    <small>
                      <Link to="/forgotPassword">Forgot password?</Link>
                    </small>
                  </p>
                  <div className="text-center mt-4">
                    <div>OR</div>
                    <CButton color="light" className="mt-2" onClick={handleGoogleLogin}>
                      <img src={googleLogo} alt="Google Logo" className="google-logo" style={{ height: '20px', marginRight: '8px' }} />
                      Google
                    </CButton>
                    <CButton color="light" className="mt-2 mx-2" onClick={handleOtp}>
                      Via Otp
                    </CButton>
                    <div className='mt-3'>
                      New User <Link to="/register">Register here</Link>
                    </div>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default MyLogin;
