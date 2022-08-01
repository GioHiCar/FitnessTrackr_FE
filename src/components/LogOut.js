import React from 'react';


function handleLogout() {
    return (
        
        localStorage.removeItem("token")  

    )
  }

  export default handleLogout;