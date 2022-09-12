import React, { useState, useEffect } from 'react'
import axios from "axios"
import { signUpRoute } from '../utils/APIRoutes';
import "./SignUp.css"
export default function SignUp() {
    const [values, setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    useEffect(()=>{
        if(localStorage.getItem("nistinder")){
            alert("you are welcom")
        }
    } , [])
    const handelChange = (event)=>{
        setValues({...values,[event.target.name]:event.target.value})
    }
    const handelValidation = ()=>{
        const {username,password,confirmPassword} = values;
        if(username.length < 3){
            alert("username too small");
            return false;
        }
        if(password.length < 8){
            alert("password must greater than 7 characters");
            return false;
        }
        if(password !== confirmPassword){
            alert("password and confirm password must be same");
            return false;
        }

        return true;

    }
    const handelSubmit = async (event)=>{
        event.preventDefault();
        if(handelValidation()){
            const {username , email , password} = values;
            const postData ={ username, email, password };
            await axios.post(signUpRoute, postData)
            .then(async (res)=>{
                const newdata = res;
                if(newdata.data.status === false){
                    console.log(newdata.data.msg)
                }
                if(newdata.data.status === true ){
                    await localStorage.setItem("nistinder" , newdata.data.userobj)
                    alert("navigate")
                }
            })
            .catch((err)=>{
                console.log(`this err is from axios${err}`)
            });
        }

    }
    return (
        <div className="formContainer">
            <div className="formHeading">
                <h1>
                    SignUp to Nita
                </h1>
            </div>
            <form onSubmit={(event) => handelSubmit(event)}>
                <div className="center"><input className="border-highlight" type="text" placeholder="Username" name="username" required onChange={(event) => handelChange(event)} /></div>
                <div className="center"><input className="border-highlight" type="email" placeholder="Email" name="email" required onChange={(event) => handelChange(event)} /></div>
                <div className="center"><input className="border-highlight" type="password" placeholder="Password" name="password" required onChange={(event) => handelChange(event)} /></div>
                <div className="center"><input className="border-highlight" type="password" placeholder="Confirm Password" name="confirmPassword" required onChange={(event) => handelChange(event)} /></div>
                <div className="sumitBtn center"><button className="btn-l" type="submit">Create Account</button></div>
                <div className="center">Already have a account?</div>
            </form>
        </div>
    )
}