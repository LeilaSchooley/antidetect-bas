import React from "react";
import "./BrowserProfilesTable.css";

const BrowserProfilesTable = ({
  profiles,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  return (
    <div className="table-container">
      <table className="profiles-table">
        <thead>
          <tr>
            <th>Profile Name</th>
            <th>Status</th>
            <th>Proxy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.name}</td>
              <td>{profile.status}</td>
              <td>{profile.proxy}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => onEdit(profile.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => onDelete(profile.id)}
                >
                  Delete
                </button>
                <button
                  className="status-button"
                  onClick={() => onToggleStatus(profile.id)}
                >
                  {profile.status === "Active" ? "Stop" : "Start"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrowserProfilesTable;
