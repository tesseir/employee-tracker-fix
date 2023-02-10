DROP DATABASE IF EXISTS employee_roster_db;
CREATE DATABASE IF NOT EXISTS employee_roster_db;

USE employee_roster;

CREATE TABLE department (
  id int auto_increment primary key,
  d_name varchar(100),
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE position (
  id int auto_increment primary key,
  pos_name varchar(100),
  salary decimal,
  dep_id int not null,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  foreign key (dep_id) references department(id)
);

CREATE TABLE employee (
  id int auto_increment primary key,
  first_name varchar(30),
  last_inital varchar(1),
  pos_id int not null,
  manager_id int,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  foreign key (pos_id) references position(id),
);