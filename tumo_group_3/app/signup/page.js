"use client"
import styles from "../page.module.css"
import { useState } from "react"
import {LoginRequest, SignupRequest} from "../http-request"
import { router } from "next"

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [address, setAddress] = useState('')


    const handleClick = async () => {
        const response = await SignupRequest({
            email, 
            password,
            name,
            age, 
            address
        })

        if(response?.data.token){
            localStorage.setItem("token", response.data.token)
            router.push("/")
        }
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeAge = (e) => {
        setAge(e.target.value)
    }

    const handleChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    return (
        <div className={styles.main}>
            <input 
            value={email}
            type="text" 
            name="email" 
            onChange={handleChangeEmail}>
            </input>
            <input 
            value={password}
            type="password" 
            name="password" 
            onChange={handleChangePassword}>
            </input>
            <input 
            value={name}
            type="text" 
            name="name" 
            onChange={handleChangeName}>
            </input>
            <input 
            value={age}
            type="text" 
            name="age" 
            onChange={handleChangeAge}>
            </input>
            <input 
            value={address}
            type="text" 
            name="address" 
            onChange={handleChangeAddress}>
            </input>
            
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}