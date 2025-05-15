import React from "react";
import { useChatContext } from "stream-chat-react";
import { useHistory } from "react-router-dom";

const UserProfilePage = () => {
  const { client } = useChatContext();
  const history = useHistory();

  const user = client.user;

  return (
    <div style={styles.container}>
      <h2>User Profile</h2>
      <img src={user.image} alt="Avatar" style={styles.avatar} />
      <p><strong>Name:</strong> {user.fullName || user.name}</p>
      <p><strong>Username:</strong> {user.id}</p>
      <p><strong>Email/Phone:</strong> {user.email || user.phoneNumber || 'N/A'}</p>
      <button onClick={() => history.push("/")} style={styles.button}>
        ← Back to Chat
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "500px",
    margin: "0 auto",
    textAlign: "center",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    margin: "1rem 0"
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem 1.5rem",
    borderRadius: "8px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  }
};

export default UserProfilePage;
