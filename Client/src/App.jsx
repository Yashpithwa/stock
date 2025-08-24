import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import FrontPage from "./pages/FrontPage";
import OTPVerification from "./pages/OTPVerification";
import FirstPage from "./pages/FirstPage";
import InstPage from "./pages/InstPage";
import StockPage from "./pages/StockPage";
import CompareStock from "./pages/CompareStock";
import StockPrediction from "./pages/StockPrediction"
import Ai from "./pages/Ai";
import News from "./pages/News";
import Invest from "./pages/Invest";
import ProtectedRoute from "./components/ProtectedRoute";
import Pivot from "./pages/Pivot";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected routes */}
        <Route 
          path="/FrontPage" 
          element={
            <ProtectedRoute>
              <FrontPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/FrontPage/CompareStock" 
          element={
            <ProtectedRoute>
              <CompareStock />
            </ProtectedRoute>
          } 
        />
         <Route 
          path="/FrontPage/Profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/FrontPage/News" 
          element={
            <ProtectedRoute>
              <News />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/FrontPage/Invest" 
          element={
            <ProtectedRoute>
              <Invest />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/FrontPage/StockPrediction" 
          element={
            <ProtectedRoute>
              <StockPrediction />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/FrontPage/Ai" 
          element={
            <ProtectedRoute>
              <Ai />
            </ProtectedRoute>
          } 
        />
         <Route 
          path="/FrontPage/Pivot" 
          element={
            <ProtectedRoute>
              <Pivot />
            </ProtectedRoute>
          } 
        />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/InstPage" element={<InstPage />} />
        <Route path="/StockPage/:symbol" element={<StockPage />} />
        
        {/* Default route */}
        <Route path="*" element={<FirstPage />} />
      </Routes>
    </Router>
  );
}

export default App;
