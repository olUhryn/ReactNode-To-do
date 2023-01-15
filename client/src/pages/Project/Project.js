import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentProject,
  setTasks,
  setProjects,
} from "@store/modules/projects";
import {
  setProjectAvailableUsers,
  setProjectAssignedUsers,
} from "@store/modules/users";

import "./index.css";

function CreateTaskForm({ setTaskName, createTask, taskName }) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label className="h2">Create Task</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Task Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={(e) => createTask(e)}>
        Create New Task
      </Button>
    </Form>
  );
}

function Project(props) {
  const currentProject = useSelector((state) => state.projects.currentProject);
  const tasks = useSelector((state) => state.projects.tasks);
  const projectAvailableUsers = useSelector(
    (state) => state.users.projectAvailableUsers
  );
  const userData = useSelector((state) => state.users.userData);
  const projectAssignedUsers = useSelector(
    (state) => state.users.projectAssignedUsers
  );
  const params = useParams();

  const [taskName, setTaskName] = useState("");
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
    !projectAvailableUsers.length &&
      Promise.all([
        getProjectById,
        getProjectAssignations,
        getProjectAvailableUsers,
      ]).then((values) => {
        let project = values[0];
        let projectAssignedUser = values[1];
        let projectUsers = values[2];

        dispatch(setCurrentProject(project.data.projects));
        dispatch(
          setProjectAssignedUsers(projectAssignedUser.data.assignations)
        );
        dispatch(setProjectAvailableUsers([...projectUsers.data.assignations]));
      });
    axios
      .get(`http://localhost:8080/api/projects/tasks?project_id=${params.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setTasks(res.data.tasks));
      });
    return removeData;
  }, []);

  const removeData = () => {
    dispatch(setCurrentProject([]));
    dispatch(setProjectAssignedUsers([]));
    dispatch(setProjectAvailableUsers([]));
    dispatch(setTasks([]));
  };
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
            dispatch(setProjectAvailableUsers([...res.data.assignations]));
          });
      });
  };

  const createTask = (e, user) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/api/projects/task",
        {
          owner_id: userData.user_id,
          project_id: currentProject.project_id,
          task_name: taskName,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setTasks([...tasks, res.data]));
      });
  };

  const closeProject = (e, user_id) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8080/api/projects/delete-project`,
        {
          project_id: params.id,
          owner_id: userData.user_id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(setProjects(res.data));
      });
    history.push(`/manage-panel`);
  };

  return (
    <Container>
      <Row className="d-flex w-100">
        {userData?.user_role === "Project Manager" && (
          <>
            <h3 className="mb-2 mt-5 d-flex justify-content-between">
              <span>
                Project:
                {currentProject.project_name ? currentProject.project_name : ""}
              </span>
              <Button variant="danger" onClick={(e) => closeProject(e)}>
                Close Project
              </Button>
            </h3>
            <Col className="col-4 d-flex flex-column">
              <CreateTaskForm
                setTaskName={setTaskName}
                createTask={createTask}
                taskName={taskName}
              />
            </Col>
            <Col className="col-4 d-flex flex-column ">
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
            <Col className="col-4 d-flex flex-column">
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
          </>
        )}
        <Col className="col-12 d-flex flex-column mt-4">
          <h3 className="mb-2">Tasks:</h3>
          {!!tasks.length &&
            tasks.map((task) => (
              <Row
                className="p-2 project-item mb-2"
                key={task.task_id}
                onClick={(e) => {
                  history.push(
                    `/project/${currentProject.project_id}/task/${task.task_id}`
                  );
                }}
              >
                <Col className="col-4">{task.task_name}</Col>
                <Col className="col-4">Status: {task.task_status}</Col>
                <Col className="col-4">
                  Developer: {task.user_name ? task.user_name : "unassigned"}
                </Col>
              </Row>
            ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Project;
