import image from '../../images/2766594@2x.png';
import { Paper, Button } from '@mui/material';
import './LoginSignup.css';
import Login from '../../components/login/Login';
import { useState } from 'react';
import SignUp from '../../components/signup/SignUp';

export default function LoginSignup(props) {
    const [state, setState] = useState({
        showForm: props.tab == 'login' ? 'login' : 'signup'    
    });

    const formToggel = (formName) => {
        setState(prevState => ({
            ...prevState,
            showForm: formName
        }));
    };

    return (
        <div className="login-signup-screen">
            <div className="login-signup-form-n-image">
                <Paper>
                    <div className='login-signup-img-with-text'>
                        <img className="login-signup-img" src={image} width='245px'/>
                        <div className="login-signup-img-text">
                            Online Book Shopping
                        </div>
                    </div>
                </Paper>
                <Paper elevation={4}>
                    <div className='login-signup-tabs-and-form'>
                        <div className='login-signup-tabs'>
                            <div className='login-signup-btn-tab'>
                                <Button variant="text" sx={{
                                    textAlign: 'left',
                                    font: 'normal normal medium 25px/33px Roboto',
                                    letterSpacing: '0px',
                                    color: state.showForm == 'login' ? '#0A0102' : '#878787',
                                    textTransform: 'uppercase',
                                    opacity: '1'
                                }} onClick={() => formToggel('login')}>LOGIN</Button>
                                {
                                    state.showForm == 'login' ? <div className='login-signup-tab-active-bar'/> : ''
                                }
                            </div>
                            <div className='login-signup-btn-tab'>
                                <Button variant="text" sx={{
                                    textAlign: 'left',
                                    font: 'normal normal medium 25px/33px Roboto',
                                    letterSpacing: '0px',
                                    color: state.showForm != 'login' ? '#0A0102' : '#878787',
                                    textTransform: 'uppercase',
                                    opacity: 1
                                }} onClick={() => formToggel('signup')}>SIGNUP</Button>
                                {
                                    state.showForm != 'login' ? <div className='login-signup-tab-active-bar'/> : ''
                                }
                            </div>
                        </div>
                        {
                            state.showForm == 'login' ? <Login /> : <SignUp />
                        }
                    </div>
                </Paper>
            </div>
        </div>
    );
}