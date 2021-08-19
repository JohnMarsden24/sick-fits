import { useState, useRef, useContext } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../../store/authContext"

import classes from "./AuthForm.module.css"

const AuthForm = () => {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const history = useHistory()

  const authContext = useContext(AuthContext)

  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState)
  }

  const submitHandler = e => {
    e.preventDefault()
    setIsLoading(true)

    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    const url = isLogin
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFRymn0bp6VxxjQ6sjHiJRVcTGXVhO-FU"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFRymn0bp6VxxjQ6sjHiJRVcTGXVhO-FU"

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        setIsLoading(false)
        if (res.ok) {
          return res.json()
        } else {
          return res.json().then(data => {
            const errorMessage = data?.error?.message
              ? data.error.message
              : "Authentication failed"

            throw new Error(errorMessage)
          })
        }
      })
      .then(data => {
        const expiryTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        )
        authContext.login(data.idToken, expiryTime)
        history.replace("/")
      })
      .catch(err => {
        alert(err.message)
      })
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm
