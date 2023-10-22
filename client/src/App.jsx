import { useSelector } from "react-redux";
import { HomePage, LoginPage, ProfilePage, RegisterPage } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {!token ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
