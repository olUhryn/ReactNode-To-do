import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import AuthWindow from "../../components/AuthWindow";
import axios from 'axios'
import "./index.css";

function Authentication() {

  return (
    <div>
      <Container>
        <AuthWindow />
      </Container>
    </div>
  );
}

export default Authentication;
