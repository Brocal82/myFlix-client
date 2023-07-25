import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://my-flix-app1982-c9c41fd3e5b8.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3 className="white-text">Log in:</h3>
      <Form.Group controlId="formUsername">
        <Form.Label className="white-text">Username:</Form.Label>
        <Form.Control 
          className="bg-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label className="white-text">Password:</Form.Label>
        <Form.Control
          className="bg-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
      </Form.Group>

      <Button className="submit-button" variant="primary" type="submit">Submit</Button>
    </Form>
  );
};

      

      
