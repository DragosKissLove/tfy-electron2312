// src/ThemeContext.js
import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from './themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('#C0392B'); // default red

  const theme = {
    ...(darkMode ? darkTheme : lightTheme),
    primary: primaryColor
  };

  return (
    <ThemeContext.Provider value={{ theme, darkMode, setDarkMode, primaryColor, setPrimaryColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
