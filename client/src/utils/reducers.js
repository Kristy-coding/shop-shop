

//he src folder of your React app, create a new folder called __tests__. Now, these tests we are about to write aren't React-specific, as they don't test how a UI component will behave. These tests will work more like the tests we've written in the past, where we test purely the functionality of our reducers to see if we get the intended output. This will help us understand the purpose of reducer functions as well.

//In that directory, create a file called reducers.test.js. Before we start writing our tests and reducer functionality, it's critical to understand what the purpose of a reducer is.

//A reducer is a function that updates state by returning a new state object and never alters the original state object. Now, that doesn't mean the data inside the state object isn't altered. Of course, it is—why else would we need to update state? The key takeaway here is that state is intended to be immutable, meaning it never should be directly altered in any way. The reason for this is that it goes behind the state management system's back and it isn't informed that something has changed.

//The following code shows an example of what NOT to do with state, using a regular JavaScript object:

// // original state
// const state = {
//     name: 'Lernantino',
//     email: 'lernantino@gmail.com' 
//   }
  
//   // update (or mutate) state directly
//   state.email = 'lernantino99@gmail.com';

// This is fine in normal JavaScript. As a matter of fact, we do this all the time! But this isn't a great idea when we need to keep track of an application's state in the proper way, as we simply reached in and altered something without alerting the rest of the application that it's been altered. What if that email address were displayed on the page—how would it know that it needs to be updated?

// Instead, we want to do something like what's shown in the following code to update state:

// // original state
// const state = {
//   name: 'Lernantino',
//   email: 'lernantino@gmail.com' 
// };

// // create a new version of state by making a copy of the original state's data and updating only the part that has changed
// const updatedState = {...state, email: 'lernantino99@gmail.com'};

//Now, there's more that goes into this when it comes to letting the UI know the application's state has changed, but we'll see that soon. The key takeaway here is that we now have the original state and the updated state in two separate entities, allowing the application to compare them and notice the change, thus informing the UI to acknowledge the change and update what the user sees.

//State is a conceptually heavy topic. It takes time to gain a firm grasp of all the unseen events that are put to use with an app like this, but with time it'll become clearer. The important thing for us to know is that when updating state, it's important that we do so by creating a new version of it rather than reaching out and directly altering it.

 //This reducer function accepts the following two parameters:
        // 1.) the current state object, so we can make our copy of it for the new state
        // 2.) the action we're performing to update the state, which is broken into the following two parts as an object:
            // a.) type: this is the type of action we are performing, and should be one of the predefined actions we created earlier
            // b.) value: this won't always have the name "value" but it is a name representative of the new data that we want to use with the action
        //In our case, we pass in the current state held in initialState and then our action, indicating that we want to update our products list with the contents held in the products array. 

        //----------------------------------------notes ---------------------------------------//

        //What we need to do is set up a function that will know how to take in our state and update it through our reducer() function. Luckily, we'll lean on another React Hook, called useReducer()
        import { useReducer } from 'react';

      

        import {
            UPDATE_PRODUCTS,
            UPDATE_CATEGORIES,
            UPDATE_CURRENT_CATEGORY
          } from "./actions";

          //Adding this code to the reducers.js file imports the possible actions we can perform and creates a function called reducer(). When the function executes, we pass the value of the action.type argument into a switch statement and compare it to our possible actions. Because we're only testing the one action for now, we only need to check it against the UPDATE_PRODUCTS action.

          //If it's that action type, we return a new object with a copy of the state argument using the spread ... operator and then set the products key to a value of a new array with the action.products value spread across it. If it's not that action type, we make no change to state and return it as is. This is in case we accidentally execute an action that isn't predefined.

          //Notice how we use the same function to handle both actions. Instead of writing a reducer for each action, we use one that will look for a matching action value and return a new copy of state from there. If our state was much more complex, the need for multiple reducer functions may arise, but our state is simple enough that it makes the most sense to keep it all together in one function
          
          export const reducer = (state, action) => {
            switch (action.type) {
            // when we call this reducer function we will pass in 2 arguments to pass to the parameters. We will then compare the action.type in the argument to the following cases.
              // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
              case UPDATE_PRODUCTS:
                return {
                //Spread syntax can be used when all elements from an object or array need to be included in a list of some kind.
                  ...state,
                  products: [...action.products],
                };
              //if actio type value is the value of 'UPDATE_CATEGORIES', return a new state object with an updated categories array
              case UPDATE_CATEGORIES:
                  return {
                //Spread syntax can be used when all elements from an object or array need to be included in a list of some kind.
                      ...state,
                      categories: [...action.categories]
                  };
              case UPDATE_CURRENT_CATEGORY:
                  return{
                    //Spread syntax can be used when all elements from an object or array need to be included in a list of some kind.
                      ...state,
                      currentCategory: action.currentCategory
                  }
          
              // if it's none of these actions, do not update state at all and keep things the same!
              default:
                return state;
            }
          };

        
          //What we need to do is set up a function that will know how to take in our state and update it through our reducer() function. Luckily, we'll lean on another React Hook, called useReducer()

          //This function, useProductReducer(), will be used to help initialize our global state object and then provide us with the functionality for updating that state by automatically running it through our custom reducer() function. Think of this as a more in-depth way of using the useState() Hook we've used so much.

            //The useState() Hook is great for managing simpler amounts of state, like form field values and the status of a button being clicked. The useReducer() Hook is meant specifically for managing a greater level of state, like we're doing now. We're going to put it to use next, when we learn more about how all of this comes together.
          export function useProductReducer(initialState) {
              return useReducer(reducer, initialState);
          }

