DROP DATABASE IF EXISTS employee_roster_db;
CREATE DATABASE IF NOT EXISTS employee_roster_db;

USE employee_roster_db;

CREATE TABLE department (
  id int auto_increment primary key,
  d_name varchar(100),
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE jobPosition (
  id int auto_increment primary key,
  pos_name varchar(100),
  salary decimal,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE employee (
  id int auto_increment primary key,
  jobPosition_id int,
  first_name varchar(30),
  last_inital varchar(1),
  pos_id int not null,
  dep_id int not null,
  manager_id int,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  foreign key (jobPosition_id) references jobPosition(id),
  foreign key (dep_id) references department(id),
  foreign key (manager_id) references employee(id)
);