import { useState, useEffect } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  // State to manage form inputs
  const [mealData, setMealData] = useState({
    id: '',
    name: '',
    description: '',
    price: ''
  });

  // State to manage the list of meals
  const [meals, setMeals] = useState([]);

  // Load meals from local storage when component mounts
  useEffect(() => {
    const storedMeals = localStorage.getItem('meals');
    if (storedMeals) {
      setMeals(JSON.parse(storedMeals));
    }
  }, []);

  // Update local storage whenever meals change
  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  // Handler for input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the new meal to the list
    setMeals(prevMeals => [
      ...prevMeals,
      { ...mealData }
    ]);
    // Reset form inputs
    setMealData({
      id: '',
      name: '',
      description: '',
      price: ''
    });
  };

  return (
    <section className={classes.meals}>
      <Card>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.formControl}>
            <label htmlFor="id">ID: </label>
            <input 
              type="text"
              id="id"
              name="id"
              value={mealData.id}
              onChange={handleChange}
            />
          </div>
          <div className={classes.formControl}>
            <label htmlFor="name">Chocolate Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={mealData.name}
              onChange={handleChange}
            />
          </div>
          <div className={classes.formControl}>
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              id="description"
              name="description"
              value={mealData.description}
              onChange={handleChange}
            />
          </div>
          <div className={classes.formControl}>
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              id="price"
              name="price"
              value={mealData.price}
              onChange={handleChange}
            />
          </div>
          <div className={classes.actions}>
            <button type="submit">Add </button>
          </div>
        </form>
      </Card>
      {/* Render the list of meals */}
      <ul>
        {meals.map(meal => (
          <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        ))}
      </ul>
    </section>
  );
};

export default AvailableMeals;
