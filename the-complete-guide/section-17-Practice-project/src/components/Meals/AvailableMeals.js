import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useState, useEffect } from 'react';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import useHttp from '../../hooks/useHttp';

import api from '../../services/api';

const AvailableMeals = () => {
  // const [meals, setMeals] = useState([])



  const { isLoading, isError, data, error } = useQuery('meals', () => api({endpoint: 'meals', method: 'GET'}))

  const loadedMeals = []
  
  for (const key in data) {
    loadedMeals.push({
      id: key,
      name: data[key].name,
      description: data[key].description,
      price: data[key].price
    })
  }


//   useEffect(() => {
//     fetchData({endpoint: 'meals', method: 'GET'}).then(data => {
//       const loadedMeals = []
  
//         for (const key in data) {
//           loadedMeals.push({
//             id: key,
//             name: data[key].name,
//             description: data[key].description,
//             price: data[key].price
//           })
//         }

//       setMeals(loadedMeals)
// })
//   }, [])

  if (isLoading) {
    return <section className={classes.MealsLoading}><p>Loading....</p></section>
  }

  if (isError) {
    return <section className={classes.MealsError}><p>{isError}</p></section>
  }


  const mealsList = loadedMeals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    )
  });


  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
