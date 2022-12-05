import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "@store/modules/projects";
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

function Projects(props) {
  const projects = useSelector((state) => state.projects.projects);
  const userData = useSelector((state) => state.users.userData);

  const [projectName, setProjectName] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/projects?user_id=${userData.user_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setProjects(res.data.projects));
      });
  }, []);

  const createProject = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/api/projects",
        {
          user_name: userData.user_name,
          user_id: userData.user_id,
          project_name: projectName,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setProjects([...projects, res.data]));
      });
  };

  return (
    <Row className="d-flex justify-content-center w-100">
      <Col className="col-6 d-flex flex-column">
        <h3 className="mb-2">Projects:</h3>
        {projects.map((project) => (
          <div className="p-2 project-item mb-2" key={project.project_id}>
            {project.project_name}
          </div>
        ))}
      </Col>
      <Col className="col-6 d-flex flex-column">
        <CreateProjectForm
          setProjectName={setProjectName}
          createProject={createProject}
          projectName={projectName}
        />
      </Col>
    </Row>
  );
}

export default Projects;
