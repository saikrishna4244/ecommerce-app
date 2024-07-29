// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ItemDetailPage from './pages/ItemDetailPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider as CustomThemeProvider, useThemeContext } from './contexts/ThemeContext';

const CustomThemeProviderWrapper = ({ children }) => {
  const { isDarkTheme } = useThemeContext();
  const theme = createTheme({
    palette: {
      mode: isDarkTheme ? 'dark' : 'light',
    },
  });

  return <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>;
};

function App() {
  return (
    <CustomThemeProvider>
      <CustomThemeProviderWrapper>
        <CartProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/item/:id" element={<ItemDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Router>
        </CartProvider>
      </CustomThemeProviderWrapper>
    </CustomThemeProvider>
  );
}

export default App;
