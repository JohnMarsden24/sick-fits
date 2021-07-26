const api = async ({endpoint, method, body}) => {
  const response = await fetch(`https://react-hooks-update-5b844-default-rtdb.firebaseio.com/${endpoint}.json`, {
         method,
         body: JSON.stringify(body)
   })
 
   const data = await response.json()
 
   
       return data
 }
 
 export default api