import { Route } from "react-router-dom"

const Welcome = () => {
  return (
    <section>
      <h1>The welcome page</h1>
      <Route path="/welcome/new-user">
        <h1>Hello new user!</h1>
      </Route>
    </section>
  )
}

export default Welcome
