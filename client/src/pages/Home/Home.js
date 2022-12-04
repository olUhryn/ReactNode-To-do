import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import UserProfile from "@components/UserProfile";
import AuthWindow from "@components/AuthWindow";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "@store/modules/users";

function Home() {
  const userData = useSelector((state) => state.users.userData);

  const logOut = () => {

  }
  console.log(userData)
  return (
    <div className="home">
      <Container>
        <h2 className="mt-5 h1">Your Profile</h2>
        {userData?.role ? (
          <Button variant="primary" type="submit" onClick={(e) => logOut(e)}>
            Log out
          </Button>
        ) : userData ? (
          <UserProfile userData={userData} setUserData={setUserData} />
        ) : (
          <Row className="d-flex justify-content-center">
            <Col className="col-5">
              <AuthWindow setUserData={setUserData} />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Home;
