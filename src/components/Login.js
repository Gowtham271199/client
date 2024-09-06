import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const { username, password } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login({ username, password }));
            navigate('/profile');  // Redirect to profile page after login
        } catch (error) {
            console.error('Login error:', error);
            alert('Error during login. Please try again.');
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

    return (
        <div style={containerStyle}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Login</h2>
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Username</label>
                    <input
                        type="text"
                        style={formControlStyle}
                        name="username"
                        value={username}
                        onChange={onChange}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password</label>
                    <input
                        type="password"
                        style={formControlStyle}
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
