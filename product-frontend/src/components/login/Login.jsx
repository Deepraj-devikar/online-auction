import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginApi } from '../../services/UserService';
import './Login.css';

export default function Login() {
    const [state, setState] = useState({
        email: '',
        password: ''
    });
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;

    const navigate = useNavigate();

    const handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState(
            {...state, [name]: value},
        );
    };

    const validateUserInput = (inputName = '') => {
        const validation = {};
        switch (inputName) {
            case '':                
            case 'email':
                if(emailRegex.test(state.email)){
                    validation['validEmail'] = true;
                    validation['emailHelperText'] = '';
                } else {
                    validation['validEmail'] = false;
                    validation['emailHelperText'] = 'Plaese enter valid email.';
                }
                if(inputName != ''){
                    break;
                }
            case 'password':
                if(passwordRegex.test(state.password)){
                    validation['validPassword'] = true;
                    validation['passwordHelperText'] = '';
                } else {
                    validation['validPassword'] = false;
                    validation['passwordHelperText'] = 'Please enter valid password.';
                }
                break;
            default:
                break;
        }
        setState(prevState => ({
            ...prevState,
            ...validation
        }));
    }

    const loginButtonClick = () => {
        validateUserInput();
        if(state.validEmail === true && state.validPassword === true){
            LoginApi({
                email: state.email,
                password: state.password
            }).then(response => {
                if(response.status == 200){
                    localStorage.setItem('authorizationToken', response.data.token);
                    navigate('/dashboard');
                }
            })
        }
    };

    return (
        <div className='login-form'>
            <div className='login-form-email-text-field'>
                <TextField variant="outlined" fullWidth={true} size="small"
                    value={state.email}
                    label="Email ID"
                    name="email"
                    error={state.validEmail === false}
                    helperText={state.validEmail === false ? state.emailHelperText : null}
                    onChange={(e) => handleUserInput(e)}
                    onBlur={(e) => validateUserInput(e.target.name)}
                />
            </div>
            <div className='login-form-password-text-field'>
                <TextField variant="outlined" fullWidth={true} size="small"
                    value={state.password}
                    label="Password"
                    name="password"
                    error={state.validPassword === false}
                    helperText={state.validPassword === false ? state.passwordHelperText : null}
                    onChange={(e) => handleUserInput(e)}
                    onBlur={(e) => validateUserInput(e.target.name)}
                />
            </div>
            <div className='login-form-login-btn'>
                <Button variant="contained" size="small" sx={{
                    width: '100%',
                    background: '#A03037 0% 0% no-repeat padding-box',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#A03037',
                        borderColor: '#A03037',
                        boxShadow: 'none',
                    },
                    '&:active': {
                        boxShadow: 'none',
                        backgroundColor: '#A03037',
                        borderColor: '#005cbf',
                    },
                    '&:focus': {
                        boxShadow: '0 0 0 0.2rem #A03037',
                    }
                }} onClick={loginButtonClick}>
                    Login
                </Button>
            </div>
            <div className='login-form-or'>OR</div>
            <div className='login-form-social-media'>
                <Button variant="contained">
                    Facebook
                </Button>
                <Button variant='text'>
                    Google
                </Button>
            </div>
        </div>
    );
}