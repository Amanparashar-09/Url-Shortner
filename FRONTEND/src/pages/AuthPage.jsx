import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import '../styles/auth.css'

const AuthPage = () => {
    const [login, setLogin] = useState(true)

    return (
        <div className="h-full auth-bg flex flex-col items-center justify-center p-4">
            {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
        </div>
    )
}

export default AuthPage