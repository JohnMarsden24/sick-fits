import { useRef, useState } from 'react'


import classes from './Checkout.module.css'

const isValid = value => value.trim() !== ''
const isFive = value => value.trim().length === 5

const Checkout = (props) => {
  const [formInputValidity, setformInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postcode: true
  })

  const nameRef = useRef()
  const streetRef = useRef()
  const postcodeRef = useRef()
  const cityRef = useRef()

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value
    const street = streetRef.current.value
    const postcode = postcodeRef.current.value
    const city = cityRef.current.value

    const nameIsValid = isValid(name)
    const streetIsValid = isValid(street)
    const cityIsValid = isValid(city)
    const postcodeIsValid = isFive(postcode)

    setformInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postcode: postcodeIsValid,
    })

    const formIsValid = nameIsValid && streetIsValid && cityIsValid && postcodeIsValid

    if (!formIsValid) {
      return
    }

    props.onConfirm({name, street, postcode, city})
  };

  const nameControlClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`
  const streetControlClasses = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`
  const cityControlClasses = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`
  const postcodeControlClasses = `${classes.control} ${formInputValidity.postcode ? '' : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef}/>
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef}/>
        {!formInputValidity.name && <p>Please enter a valid street</p>}
      </div>
      <div className={postcodeControlClasses}>
        <label htmlFor='postal'>Post Code</label>
        <input type='text' id='postal' ref={postcodeRef}/>
        {!formInputValidity.name && <p>Please enter a valid post code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef}/>
        {!formInputValidity.name && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

