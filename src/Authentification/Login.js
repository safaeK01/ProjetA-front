import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';
import './auth.css';


const LOGIN_URL = "/signin";

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [isClickedEmail, setIsClickedEmail] = useState(true);

    const handleButtonClick = () => {
      setIsClickedEmail(true);
    };

    useEffect(() => {
        userRef.current.focus();
    }, [])



    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const {token, role}  = response?.data;

     
      localStorage.setItem('token', token);
      localStorage.setItem('role', role)


      switch (role) {
        case 'ADMIN':
          navigate('/admin-page')
          break;
        case 'ETUDIANT':
            navigate('/etudiant-page')
          break;
        case 'ENSEIGNANT':
            navigate('/enseignant-page')
          break;
        default:
            navigate('/Inscription')
          break;
      }
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            setEmail('');
            setPassword('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('email Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <img id="logo" src={require('../images/logo-ubo.jpg')} />
                    <form onSubmit={handleSubmit}>

                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            placeholder="Email"
                            autoComplete="off"
                            className={isClickedEmail ? 'clicked' : ''}
                            onClick={handleButtonClick}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                          
                            aria-describedby="uidnote"
                           
                        />
                    
                        <input
                            type="password"
                            id="password"
                            placeholder="Mot de passe"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-describedby="pwdnote"
                           
                        />
                


                        <button>
                            Login
                        </button>

                    </form>

                </section>
            )}
        </>
    )
}

export default Register