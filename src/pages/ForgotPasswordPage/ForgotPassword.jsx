import React, { useState } from 'react';
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Create a navigate function from useNavigate

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent. Please check your inbox.');
      setErrorMessage('');
      navigate('/'); // Redirect to the login page
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
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
                  <h1>Forgot Password</h1>
                  {successMessage && <p className="text-success">{successMessage}</p>}
                  {errorMessage && <p className="text-danger">{errorMessage}</p>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      @
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="primary" onClick={handleResetPassword}>
                      Reset Password
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

export default ForgotPassword;
