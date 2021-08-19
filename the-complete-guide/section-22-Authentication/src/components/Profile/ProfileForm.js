import { useRef, useContext } from "react"
import { useHistory } from "react-router-dom"

import AuthContext from "../../store/authContext"

import classes from "./ProfileForm.module.css"

const ProfileForm = () => {
  const newPasswordInputRef = useRef()
  const history = useHistory()

  const authContext = useContext(AuthContext)

  const submitHandler = e => {
    e.preventDefault()

    const newPassword = newPasswordInputRef.current.value

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAFRymn0bp6VxxjQ6sjHiJRVcTGXVhO-FU",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authContext.token,
          password: newPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(res => {
        history.replace("/")
      })
      .then(data => {
        console.log(data)
      })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
