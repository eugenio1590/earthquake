import React, { useState } from 'react';

const Earthquakes = () => {
  const [name, setName] = useState('Stranger');

  return (
    <div>
      <h3>Hello, {name}!</h3>
      <hr />
      <form>
        <label htmlFor="name">
          Say hello to:
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </form>
    </div>
  );
};

export default Earthquakes;
