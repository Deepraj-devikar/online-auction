import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { SignUpApi } from "../../services/UserService";
import './SignUp.css';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '' 
    });
    const nameRegex = /^([A-Z]{1}[a-z,A-Z]{2,})$/;
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;
    const mobileRegex = /^[0-9]{10, 12}$/;

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
        let isCorrectValidation = true;
        switch (inputName) {
            case '':                
            case 'name':
                if(nameRegex.test(state.name)){
                    validation['validName'] = true;
                    validation['nameHelperText'] = '';
                } else {
                    validation['validName'] = false;
                    validation['nameHelperText'] = 'Plaese enter valid name.';
                    isCorrectValidation = false;
                }
                if(inputName != ''){
                    break;
                }
            case 'email':
                if(emailRegex.test(state.email)){
                    validation['validEmail'] = true;
                    validation['emailHelperText'] = '';
                } else {
                    validation['validEmail'] = false;
                    validation['emailHelperText'] = 'Plaese enter valid email.';
                    isCorrectValidation = false;
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
                    isCorrectValidation = false;
                }
                break;
            case 'mobile':
                if(mobileRegex.test(state.mobile)){
                    validation['validMobile'] = true;
                    validation['mobileHelperText'] = '';
                } else {
                    validation['validMobile'] = false;
                    validation['mobileHelperText'] = 'Please enter valid mobile.';
                    isCorrectValidation = false;
                }
                break;
            default:
                break;
        }
        setState(prevState => ({
            ...prevState,
            ...validation
        }));
        return isCorrectValidation;
    };

    const signupButtonClick = () => {
        let isCorrectValidation = validateUserInput();
        if(
            isCorrectValidation === true
        ){
            SignUpApi({
                name: state.name,
                email: state.email,
                password: state.password,
                mobile: state.mobile
            }).then(response => {
                if(response.status == 201){
                    navigate('/login');
                }
            }).catch(error => {
                console.log(error);
            })
        }
    };

    return (
        <div className='signup-form'>
            <div className='signup-form-full-name-text-field'>
                <TextField variant="outlined" fullWidth={true} size="small"
                    value={state.name}
                    label="Full Name"
                    name="name"
                    error={state.name === false}
                    helperText={state.validName === false ? state.nameHelperText : null}
                    onChange={(e) => handleUserInput(e)}
                    onBlur={(e) => validateUserInput(e.target.name)}
                />
            </div>
            <div className='signup-form-email-text-field'>
                <TextField variant="outlined" fullWidth={true} size="small"
                    value={state.email}
                    label="Email ID"
                    name="email"
                    error={state.email === false}
                    helperText={state.validEmail === false ? state.emailHelperText : null}
                    onChange={(e) => handleUserInput(e)}
                    onBlur={(e) => validateUserInput(e.target.name)}
                />
            </div>
            <div className='signup-form-password-text-field'>
                <TextField variant="outlined" fullWidth={true} size="small"
                    value={state.password}
                    label="Password"
                    name="password"
                    error={state.password === false}
                    helperText={state.validPassword === false ? state.passwordHelperText : null}
                    onChange={(e) => handleUserInput(e)}
                    onBlur={(e) => validateUserInput(e.target.name)}
                />
            </div>
            <div className='signup-form-mobile-number-text-field'>
                <TextField variant="outlined" fullWidth={true} size="small"
                    value={state.mobile}
                    label="Mobile Number"
                    name="mobile"
                    error={state.mobile === false}
                    helperText={state.validMobile === false ? state.mobileHelperText : null}
                    onChange={(e) => handleUserInput(e)}
                    onBlur={(e) => validateUserInput(e.target.name)}
                />
            </div>
            <div className='signup-form-signup-btn'>
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
                }} onClick={signupButtonClick}>
                    Signup
                </Button>
            </div>
        </div>
    );
}