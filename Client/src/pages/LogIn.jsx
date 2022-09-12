import React, { useState, useEffect } from 'react'
import axios from "axios"
import { LogInRoute } from '../utils/APIRoutes';
import "./LogIn.css"
export default function SignUp() {
    const [values, setValues] = useState({
        username:"",
        password:"",
    })
    useEffect(()=>{
        if(localStorage.getItem("nistinder")){
            // alert(`${localStorage.getItem.nistinder.username} you are welcome, actully navigate`)
            alert("go back simon");
        }
    } , [])
    const handelChange = (event)=>{
        setValues({...values,[event.target.name]:event.target.value})
    }
    const handelValidation = ()=>{
        const {username,password} = values;
        if(username.length < 3){
            alert("username too small");
            return false;
        }
        if(password.length < 8){
            alert("password must greater than 7 characters");
            return false;
        }

        return true;

    }
    let newdata;
    const handelSubmit = async (event)=>{
        event.preventDefault();
        if(handelValidation()){
            const {username ,password} = values;
            const postData ={ username, password };
            await axios.post(LogInRoute, postData)
            .then(async (res)=>{
                newdata = res;
                if(newdata.data.status === false){
                    console.log(newdata.data.msg)
                }
                if(newdata.data.status === true ){
                    await localStorage.setItem("nistinder" , newdata.data.userobj);
                    alert("navigate")
                }
            })
            .catch((err)=>{
                console.log(`this err is from axios${err}`)
            })
        }

    }
    return (
        <div className="formContainer">
            <div className="formHeading">
                <h1>
                    LogIn to Nita
                </h1>
            </div>
            <form onSubmit={(event) => handelSubmit(event)}>
                <div className="center"><input className="border-highlight" type="text" placeholder="Username" name="username" required onChange={(event) => handelChange(event)} /></div>
                <div className="center"><input className="border-highlight" type="password" placeholder="Password" name="password" required onChange={(event) => handelChange(event)} /></div>
                <div className="sumitBtn center"><button className="btn-l" type="submit">Create Account</button></div>
                <div className="center">Don't have a account?</div>
            </form>
        </div>
    )
}