import React, { useState, useEffect } from "react";

const EditProfileForm = ({ profile, onUpdate }) => {
  const [name, setName] = useState(profile.name);
  const [proxy, setProxy] = useState(profile.proxy);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(profile.id, { name, proxy });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Profile Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Proxy URL:</label>
        <input
          type="text"
          value={proxy}
          onChange={(e) => setProxy(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditProfileForm;
