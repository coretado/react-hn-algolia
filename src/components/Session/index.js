// Dependencies
import React, { createContext, useReducer } from "react";

// Action Type definition
const TOGGLE_MODE = "TOGGLE_MODE";

// Creating context using React.createContext
const Theme = createContext();

// Reducer function for useReducer
const ThemeReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_MODE:
      return {
        ...state,
        day: !state.day
      };
    default:
      return state;
  }
};

// Initial state to feed into useReducer
// Only need to worry about one variable, as this
// context provider is only concerned with how
// the application should look like
const INITIAL_STATE = {
  day: true
};

// Creating context to be exported
// grabbing children from incoming props
// to render incoming functions
const ThemeContext = ({ children }) => {
  const [state, dispatch] = useReducer(ThemeReducer, INITIAL_STATE);

  return (
    <Theme.Provider value={{ state, dispatch }}>{children}</Theme.Provider>
  );
};

const ThemeConsumer = Theme.Consumer;

export { Theme, ThemeContext, ThemeConsumer };
