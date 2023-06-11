import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MovieDetails from './pages/MovieDetails/MovieDetails';
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import CombineContextProvider from "./contexts/ThemeContext"
import MyFavorites from "./pages/MyFavorites/MyFavorites";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const serverUrl = import.meta.env.VITE_SERVER_URL;


  return (
    <BrowserRouter>
      <CombineContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage apiKey={apiKey} baseUrl={baseUrl} />} />
          <Route path="/moviedetails/:movieid" element={<MovieDetails serverUrl={serverUrl} apiKey={apiKey} baseUrl={baseUrl}/>} />
          <Route path="/myFavorites" element={<MyFavorites serverUrl={serverUrl} apiKey={apiKey} baseUrl={baseUrl}/>} />
          <Route path="/signIn" element={<SignIn serverUrl={serverUrl} /> } />
          <Route path="/signUp" element={<SignUp serverUrl={serverUrl} /> } />
        </Routes>
      </CombineContextProvider>
    </BrowserRouter>
  );
}

export default App;