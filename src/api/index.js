const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";


export const userLogin = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
            username: username,
            password: password
          
        }),
      });
      const result = await response.json();
      const token = result.token;
      console.log(token, "THIS IS YOUR TOKEN");
      return token;
    } catch (error) {
      console.log(error);
    }
  };

  export const registerUser = async (username, password) => {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
          username: username,
          password: password
        
      }),
    });
    const result = await response.json();
    console.log(result)
    const token = result.token;
    console.log(token, "THIS IS YOUR TOKEN");
    return token;
  };

  export const getAllRoutines = async () => {
    const response = await fetch(`${BASE_URL}/routines`);
    const result = await response.json();
    return result;
  };


  export const ValidUser = async (token) => {
   const response = await fetch (`${BASE_URL}/users/me`, {
     headers: {
      'Content-Type' : "application/json",
      'Authorization' : `Bearer ${token}`,
     },
   })
     const result = await response.json();
     console.log(result, "THIS IS A RESULT!!!!!!!!!!!!")
     return result;
  }

  export const getUserRoutines = async (token, username) => {
    console.log(username,'this is username')
    const response = await fetch(`${BASE_URL}/users/${username}/routines`, { headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
  })
  const result = await response.json()
  console.log(result, 'this is the rsult') 
  return result
  }

 