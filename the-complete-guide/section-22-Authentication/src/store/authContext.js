import { createContext, useState, useEffect, useCallback } from "react"

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: token => {},
  logout: () => {},
})

const calculateRemainingTime = expiryTime => {
  const currentTime = new Date().getTime()
  const adjustedExpiryTime = new Date(expiryTime).getTime()

  const remainingTime = adjustedExpiryTime - currentTime

  return remainingTime
}

let logoutTimer

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token")
  const storedExpiry = localStorage.getItem("expiryTime")

  const remainingTime = calculateRemainingTime(storedExpiry)

  if (remainingTime <= 60000) {
    localStorage.removeItem("token")
    localStorage.removeItem("expiryTime")
    return null
  }

  return { token: storedToken, duration: remainingTime }
}

export const AuthContextProvider = props => {
  const tokenData = retrieveStoredToken()

  let initialToken = tokenData ? tokenData.token : ""

  const [token, setToken] = useState(initialToken)
  const userIsLoggedIn = !!token

  const logoutHandler = useCallback(() => {
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("expiryTime")

    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, [])

  const loginHandler = (token, expiryDate) => {
    setToken(token)
    localStorage.setItem("token", token)
    localStorage.setItem("expiryTime", expiryDate)

    const remainingTime = calculateRemainingTime(expiryDate)

    logoutTimer = setTimeout(logoutHandler, remainingTime)
  }

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration)
      logoutTimer = setTimeout(logoutHandler, tokenData.duration)
    }
  }, [tokenData, logoutHandler])

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
