import React, { useEffect, useRef, useState } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link } from "react-router-dom";

// tailwindCSS style
import * as STYLE from "../styles/Style"


// regex patterns for regitration
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

// url not correct it's for login not register
const Res_URL = "/register";

function Regsiter() {
  const userRef = useRef();
  const errRef = useRef();

  // user state
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // email state
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // password state
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // incase of error or success
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // load focus when the regsiter component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // in case update or change in user check validation
  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);

    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // any time input changes error msg should be set to empty
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  //clear state and controlled inputs
  //need value attrib on inputs for this
  const clearForm = () => {
    setUser("");
    setPwd("");
    setMatchPwd("");
  };

  // submition
  const handleSubmit = async (e) => {
    e.preventDefault();
    // more secure step to not send to back-end unless it's vaild
    const vUser = USER_REGEX.test(user);
    const vEmail = EMAIL_REGEX.test(email);
    const vPwd = PWD_REGEX.test(pwd);
    if (!vPwd || !vUser || !vEmail) {
      setErrMsg("Invalid Inputs");
    }
    try { await axios.post( Res_URL,
        JSON.stringify({ name: user, password: pwd, email: email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess(true);
      clearForm();
    } 
    catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("E-mail already Exist");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className={STYLE.SEC_STYLE}>
          <h2 className="text-center text-purple-700 font-extrabold">Happy Sign up... success!</h2>
          <p className={STYLE.LINK_STYLE}>
            {/*put router link here*/}
            <Link to={"/login"}>Sign In</Link>
          </p>
        </section>
      ) : (
        <section className={STYLE.SEC_STYLE}>
          <p
            ref={errRef}
            className={errMsg 
              ? STYLE.ERR_STYLE
              : "hidden"
            }
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="flex justify-center">
          <h1 
           className={STYLE.H1_STYLE}
          >
            Sign Up
          </h1>
          </div>

          <form  
            className={STYLE.FORM_STYLE}
            onSubmit={handleSubmit}
          >
            {/* Username */}
            <label htmlFor="username" className={STYLE.LABEL_STYLE}>
              Username:
              <span className={validName 
                ? STYLE.GREEN_STYLE 
                : "hidden"
              }>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hidden" : STYLE.RED_STYLE}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              className={STYLE.INPUT_SRYLE}
              autoComplete="off"
              aria-describedby="uidnote"
              aria-invalid={validName ? "false" : "true"}
              required
              ref={userRef}
              value={user}
              onChange={(e) => setUser(e.target.value)}
              onFocus={(_) => setUserFocus(true)}
              onBlur={(_) => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                user && userFocus && !validName 
                ? STYLE.INSTRUCTIONS 
                : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />{' '}
              4 to 24 charachter are allowed length <br />
              must start with a letter, letters, numbers,
              <br />
              spcial charachters (_&%$#@) are allowed
            </p>

            {/* email */}
            <label htmlFor="email" className={STYLE.LABEL_STYLE}>
              Email:
              <span className={validEmail ? STYLE.GREEN_STYLE : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hidden" : STYLE.RED_STYLE}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="email"
              id="email"
              className={STYLE.INPUT_SRYLE}
              autoComplete="off"
              aria-describedby="eidnote"
              aria-invalid={validEmail ? "false" : "true"}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(_) => setEmailFocus(true)}
              onBlur={(_) => setEmailFocus(false)}
            />
            <p
              id="eidnote"
              className={
                email && emailFocus && !validEmail
                ? STYLE.INSTRUCTIONS 
                : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />{" "} 
              email must have @ <br />
              .com or .net at the end
            </p>

            {/* password */}
            <label htmlFor="password" className={STYLE.LABEL_STYLE}>
              Password:
              <span className={validPwd ? STYLE.GREEN_STYLE : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hidden" : STYLE.RED_STYLE}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              className={STYLE.INPUT_SRYLE}
              autoComplete="off"
              aria-describedby="pwdidnote"
              aria-invalid={validPwd ? "false" : "true"}
              required
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              onFocus={(_) => setPwdFocus(true)}
              onBlur={(_) => setPwdFocus(false)}
            />
            <p
              id="pwdidnote"
              className={pwdFocus && !validPwd 
                ? STYLE.INSTRUCTIONS 
                : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />{' '}
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            {/* match password */}
            <label htmlFor="confirmPWD" className={STYLE.LABEL_STYLE}>
              Confirm Password:
              <span className={validMatch && matchPwd ? STYLE.GREEN_STYLE : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hidden" : STYLE.RED_STYLE}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="confirmPWD"
              className={STYLE.INPUT_SRYLE}
              autoComplete="off"
              aria-describedby="confirmidnote"
              aria-invalid={validMatch ? "false" : "true"}
              required
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={(_) => setMatchFocus(true)}
              onBlur={(_) => setMatchFocus(false)}
            />
            <p
              id="confirmidnote"
              className={
                matchFocus && !validMatch 
                ? STYLE.INSTRUCTIONS
                : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />{" "} 
              Must match the first password input field.
            </p>

            {/* submit button */}
            <button
              type="submit"
              disabled={!validName || !validPwd || !validMatch ? true : false}
              className={
                !validName || !validPwd || !validMatch
                ? STYLE.DEACTIVE_STYLE
                : STYLE.ACTIVE_STYLE
              }
            >
              Sign Up
            </button>
          </form>

          {/* sign in route */}
          <p className={STYLE.TEXT_STYLE}>
            Already Have An Account?
            <br />
            <span className={STYLE.LINK_STYLE}>
              {/*put router link here*/}
              <Link to={"/login"}>Login</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default Regsiter;
