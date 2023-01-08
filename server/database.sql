CREATE DATABASE tododb;

CREATE TABLE users ( 
    user_id int NOT NULL, 
    user_name VARCHAR(30) NOT NULL, 
    user_email VARCHAR(30) NOT NULL,
    user_password VARCHAR(30) NOT NULL,
    user_role VARCHAR(15),
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES projects(owner_id),
    FOREIGN KEY (user_id) REFERENCES projects_assignations(user_id),
    FOREIGN KEY (user_id) REFERENCES comments(owner_id)
);

CREATE TABLE projects ( 
    project_id SERIAL int NOT NULL, 
    owner_id int NOT NULL, 
    project_name VARCHAR(30) NOT NULL,
    owner_name VARCHAR(30) NOT NULL,
    creation_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (project_id),
    FOREIGN KEY (project_id) REFERENCES projects_assignations(project_id),
    FOREIGN KEY (project_id) REFERENCES tasks(project_id)

);

CREATE TABLE projects_assignations ( 
    assignation_id: SERIAL int NOT NULL
    project_id int NOT NULL,
    user_id int NOT NULL
);

CREATE TABLE tasks ( 
    task_id int NOT NULL, 
    project_id int NOT NULL,
    task_name VARCHAR(60) NOT NULL,
    task_status VARCHAR(20) NOT NULL,
    creation_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    employee_id TEXT,
    PRIMARY KEY (task_id),
    FOREIGN KEY (task_id) REFERENCES comments(task_id),
);

CREATE TABLE comments ( 
    comment_id int NOT NULL, 
    owner_id int NOT NULL,
    task_id int NOT NULL,
    creation_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    comment_description VARCHAR(1000) NOT NULL,
    PRIMARY KEY (comment_id),
);

SELECT * FROM users;
INSERT INTO users (user_name, user_email, user_password, user_role) VALUES ('bob', 'bob@gmail.com', 'bob', 'PM');
 
INSERT INTO projects (owner_id, owner_name, project_name) VALUES ('sadasd', 'project name', 'project name');
INSERT INTO projects_assignations (project_id, employee_id, project_name, creation_date) VALUES ('sadasd', 'project name');

INSERT INTO tasks (project_id, task_name, task_status, creation_date, employee_id) VALUES ('bob', 'bob@gmail.com', 'bob');
INSERT INTO comments (owner_id, task_id, user_name, creation_date, comment_description) VALUES ('bob', 'bob@gmail.com', 'bob');

UPDATE users
SET user_role = 'Alfred Schmidt'
WHERE user_id = 1;

--DROP TABLE projects_assignations;
--psql -U postgres 
--\c tododb
--\dt 
