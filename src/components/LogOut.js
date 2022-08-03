import React from 'react';



function handleLogout() {

    return (
        window.location.reload(true),
        localStorage.removeItem("token")
    )
  }

  export default handleLogout;