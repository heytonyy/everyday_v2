import { useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import HomePage from './scenes/homePage';

function App() {
  // TODO: types
  const mode = useSelector((state: any) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* cssbaseline is a css reset for mui */}
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </div>
}

export default App;
