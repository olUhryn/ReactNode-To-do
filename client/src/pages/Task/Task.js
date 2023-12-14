import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { setCurrentTask, setComments } from "@store/modules/projects";
import { setProjectAssignedUsers } from "@store/modules/users";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

import "./index.css";

function Task(props) {
  const currentTask = useSelector((state) => state.projects.currentTask);
  const comments = useSelector((state) => state.projects.comments);
  const userData = useSelector((state) => state.users.userData);

  const projectAssignedUsers = useSelector(
    (state) => state.users.projectAssignedUsers
  );
  const [description, setDescription] = useState("");
  const [comment, setCommentDescription] = useState("");

  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let taskRequest = axios.get(
      `http://localhost:8080/api/projects/task?task_id=${params.task_id}`,
      {
        withCredentials: true,
      }
    );

    let assignationsRquest = axios.get(
      `http://localhost:8080/api/projects/assignations?project_id=${params.id}`,
      {
        withCredentials: true,
      }
    );
    Promise.all([taskRequest, assignationsRquest]).then((responses) => {
      let task = responses[0].data;
      let assigned = responses[1].data.assignations;
      dispatch(setCurrentTask(task));
      dispatch(setProjectAssignedUsers(assigned));
    });

    axios
      .get(
        `http://localhost:8080/api/projects/task/comments?task_id=${params.task_id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(setComments(res.data));
      });

    return () => {
      dispatch(setCurrentTask(null));
      dispatch(setComments([]));
    };
  }, []);

  const setTaskStatus = (e, status) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8080/api/projects/update-task`,
        {
          task_id: params.task_id,
          task_status: status,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(setCurrentTask(res.data));
      });
  };

  const setTaskDescription = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8080/api/projects/update-task`,
        {
          task_id: params.task_id,
          task_description: description,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(setCurrentTask(res.data));
      });
  };

  const assignUser = (e, user_id) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8080/api/projects/update-task`,
        {
          task_id: params.task_id,
          assigned_user_id: user_id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(setCurrentTask(res.data));
      });
  };
  const closeTask = (e, user_id) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8080/api/projects/delete-task`,
        {
          task_id: params.task_id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(setCurrentTask(null));
      });
    history.push(`/project/${params.id}`);
  };

  const createComment = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8080/api/projects/task/comment`,
        {
          task_id: params.task_id,
          comment_description: comment,
          owner_id: userData.user_id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(setComments([res.data, ...comments]));
      });
  };

  const formatDate = (timestampt) => {
    let date = new Date(timestampt);
    return (
      date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString()
    );
  };
  return (
    currentTask && (
      <Container>
        <Row className="d-flex justify-content-center w-100">
          {" "}
          <Col className="d-flex col-12 justify-content-between pt-2 pb-2">
            <h3 className="d-flex justify-content-center me-4">
              Task: {currentTask.task_name}
            </h3>{" "}
            {userData.user_role === "Project Manager" && (
              <Button variant="danger" onClick={(e) => closeTask(e)}>
                Close Task
              </Button>
            )}
          </Col>
        </Row>
        <Row className="d-flex justify-content-center w-100">
          <div className="d-flex justify-content-center">
            <Col className="col-4">
              <h3 className="col-6 d-flex">
                Status:{" "}
                <Form.Select
                  className="ms-2 status-select"
                  aria-label="Default select example"
                  value={
                    currentTask.task_status ? currentTask.task_status : "To Do"
                  }
                  onChange={(e) => setTaskStatus(e, e.target.value)}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </Form.Select>
              </h3>
            </Col>
            {userData.user_role === "Project Manager" && (
              <Col className="col-8">
                <h3 className="d-flex justify-content-center">
                  <p className="text-nowrap">Assigned developer: </p>
                  <Form.Select
                    className="ms-2"
                    aria-label="Default select example"
                    value={
                      currentTask.assigned_user_id
                        ? currentTask.assigned_user_id
                        : null
                    }
                    onChange={(e) => assignUser(e, e.target.value)}
                  >
                    <option>unassigned</option>
                    {projectAssignedUsers.map((user) => (
                      <option key={user.user_id} value={user.user_id}>
                        {user.user_name}
                      </option>
                    ))}
                  </Form.Select>
                </h3>
              </Col>
            )}
          </div>
          <Col className="col-12 mb-4 mt-4">
            <h4 className="d-flex justify-content-center">Description</h4>
            <InputGroup>
              <Form.Control
                onBlur={(e) => setTaskDescription(e)}
                onChange={(e) => setDescription(e.target.value)}
                as="textarea"
                value={description ? description : currentTask.task_description}
                aria-label="With textarea"
                className="description"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="col-6">
            <h4 className="d-flex justify-content-center">Comments:</h4>
            <InputGroup>
              <Form.Control
                as="textarea"
                onBlur={(e) => createComment(e)}
                onChange={(e) => setCommentDescription(e.target.value)}
                aria-label="New Comment"
                className="description"
                placeholder="type new comment"
              />
            </InputGroup>
          </Col>
        </Row>
        {!!comments.length &&
          comments.map((comment) => {
            return (
              <Row
                className={
                  comment.owner_id === userData.user_id
                    ? "justify-content-start"
                    : "justify-content-end"
                }
              >
                <Col className="col-6">
                  <p className="comment_title">
                    {" "}
                    {comment.owner_id === userData.user_id
                      ? "You"
                      : comment.user_name}
                    {":"}
                  </p>
                  <p className="comment_description">
                    {comment.comment_description}
                    <span>{formatDate(comment.creation_date)}</span>
                  </p>
                </Col>
              </Row>
            );
          })}
      </Container>
    )
  );
}

export default Task;
