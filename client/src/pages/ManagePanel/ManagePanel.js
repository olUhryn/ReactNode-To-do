import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserProfile from "@components/UserProfile";
import AuthWindow from "@components/AuthWindow";
import axios from "axios";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "@store/modules/users";

function ManagePanel() {
  const userData = useSelector((state) => state.users.userData);
  const dispatch = useDispatch();
  return (
    <div>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col className="d-flex col-5 pt-5 justify-content-center">
            {userData?.user_role ? (
              <h2>You are {userData?.user_role}</h2>
            ) : userData ? (
              <h2>Please finish registration</h2>
            ) : (
              <h2>Please log in</h2>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ManagePanel;
