import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export default function ThemeContextProvider (props) {
  // const [isDarkMode, setDarkMode] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem('darkMode');
    // if(darkMode) {
    //   setDarkMode(JSON.parse(localStorage.getItem('darkMode')))
    setDarkMode(JSON.parse(theme))
    
  }, [])

  // const darkModeHandler = () => {
  //   localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
  //   setDarkMode(!isDarkMode);
  // }

  return (
    // <ThemeContext.Provider value={{ isDarkMode, darkModeHandler }}>
    //   {props.children}
  
      <ThemeContext.Provider value={{darkMode, setDarkMode}}>
          {props.children}
    </ThemeContext.Provider>
  );
}