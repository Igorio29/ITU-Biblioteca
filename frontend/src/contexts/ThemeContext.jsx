import { createContext, useContext, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import { ThemeProvider } from "@emotion/react";
import createAppTheme from '../theme'
import React from "react";
import PropTypes from "prop-types";
import { CssBaseline } from "@mui/material";

export const ThemeContext = React.createContext(null);

const ThemeContextProvider = ({ children }) => {
    const preferesDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [mode, setMode] = React.useState(preferesDarkMode ? "dark" : "light");
    return (
        <ThemeContext.Provider value={{
            mode,
            setMode
        }}> 
        <ThemeProvider theme={createAppTheme(mode)}>
        {children}
        <CssBaseline />
        </ThemeProvider>
        </ThemeContext.Provider>
    )
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default ThemeContextProvider