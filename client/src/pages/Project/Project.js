import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProject } from "@store/modules/projects";
import {
  setProjectAvailableUsers,
  setProjectAssignedUsers,
} from "@store/modules/users";

import "./index.css";

function CreateProjectForm({ setProjectName, createProject, projectName }) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label className="h2">Create Project</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Project Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={(e) => createProject(e)}>
        Create New Project
      </Button>
    </Form>
  );
}

function Project(props) {
  const currentProject = useSelector((state) => state.projects.currentProject);
  const projectAvailableUsers = useSelector(
    (state) => state.users.projectAvailableUsers
  );
  const projectAssignedUsers = useSelector(
    (state) => state.users.projectAssignedUsers
  );
  const params = useParams();

  const [projectName, setProjectName] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    let getProjectById = axios.get(
      `http://localhost:8080/api/projects?project_id=${params.id}`,
      {
        withCredentials: true,
      }
    );
    let getProjectAssignations = axios.get(
      `http://localhost:8080/api/projects/assignations?project_id=${params.id}`,
      {
        withCredentials: true,
      }
    );

    let getProjectAvailableUsers = axios.get(
      `http://localhost:8080/api/projects/available-assignations?project_id=${params.id}`,
      {
        withCredentials: true,
      }
    );
    console.log("jhre");
    !projectAvailableUsers.length &&
      Promise.all([
        getProjectById,
        getProjectAssignations,
        getProjectAvailableUsers,
      ]).then((values) => {
        console.log(values);
        let project = values[0];
        let projectAssignedUser = values[1];
        let projectUsers = values[2];

        dispatch(setCurrentProject(project.data.projects));
        dispatch(
          setProjectAssignedUsers(projectAssignedUser.data.assignations)
        );
        dispatch(setProjectAvailableUsers(projectUsers.data.assignations));
      });
    return dispatch(setProjectAvailableUsers([]));
  }, []);

  const removeUser = (e, user) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/api/projects/delete-assignation",
        {
          user_id: user.user_id,
          project_id: currentProject.project_id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setProjectAvailableUsers([...res.data.assignations]));
        axios
          .get(
            `http://localhost:8080/api/projects/assignations?project_id=${params.id}`,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            dispatch(setProjectAssignedUsers(res.data.assignations));
          });
      });
  };

  const assignUser = (e, user) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/api/projects/projects-assignations",
        {
          user_id: user.user_id,
          project_id: currentProject.project_id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setProjectAssignedUsers([...projectAssignedUsers, res.data]));
        axios
          .get(
            `http://localhost:8080/api/projects/available-assignations?project_id=${params.id}`,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res.data.assignations);
            dispatch(setProjectAvailableUsers([...res.data.assignations]));
          });
      });
  };

  return (
    <Row className="d-flex justify-content-center w-100">
      <h3 className="mb-2 mt-5 d-flex justify-content-center">
        Project {currentProject.project_name ? currentProject.project_name : ""}
      </h3>
      <Col className="col-6 d-flex flex-column ">
        {" "}
        <h3 className="mb-2">Assigned users:</h3>
        {projectAssignedUsers?.map((user) => (
          <div
            className="p-2 project-item mb-2 d-flex justify-content-between"
            key={user.user_id + "employee"}
            onClick={(e) => removeUser(e, user)}
          >
            <span>{user.user_name}</span> <span>{">"}</span>
          </div>
        ))}
      </Col>
      <Col className="col-6 d-flex flex-column">
        <h3 className="mb-2">Available users:</h3>
        {projectAvailableUsers.length
          ? projectAvailableUsers.map((user) => (
              <div
                className="p-2 project-item mb-2"
                key={user.user_id}
                onClick={(e) => assignUser(e, user)}
              >
                {"<"} {user.user_name}
              </div>
            ))
          : null}
      </Col>
    </Row>
  );
}

export default Project;
