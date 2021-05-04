import React, { useEffect } from "react";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";

//The big change we're about to implement is how the data gets to the UI. Currently, we have it set up to use the useQuery() Hook from Apollo to retrieve all of our category data and use it for the UI. This works great, but because we want to add offline capabilities later, this may become more difficult.

//Instead, we'll query our category data, store it into the global state object, and then use the category data from the global state object to use it in the UI instead. Let's update the CategoryMenu function's code

function CategoryMenu({ setCategory }) {
  // const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  // const categories = categoryData?.categories || [];

  //Now when we use this component, we immediately call upon the useStoreContext() Hook to retrieve the current state from the global state object and the dispatch() method to update state. Because we only need the categories array out of our global state, we simply destructure it out of state so we can use it to provide to our returning JSX.

  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    //if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if(categoryData) {
      //execute our dispatch function wth our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
    }
  }, [categoryData, dispatch]);

  //Now when this component loads and the response from the useQuery() Hook returns, the useEffect() Hook notices that categoryData is not undefined anymore and runs the dispatch() function, setting our category data to the global state!

  //Remember how the useEffect() Hook works. It is a function that takes two arguments, a function to run given a certain condition, and then the condition. In this case, the function runs immediately on load and passes in our function to update the global state and then the data that we're dependent on, categoryData and dispatch. Now, categoryData is going to be undefined on load because the useQuery() Hook isn't done with its request just yet, meaning that if statement will not run.

  //But the beauty of the useEffect() Hook is that it not only runs on component load, but also when some form of state changes in that component. So when useQuery() finishes, and we have data in categoryData, the useEffect() Hook runs again and notices that categoryData exists! Because of that, it does its job and executes the dispatch() function.

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            setCategory(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
