import axios from "axios";

const API_KEY = 'jesi-mislio';

// signUp and signIn URL are just diffrent in their string/name 
// accept it as parameter and use one functon to send a request to 2 different URL
// set URL dynamically
async function authenticate(mode, email, password) {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
    console.log(response.data);

    const token = response.data.idToken;
    return token;
    
  } catch (error) {
    throw error;
  }
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export function loginUser(email,password) {
  return authenticate('signInWithPassword', email, password);
}

/*
export async function createUser(email, password) {
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      // Handle the response if needed
    } catch (error) {
      console.error(error.response.data);
      throw error;
    }
  }
*/
