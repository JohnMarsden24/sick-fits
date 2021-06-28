// import classes from "./Notification.module.css"

// const Notification = props => {
//   let specialClasses = ""

//   if (props.status === "error") {
//     specialClasses = classes.error
//   }
//   if (props.status === "success") {
//     specialClasses = classes.success
//   }

//   const cssClasses = `${classes.notification} ${specialClasses}`

//   return (
//     <section className={cssClasses}>
//       <h2>{props.title}</h2>
//       <p>{props.message}</p>
//     </section>
//   )
// }

// export default Notification

/*
 * USING RTK Query
 */

import classes from "./Notification.module.css"

const Notification = props => {
  let specialClasses = ""
  let title, message

  if (props.hasError) {
    specialClasses = classes.error
    title = "Error"
    message = "Something went wrong"
  }
  if (props.isLoading) {
    specialClasses = classes.success
    title = "Success"
    message = "Fetching data was successful"
  }

  const cssClasses = `${classes.notification} ${specialClasses}`

  return (
    <section className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  )
}

export default Notification
