CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE DATABASE tododb;

CREATE TABLE users ( 
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), 
    user_name TEXT NOT NULL, 
    user_email TEXT NOT NULL,
    user_password TEXT NOT NULL,
    user_role TEXT
);

CREATE TABLE projects ( 
    project_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), 
    owner_id TEXT NOT NULL, 
    project_name TEXT NOT NULL,
    owner_name Text NOT NULL,
    creation_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE projects_assignations ( 
    project_id TEXT NOT NULL,
    employee_id TEXT NOT NULL,
    project_name TEXT NOT NULL,
    employee_name TEXT NOT NULL
);

CREATE TABLE tasks ( 
    task_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), 
    project_id TEXT NOT NULL,
    task_name TEXT NOT NULL,
    task_status TEXT NOT NULL,
    creation_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    employee_id TEXT
);

CREATE TABLE comments ( 
    comment_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), 
    owner_id TEXT NOT NULL,
    task_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    creation_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    comment_description TEXT NOT NULL
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

--DROP TABLE users;
--psql -U postgres 
--\c tododb
--\dt 