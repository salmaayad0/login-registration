import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import * as STYLE from "../styles/Style"
import Taps from "../taps/Taps";


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
        // console.log(roles);
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
        <section className={STYLE.SEC_STYLE}>
             <Taps />
          <p
            ref={errRef}
            className={ errMsg 
              ? STYLE.ERR_STYLE 
              : "hidden"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

         <form 
           className={STYLE.FORM_STYLE}
           onSubmit={handleSubmit}
          >
            <label 
             htmlFor="email" 
             className={STYLE.LABEL_STYLE}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="user"
              className={STYLE.INPUT_SRYLE}
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label 
             htmlFor="password" 
             className={STYLE.LABEL_STYLE}
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="pwd"
              className={STYLE.INPUT_SRYLE}
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button
              type="submit"
              disabled={!pwd || !email ? true : false}
              className={
                !pwd || !email
                ? STYLE.DEACTIVE_STYLE
                : STYLE.ACTIVE_STYLE
              }
            >
              Sign In
            </button>
          </form>

        </section>
  );
}

export default Login;
