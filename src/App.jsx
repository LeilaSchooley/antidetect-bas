import React, { useState } from "react";
import BrowserProfilesTable from "./BrowserProfilesTable";
import CreateProfileForm from "./CreateProfileForm";
import EditProfileForm from "./EditProfileForm";

const App = () => {
  const [profiles, setProfiles] = useState([
    { id: 1, name: "Profile 1", status: "Active", proxy: "http://proxy1.com" },
    {
      id: 2,
      name: "Profile 2",
      status: "Inactive",
      proxy: "http://proxy2.com",
    },
    { id: 3, name: "Profile 3", status: "Active", proxy: "http://proxy3.com" },
  ]);
  const [editingProfile, setEditingProfile] = useState(null);

  const handleCreate = (profile) => {
    setProfiles([
      ...profiles,
      { ...profile, id: profiles.length + 1, status: "Inactive" },
    ]);
  };

  const handleUpdate = (id, updatedProfile) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === id ? { ...profile, ...updatedProfile } : profile
      )
    );
    setEditingProfile(null);
  };

  const handleDelete = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const handleToggleStatus = (id) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === id
          ? {
              ...profile,
              status: profile.status === "Active" ? "Inactive" : "Active",
            }
          : profile
      )
    );
  };

  const handleEdit = (id) => {
    setEditingProfile(profiles.find((profile) => profile.id === id));
  };

  return (
    <div>
      <h1>Browser Profiles</h1>
      <BrowserProfilesTable
        profiles={profiles}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />
      <h2>Create New Profile</h2>
      <CreateProfileForm onCreate={handleCreate} />
      {editingProfile && (
        <>
          <h2>Edit Profile</h2>
          <EditProfileForm profile={editingProfile} onUpdate={handleUpdate} />
        </>
      )}
    </div>
  );
};

export default App;
