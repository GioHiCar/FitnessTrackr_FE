import React from 'react'



// routineId,count,duration,token,activityId


function AddtoRoutine() {



<div>
  <form onSubmit={handleSubmit}>
      <label className="my_routine">
        Name:
        <input required placeholder="Enter Routine Name" id="name" />
      </label>

      <label className="my_routine">
        Goal:
        <input required placeholder="Enter Routine Goal" id="goal" />
      </label>
  </form>
</div>








  return (
    <div>AddtoRoutine</div>
  )
}

export default AddtoRoutine



