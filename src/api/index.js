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
    const token = result.token;
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
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`,
     },
   })
     const result = await response.json();
     return result;
  }

  export const getUserRoutines = async (token, username) => {
    const response = await fetch(`${BASE_URL}/users/${username}/routines`, 
    { headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
  })
  const result = await response.json()

  return result
}



export const addRoutine = async (name, goal, isPublic, token) => {
  const response = await fetch(`${BASE_URL}/routines`,{
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
    body: JSON.stringify({
      name:name,
      goal: goal,
      isPublic: isPublic
    })
  })
  const result = await response.json()
   return result
}

export const getAllActivities = async () => {
 const response = await fetch(`${BASE_URL}/activities`)
 const result = await response.json();
 return result;
}

export const addActivity = async (name, description,token) => {
  const response = await fetch(`${BASE_URL}/activities`,{
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      description: description
    })
  })
  const result = await response.json()
   return result
}

export const patchRoutines = async (name, goal,isPublic, token,routineId) => {
  const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
    method: "PATCH",
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
  body: JSON.stringify({
    name: name,
    goal: goal,
    isPublic: isPublic
  })
})
  const result = await response.json()
  return result
}


export const AddToRoutine  = async (routineId,count,duration,token,activityId) => {
  console.log("api this is routine id:",routineId," api this is count:",count," api this is duration:",duration,"api this is token:",token," api this is activity id:",activityId)
  const response = await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
    method: "POST",
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
    body: JSON.stringify({
      activityId: activityId,
      count: count, 
      duration: duration
    })
})
  const result = await response.json()
  return result
}


export const deleteRoutines = async (token,routineId)=> {
  const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
    method: "DELETE",
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`,
    }
})
  const result = await response.json()
  return result
  
}


export const patchActivities = async (name, description, activityId,token) => {
  const response = await fetch(`${BASE_URL}/activities/${activityId}`, {
    method: "PATCH",
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
  body: JSON.stringify({
    name,
    description
  })
})
  const result = await response.json()
  return result
}

export const patchRoutineActivities = async (count,duration,routineActivityId,token) => {
  const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
    method: "PATCH",
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
  body: JSON.stringify({
    count,
    duration
  })
})
  const result = await response.json()
  console.log(result,"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  return result
}


export const deleteRoutineActivity = async(routineActivityId,token) => {
  const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`,{

    method: "DELETE",
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`,
    }
})
  const result = await response.json()
  return result
  

  }




