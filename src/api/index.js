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