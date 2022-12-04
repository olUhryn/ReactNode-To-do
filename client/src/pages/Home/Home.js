import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserProfile from "./UserProfile";
import AuthWindow from "../../components/AuthWindow";

function Home() {
  const [userId, setUserId] = useState(null);

  return (
    <div className="home">
      <Container>
        <h2 className="mt-5 h1">Your Profile</h2>
        {userId ? (
          <UserProfile />
        ) : (
          <Row className="d-flex justify-content-center">
            <Col className="col-5">
              <AuthWindow />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Home;
