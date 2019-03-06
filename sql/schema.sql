CREATE TABLE users(
  username VARCHAR(20) NOT NULL,
  fullname VARCHAR(40) NOT NULL,
  email VARCHAR(40) NOT NULL,
  password VARCHAR(256) NOT NULL,
  created TIMESTAMP NOT NULL,
  PRIMARY KEY(username)
);

CREATE TABLE projects(
  projectid INTEGER PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  owner VARCHAR(20) NOT NULL,
  created TIMESTAMP NOT NULL,
  FOREIGN KEY(owner) REFERENCES users(username) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE creators(
  creatorid INTEGER PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  projectid INT NOT NULL,
  filename VARCHAR(64) NOT NULL,
  created TIMESTAMP NOT NULL,
  FOREIGN KEY(username) REFERENCES users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY(projectid) REFERENCES projects(projectid)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE friends(
  username1 VARCHAR(20) NOT NULL,
  username2 VARCHAR(20) NOT NULL,
  created TIMESTAMP NOT NULL,
  PRIMARY KEY(username1, username2),
  FOREIGN KEY(username1) REFERENCES users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY(username2) REFERENCES users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
