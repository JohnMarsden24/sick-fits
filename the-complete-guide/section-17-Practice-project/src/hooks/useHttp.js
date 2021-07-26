import { useState, useCallback } from "react"

// const useHttp = () => {
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState('')

//   const fetchData = useCallback(async ({endpoint, method, body}) => {
//     setIsLoading(true)
//     try {
//       const response = await fetch(`https://react-hooks-update-5b844-default-rtdb.firebaseio.com/${endpoint}.json`, {
//         method,
//         body: JSON.stringify(body)
//       })
  
//       return await response.json()
//     } catch (error) {
//       setError(error.message)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [])

//   return {
//     fetchData,
//     isLoading,
//     error
//   }
// }

const useHttp = ({endpoint, method, body}) => {
 return fetch(`https://react-hooks-update-5b844-default-rtdb.firebaseio.com/${endpoint}.json`, {
        method,
        body: JSON.stringify(body)
  })

  // const data = await response.json()

  // console.log(data)
  
  //     return data
}

export default useHttp
