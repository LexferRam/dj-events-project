import { useState, useEffect, useContext } from 'react'
import AuthContext from '@/context/AuthContext';
import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'

const RegisterPage = () => {

    const {register, error} = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if(password !== passwordConfirm){
            toast.error('Password do not match')
            return
        }

        console.log({username,email, password, passwordConfirm})
    }

    return (
        <Layout title='User Registration'>
            <div className={styles.auth}>
                <h1>
                    <FaUser />Register
                </h1>
                <ToastContainer />
                <form onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor='username'>Username</label>
                        <input type="text" name='username' value={username} onChange={e => setUsername(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor='email'>Email Address</label>
                        <input type="email" name='email' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type="password" name='password' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor='passwordConfirm'>Confirm Password</label>
                        <input type="password" name='passwordConfirm' value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                    </div>

                    <input type="submit" value='Login' className='btn' />
                </form>

                <p>Already have an account? <Link href='/account/login'>Login</Link></p>
            </div>
        </Layout>
    );
};

export default RegisterPage;
