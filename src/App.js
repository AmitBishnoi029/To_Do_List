import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./routes/main";
import TopNavbar from "./component/topNavbar";
import Auth from "./routes/auth";
import { useEffect, useState } from "react";
import {
  login,
  signup,
  getCurrentUser,
  logout,
} from "./component/Authentication/authfunctions.js"; 
function App() {
  const [islogged, setisloggedin] = useState(false);
  const [usersData,setuserData] =useState();

  useEffect(() => {
    // Check if the user is already authenticated, and if so, redirect to the dashboard
    checkAuth();
  }, []);

  const checkAuth=async ()=>{
    const val=await localStorage.getItem('isLoggedIn');
    setisloggedin(val=== 'true');
  }
  useEffect(() => {
    return async () => {
          
        var d=await getCurrentUser();
        setuserData(d);
    };
  }, [islogged]);

  function customAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('custom-alert');
    alertDiv.textContent = message;
    
    // Append the custom alert to the body
    document.body.appendChild(alertDiv);
    
    // Remove the custom alert after a certain time (e.g., 3 seconds)
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Replace the default alert function with your custom function
window.alert = customAlert;
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div className="App-navbar">
            <TopNavbar
              isLogged={islogged}
              checkAuth={checkAuth}
              usersData={usersData}
            />
          </div>
          <div className="w-full overflow-hidden">
            <Routes>
              <Route path="/" element={<Main islogged={islogged} usersData={usersData}/>} />
              <Route
                path="/login"
                element={
                  <Auth pgnum={"1"} 
                  isLogged={islogged}
              checkAuth={checkAuth} />
                }
              />
              <Route
                path="/signup"
                element={
                  <Auth pgnum={"2"} 
                  isLogged={islogged}
              checkAuth={checkAuth}
                  />
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
