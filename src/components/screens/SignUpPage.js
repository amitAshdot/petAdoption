import React, { useState } from 'react'
import { register, signOut, sendEmailVerification, checkIfUserVerified } from '../../store/auth/action'
import { useSelector, useDispatch } from 'react-redux';
import Form from '../layout/form/Form';

const SignUpPage = () => {

    const authState = useSelector(state => state.authReducer);
    const dispatch = useDispatch();


    const error = (
        <div>
            <h3>false</h3>
            {authState.error ? <h3>error: {authState.error}</h3> : null}
        </div>
    )

    const [form, setform] = useState({
        email: '',
        password: '',
        isPassShow: false,
        isRegister: true
    })


    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        type === "checkbox" ? setform({ ...form, [name]: checked }) : setform({ ...form, [name]: value })
    }

    // TODO: add name save in DB
    const handleSubmit = () => {
        dispatch(register(form.email, form.password))
    }

    const handleSignOut = () => {
        dispatch(signOut())
    }

    const handleEmailVerification = () => {
        dispatch(sendEmailVerification())
    }

    const handleUserVerifiedCheck = () => {
        dispatch(checkIfUserVerified())
    }

    return (
        <div>
            <h1>Register</h1>
            <h1 onClick={handleSubmit}> send</h1>

            <h3>is register :</h3>
            {authState.registered ? <h3>true</h3> : error}

            <Form handleChange={handleChange} state={form} />

            {authState.registered ? <h3 onClick={handleSignOut}>sign out</h3> : null}
            {authState.registered ? <h3 onClick={handleEmailVerification}>Send email verification</h3> : null}
            {authState.verified ? <h3 onClick={handleUserVerifiedCheck}>User email is verified</h3> : <h3 onClick={handleUserVerifiedCheck}>User email is not verified</h3>}
        </div>
    )
}

export default SignUpPage
