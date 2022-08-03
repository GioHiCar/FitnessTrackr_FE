import React, { useState } from "react";


export default function counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <textarea
        type="text"
        rows={5}
        className="full_height_Width"
        onChange={e => setCount(e.target.value.length)}
      />
      <p>{count}</p>
    </div>
  );
}