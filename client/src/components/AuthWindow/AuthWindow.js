import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./index.css";
function SignInForm({ SignIn, setEmail, setPassword, switchTabs }) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label className="h2">Sign In</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Don't have account?</Form.Label>
        <Button variant="link" onClick={(e) => switchTabs(1)}>
          Sign Up
        </Button>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={(e) => SignIn(e)}>
        Sign In
      </Button>
    </Form>
  );
}

function SignUpForm({ SignUp, setEmail, setPassword, switchTabs, setName }) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label className="h2">Sign Up</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="name"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Already have an account?</Form.Label>
        <Button variant="link" onClick={(e) => switchTabs(0)}>
          Sign In
        </Button>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={(e) => SignUp(e)}>
        Sign Up
      </Button>
    </Form>
  );
}

function Authentication() {
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const switchTabs = (value) => {
    console.log(value);
    setActiveTab(value);
  };
  const SignIn = (e) => {
    e.preventDefault();
    console.log("here");
    axios.post("http://localhost:8080/api/auth/login", {
      email,
      password,
    });
  };
  const SignUp = (e) => {
    e.preventDefault();
    console.log("here");
    axios.post("http://localhost:8080/api/users", {
      email,
      name,
      password,
    });
  };
  return (
    <div className="d-flex flex-column">
      {!activeTab ? (
        <SignInForm
          SignIn={SignIn}
          setEmail={setEmail}
          setPassword={setPassword}
          switchTabs={switchTabs}
        />
      ) : (
        <SignUpForm
          SignUp={SignUp}
          setEmail={setEmail}
          setPassword={setPassword}
          switchTabs={switchTabs}
          setName={setName}
        />
      )}
    </div>
  );
}

export default Authentication;
