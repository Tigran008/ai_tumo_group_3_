"use client"
import styles from "../page.module.css"
import { useState } from "react"
import {LoginRequest} from "../http-request"
import { router } from "next"

export default function Login() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = async () => {
        const response = await LoginRequest(login, password)
        const token = response?.data?.token
        if(token){
            localStorage.setItem("token", token)
            router.push("/")
        }
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleChangeLogin = (e) => {
        setLogin(e.target.value)
    }

    return (
        <div className={styles.main}>
            <input 
            type="text" 
            name="login" 
            onChange={handleChangeLogin}>
            </input>
            <input 
            type="password" 
            name="password" 
            onChange={handleChangePassword}>

            </input>
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}