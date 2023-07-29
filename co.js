// Function to generate a random 16-byte access token
function generateAccessToken() {
    let str = "";
    for (let i = 0; i < 16; i++) {
      str += String.fromCharCode(Math.floor(Math.random() * 89) + 33); //33 to 121 (inclusive)
    }
    return str;
  }
  
  // Function to handle logout
  function handleLogout() {
    // Clear user data from local storage
    localStorage.removeItem('userInfo');
    // Redirect to the Signup page after logout
    window.location.href = './index.html';
  }
  
  // Function to handle the signup form submission
  function handleSignup(event) {
    event.preventDefault();
  
    const name = document.getElementById('name-inp').value;
    const email = document.getElementById('email-inp').value;
    const password = document.getElementById('pass-inp').value;
    const confirmPassword = document.getElementById('cnf-pass-inp').value;
  
    const errorMessage = document.getElementById('err-msg');
    errorMessage.style.display = 'none';
  
    if (!name || !email || !password || !confirmPassword) {
      errorMessage.style.display = 'inline-block';
      return;
    }
  
    if (password !== confirmPassword) {
      errorMessage.innerText = 'Error: Passwords do not match!';
      errorMessage.style.display = 'inline-block';
      return;
    }
  
    let userInfo = {
      fullname: name,
      email: email,
      password: password,
      token: generateAccessToken()
    };
  
    errorMessage.innerText = "Successfully Signed Up!";
    errorMessage.style.display = "inline-block";
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  
    setTimeout(() => {
      window.location.href = "./profile.html";
    }, 1000);
  }
  
  // Function to check if the user is logged in and populate user details on the profile page
  function checkLogin() {
    const userInfoJSON = localStorage.getItem('userInfo');
    if (!userInfoJSON) {
      // User is not logged in, redirect to the Signup page
      window.location.href = './index.html';
    } else {
      const userInfo = JSON.parse(userInfoJSON);
      // Populate user details on the Profile page
      document.getElementById('name-field').innerText = userInfo.fullname;
      document.getElementById('email-field').innerText = userInfo.email;
      document.getElementById('token-field').innerText = userInfo.token; // Display the access token
    }
  }
  
  // Event listener for the signup form submission
  document.getElementById('sign-up').addEventListener('click', handleSignup);
  
  // Event listener for the logout button
  document.getElementById('logout-btn').addEventListener('click', handleLogout);
  
  // Call the checkLogin function when the Profile page loads
  checkLogin();
  