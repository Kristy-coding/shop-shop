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

        import {
            UPDATE_PRODUCTS,
            UPDATE_CATEGORIES,
            UPDATE_CURRENT_CATEGORY
          } from "./actions";
          
          export const reducer = (state, action) => {
            switch (action.type) {
              // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
              case UPDATE_PRODUCTS:
                return {
                  ...state,
                  products: [...action.products],
                };
          
              // if it's none of these actions, do not update state at all and keep things the same!
              default:
                return state;
            }
          };