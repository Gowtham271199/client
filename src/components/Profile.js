import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../redux/authSlice';

function Profile() {
   const dispatch = useDispatch();
   const user = useSelector((state) => state.auth.user);

   const [formData, setFormData] = useState({
       age: user ? user.age : '',
       dob: user ? user.dob : '',
       contact: user ? user.contact : '',
   });
   const [successMessage, setSuccessMessage] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const { age, dob, contact } = formData;

   useEffect(() => {
       dispatch(getProfile());
   }, [dispatch]);

   const onChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const onSubmit = async (e) => {
       e.preventDefault();
       try {
           await dispatch(updateProfile(formData));
           setSuccessMessage('Profile updated successfully!');
           setErrorMessage(''); // Clear any previous error messages
       } catch (error) {
           console.error('Update error:', error);
           setErrorMessage('Error updating profile. Please try again.');
           setSuccessMessage(''); // Clear any previous success messages
       }
   };

   const containerStyle = {
       maxWidth: '400px',
       margin: '100px auto 0',
       padding: '20px',
       backgroundColor: '#ffffff',
       borderRadius: '8px',
       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
       boxSizing: 'border-box',
   };

   const formGroupStyle = {
       marginBottom: '15px',
   };

   const formControlStyle = {
       borderRadius: '5px',
       border: '1px solid #ced4da',
       padding: '10px',
       width: '100%',
       boxSizing: 'border-box',
   };

   const buttonStyle = {
       padding: '10px',
       borderRadius: '5px',
       width: '100%',
       backgroundColor: '#007bff',
       border: 'none',
       color: 'white',
       fontSize: '16px',
       cursor: 'pointer',
   };

   const buttonHoverStyle = {
       backgroundColor: '#0056b3',
   };

   const alertSuccessStyle = {
       backgroundColor: '#d4edda',
       borderColor: '#c3e6cb',
       color: '#155724',
       padding: '10px',
       borderRadius: '5px',
       marginTop: '15px',
   };

   const alertErrorStyle = {
       backgroundColor: '#f8d7da',
       borderColor: '#f5c6cb',
       color: '#721c24',
       padding: '10px',
       borderRadius: '5px',
       marginTop: '15px',
   };

   return (
       <div style={containerStyle}>
           <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Profile</h2>
           {user && (
               <form onSubmit={onSubmit}>
                   <div style={formGroupStyle}>
                       <label>Age</label>
                       <input
                           type="number"
                           style={formControlStyle}
                           name="age"
                           value={age}
                           onChange={onChange}
                       />
                   </div>
                   <div style={formGroupStyle}>
                       <label>Date of Birth</label>
                       <input
                           type="date"
                           style={formControlStyle}
                           name="dob"
                           value={dob}
                           onChange={onChange}
                       />
                   </div>
                   <div style={formGroupStyle}>
                       <label>Contact</label>
                       <input
                           type="text"
                           style={formControlStyle}
                           name="contact"
                           value={contact}
                           onChange={onChange}
                       />
                   </div>
                   <button
                       type="submit"
                       style={buttonStyle}
                       onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                       onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                   >
                       Update Profile
                   </button>
               </form>
           )}
           {successMessage && (
               <div style={alertSuccessStyle} role="alert">
                   {successMessage}
               </div>
           )}
           {errorMessage && (
               <div style={alertErrorStyle} role="alert">
                   {errorMessage}
               </div>
           )}
       </div>
   );
}

export default Profile;
