import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "@store/modules/users";

function UserProfile(props) {
  const [userRole, setUserRole] = useState("Developer");
  const history = useHistory();
  const dispatch = useDispatch();
  const setRole = (e) => {
    console.log(props.userData.user_id);
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/api/users/update-user",
        {
          user_role: userRole,
          user_id: props.userData.user_id,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // dispatch(setUserData(response.data));
        console.log(response);
        axios
          .get("http://localhost:8080/api/auth/refresh-token", {
            withCredentials: true,
          })
          .then((res) => {
            localStorage.setItem("accessToken", res.data.accessToken);
            //TODO token not updating role value
            function parseJwt(token) {
              if (!token) {
                return;
              }
              const base64Url = token.split(".")[1];
              const base64 = base64Url.replace("-", "+").replace("_", "/");
              return JSON.parse(window.atob(base64));
            }
            dispatch(setUserData(parseJwt(res.data.accessToken)));
            history.push("/manage-panel");
          });
      });
  };

  return (
    <div className="home">
      <Container>
        <Row className="d-flex justify-content-center">
          <Col className="col-5 d-flex flex-column align-items-center">
            <h2 className="mt-5">Select Role</h2>
            <Form className="pt-3 pb-3">
              <div key={`default-radio`} className="mb-3">
                <Form.Check
                  name="Developer"
                  type="radio"
                  id="developer"
                  label="Developer"
                  value="Developer"
                  checked={userRole !== "Project Manager"}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="mb-2"
                />
                <Form.Check
                  name="Project Manager"
                  value="Project Manager"
                  type="radio"
                  id="project-manager"
                  checked={userRole == "Project Manager"}
                  label="Project Manager"
                  onChange={(e) => setUserRole(e.target.value)}
                />
              </div>
            </Form>
            <Button variant="primary" type="submit" onClick={(e) => setRole(e)}>
              Proceed
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserProfile;
