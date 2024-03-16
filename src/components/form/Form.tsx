import React, { FC, useState } from "react"
import './styles.scss'
import Button from "../button/Button"

interface FormProps {
    title: string,
    handleClick: (email: string, password: string) => void
}

const Form: FC<FormProps> = ({ title, handleClick }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="form">
            <input 
                type='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder='Email' 
            />
            <input 
                type='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder='Password' 
            />
            <Button title={title} onClick={() => handleClick(email, password)} />
        </div>
    )
}

export default Form
