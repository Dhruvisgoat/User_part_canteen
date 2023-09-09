import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Create a navigate function

  const validateInputs = () => {
    setError('');

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User registered successfully!');
        await updateProfile(user, { displayName: username }); // Add the username to the user object

        // Check if the user is already registered
        const isAlreadyRegistered = user && user.emailVerified;
        
        if (isAlreadyRegistered) {
          // User is already registered, redirect to login
          navigate('/');
        } else {
          // User registration is successful
          // You can redirect to a different page or show a success message here
          handleSuccessfulRegister();
        }
      } catch (error) {
        console.error(error);
        setError('Registration failed. Please try again.');
      }
    }
  };

  const handleSuccessfulRegister = async () => {
    try {
      // Create user data in Firestore or perform any other actions
      // ...

      // Redirect the user to the desired page
      navigate('/'); // Redirect to a welcome or dashboard page
    } catch (error) {
      console.error(error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="bg-image-register bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="translucent-card card-shadow mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  {error && <p className="text-danger">{error}</p>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      🧑🏼‍💼
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      🔒
                    </CInputGroupText>
                    <CFormInput
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <CInputGroupText
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: 'pointer' }}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </CInputGroupText>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      🔐
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={handleRegister}>
                      Register
                    </CButton>
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

export default Register;
