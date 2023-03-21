import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useAppSelector } from "state/hooks";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import HomePage from "./scenes/homePage";

function App() {
  const mode = useAppSelector((state) => state.mode);
  const theme = useMemo(
    () => createTheme(themeSettings(mode) as ThemeOptions),
    [mode]
  );
  const isAuth = Boolean(useAppSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* cssbaseline is a css reset for mui */}
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
