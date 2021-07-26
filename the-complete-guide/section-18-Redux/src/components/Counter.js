import classes from "./Counter.module.css"
// import { Component } from "react"

/*
 * USING REDUX
 */

// import { useSelector, useDispatch } from "react-redux"

// const Counter = () => {
//   const dispatch = useDispatch()
//   const counter = useSelector(state => state.counter)
//   const showCounter = useSelector(state => state.showCounter)

//   const incrementHandler = () => {
//     dispatch({ type: "increment" })
//   }
//   const decrementHandler = () => {
//     dispatch({ type: "decrement" })
//   }

//   const increaseHandler = () => {
//     dispatch({ type: "increase", amount: 5 })
//   }

//   const toggleCounterHandler = () => {
//     dispatch({ type: "toggle" })
//   }

//   return (
//     <main className={classes.counter}>
//       <h1>Redux Counter</h1>
//       {showCounter && <div className={classes.value}>{counter}</div>}
//       <div>
//         <button onClick={incrementHandler}>Increment</button>
//         <button onClick={increaseHandler}>Increase by 5</button>
//         <button onClick={decrementHandler}>Decrement</button>
//       </div>
//       <button onClick={toggleCounterHandler}>Toggle Counter</button>
//     </main>
//   )
// }

// export default Counter

/*
 * USING REDUX WITH CLASS COMPONENT
 */

// class Counter extends Component {
//   incrementHandler = () => {
//     this.props.increment()
//   }
//   decrementHandler = () => {
//     this.props.decrement()
//   }

//   toggleCounterHandler = () => {}

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={() => this.incrementHandler()}>Increment</button>
//           <button onClick={() => this.decrementHandler()}>Decrement</button>
//         </div>
//         <button onClick={() => this.toggleCounterHandler()}>
//           Toggle Counter
//         </button>
//       </main>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     counter: state.counter,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     increment: () => dispatch({ type: "increment" }),
//     decrement: () => dispatch({ type: "decrement" }),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Counter)

/*
 * USING REDUX TOOLKIT
 */

import { counterActions } from "../store/counter"

import { useSelector, useDispatch } from "react-redux"

const Counter = () => {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.counter.counter)
  const showCounter = useSelector(state => state.counter.showCounter)

  const incrementHandler = () => {
    dispatch(counterActions.increment())
  }
  const decrementHandler = () => {
    dispatch(counterActions.decrement())
  }

  const increaseHandler = () => {
    dispatch(counterActions.increase(10))
  }

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter())
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  )
}

export default Counter
