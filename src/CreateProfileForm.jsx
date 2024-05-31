import React, { useState } from 'react';

const CreateProfileForm = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [proxy, setProxy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name, proxy });
    setName('');
    setProxy('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Profile Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Proxy URL:</label>
        <input type="text" value={proxy} onChange={(e) => setProxy(e.target.value)} />
      </div>
      <button type="submit">Create Profile</button>
    </form>
  );
};

export default CreateProfileForm;
