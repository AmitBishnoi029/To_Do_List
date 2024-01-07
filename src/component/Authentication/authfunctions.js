
export const login = (email, password) => {

  const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
  const user = usersData.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }

  return false;
};

// Function to simulate user signup
export const signup = (name, email, password) => {

  const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
  const newUser = {
    name: name,
    email: email,
    password: password,
  };

  // Check if the email is already taken
  if (usersData.some((u) => u.email === email)) {
    return false; // Email is already taken
  }

  usersData.push(newUser);
  localStorage.setItem('usersData', JSON.stringify(usersData));
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  return true;
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn;
};

// Function to get the current user's data
export const getCurrentUser = async () => {
  const d=await localStorage.getItem('currentUser');
  // console.log("d"+d);
  const user = JSON.parse(d);
  return user;
};

// Function to log out the current user
export const logout = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
};




// Function to get the user's email after authentication
export const getUserEmail = () => {
  return localStorage.getItem('userEmail');
};



