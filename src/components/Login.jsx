import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

// login api url
const Login_URL = "/login";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // load focus when the login component loads
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // any time input changes error msg should be set to empty
  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  //clear state and controlled inputs
  //need value attrib on inputs for this
  const clearForm = () => {
    setEmail("");
    setPwd("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
          Login_URL,
          JSON.stringify({ email, password: pwd }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        clearForm();
        navigate(from, {replace: true});

        const accessToken = response?.data?.access;
        const roles = response?.data?.roles;
        console.log(roles);
        setAuth({ email, pwd, accessToken, roles })
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("please enter your email and password");
        } else if (err.response?.status === 403) {
            setErrMsg("unautherized, Sign up first");
        } else {
          setErrMsg("login Failed");
        }
        errRef.current.focus();
      }
  };

  return (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="user"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="pwd"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Create New Account
            <br />
            <span className="line">
              {/*put router link here*/}
              <Link to={"/register"}>Sign Up</Link>
            </span>
          </p>
        </section>
  );
}

export default Login;
