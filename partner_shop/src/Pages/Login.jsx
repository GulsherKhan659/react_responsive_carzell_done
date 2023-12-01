import React, { useEffect, useRef, useState } from "react";
import { Switch } from '@mantine/core';
import { CarImageCarousel } from "../Components/Login/CarImageCarousel";
import { isEmail, setCookie } from "../Hooks/UseGenericFunctions";
import { saveKeyAccountNameToLocaleStorage, saveUserInformationToLocaleStorage } from "../Hooks/UseBaseData";
import { axiosInstance } from "../Api/AxiosConfig";
import { useLocation } from "react-router-dom";

export const Login = () => {
    const [showPinCode, setShowPinCode] = useState(false);
    const [errorText, setErrorText] = useState('');
    const emailRef = useRef(null);
    const pinCodeRef = useRef(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation();

    const SendPinCode = () => {
        axiosInstance.post('auth/login', {
            username: emailRef.current.value,
            password: ""
        })
            .then(function (response) {
                if (response.status !== 200) {
                    setErrorText('Your e-mail address is not registered');
                }
                else {
                    setShowPinCode(true);
                }
            });
    }

    const LoginWithPin = () => {
        axiosInstance.post('auth/login', {
            username: emailRef.current.value,
            password: pinCodeRef.current.value
        })
            .then(function (response) {
                if (response.status !== 200) {
                    setErrorText('Wrong pin code or e-mail address');
                }
                else {
                    saveUserInformationToLocaleStorage(response.data.userData);
                    saveKeyAccountNameToLocaleStorage(response.data.keyAccountUser);
                    setCookie('CARZELLE_API_TOKEN', response.data.token, 2);
                    setLoggedIn(true);
                }
            })
    }

    const LoginWithQuickLink = (hash) => {
        axiosInstance.post('auth/ql', {
            hash: hash
        })
            .then(function (response) {
                console.log(response);
                saveUserInformationToLocaleStorage(response.data.userData);
                saveKeyAccountNameToLocaleStorage(response.data.keyAccountUser);
                setCookie('CARZELLE_API_TOKEN', response.data.token, 2);
                setLoggedIn(true);
            })
            .catch(function (error) {
                alert('The link has expired. Please enter your email and click Send Code to gain access');
            });
    }

    const HandleLoginButtonClick = () => {
        if (showPinCode) {
            LoginWithPin();
            setShowPinCode(false);
            pinCodeRef.current.value = '';
        }
        else {
            if (isEmail(emailRef.current.value)) {
                setErrorText('');
                SendPinCode();
                setShowPinCode(false);
            } else {
                setErrorText('Please enter a valid e-mail address');
            }
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            HandleLoginButtonClick();
        }
    }

    useEffect(() => {
        if (showPinCode) {
            pinCodeRef.current.focus();
        }
    }, [showPinCode]);

    useEffect(() => {
        if (loggedIn) {
            window.location.href = '/';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const parameterValue = searchParams.get("q");

        if (parameterValue !== null) {
            LoginWithQuickLink(parameterValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className=" max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 sm:mx-auto sm:my-[5%] md:mx-auto md:my-[5%] lg:mx-auto lg:my-[5%] gap-0">


                <div className=' sm:m-2 p-2 bg-white rounded-l-3xl'>
                    <div className=' mt-[15px] sm:mt-[30px] md:mt-[50px] lg:mt-[50px]'><img src="/images/logo.png" className="m-auto min-w-[150px] max-w-[150px]" alt='Carzelle logo' /></div>
                    <div className='mx-[40px] mt-[20px] sm:mx-[50px] sm:mt-[30px] md:mx-[70px] md:mt-[40px] lg:mx-[70px] lg:mt-[40px] font-open-sans'>
                        <div className='text-gradient text-info login-header mb-1'>Welcome back</div>
                        <div className='text-[16px] font-normal mb-[25px]'>Enter your email and click send to recieve a pin code</div>
                        <label className='login-label'>Email
                            <div className=' items-center mb-[20px]'><input id='email' type="text" className='login-input w-full' placeholder='Email' ref={emailRef} /></div>
                            {errorText && <div className='text-red-400 text-sm'>{errorText}</div>}
                        </label>
                        <div id='pin-code-container' className='transition-opacity' style={{ visibility: showPinCode ? 'visible' : 'hidden' }}>
                            <label className='login-label'>Pin code
                                <div className=' items-center mb-[15px]'><input id="pinCode" type="text" className='login-input w-full' placeholder='Pin code' ref={pinCodeRef} onKeyUp={handleKeyPress} /></div>
                            </label>
                        </div>
                        <div className='mb-8'><Switch label="Remember me" classNames={{ track: 'login-switch-backcolor' }} /></div>
                        <button className='blue-gradient-button w-full' onClick={() => HandleLoginButtonClick()}>{showPinCode ? 'Sign in' : 'Send Code'}</button>
                        <div className='mt-4 mb-2 text-sm text-center'>Want to become a partner. Contact us!</div>
                        <div className='text-sm w-full text-center tracking-tighter font-medium text-gradient text-info'>+45 7241 0000</div>
                        <div className='text-sm w-full text-center tracking-tighter font-medium text-gradient text-info'><a href='mailto:info@carzelle.com'>info@carzelle.com</a></div>
                    </div>
                </div>

                <div className='hidden sm:hidden md:block lg:block  rounded-r-3xl login-header-background  justify-center relative'>
                    <div>
                        <div className='m-[25%] '><CarImageCarousel delay={5000} /></div>
                        <div className='absolute bottom-[50px] left-0 w-full'>
                            <div className='text-3xl font-bold text-gray-300 text-center'>The <span className='font-extrabold text-white text-[38px]'>right</span> cars</div>
                            <div className='text-3xl font-bold text-gray-300 text-center'>for <span className='font-extrabold text-white text-[38px]'>your</span> market</div>
                        </div>
                    </div>
                </div>
                {/* </div> */}


            </div>
        </>
    )
}