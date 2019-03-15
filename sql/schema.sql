CREATE TABLE users(
  username VARCHAR(20) NOT NULL,
  fullname VARCHAR(40) NOT NULL,
  email VARCHAR(40) NOT NULL,
  phonenumber INTEGER NOT NULL,
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
  username VARCHAR(20) NOT NULL,
  projectid INTEGER NOT NULL,
  filename VARCHAR(64) NOT NULL,
  created TIMESTAMP NOT NULL,
  PRIMARY KEY(username, projectid),
  FOREIGN KEY(username) REFERENCES users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY(projectid) REFERENCES projects(projectid)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE collaborators(
  projectid INTEGER NOT NULL,
  username1 VARCHAR(20) NOT NULL,
  username2 VARCHAR(20) NOT NULL,
  created TIMESTAMP NOT NULL,
  PRIMARY KEY(projectid, username1, username2),
  FOREIGN KEY(projectid) REFERENCES projects(projectid)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY(username1) REFERENCES users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY(username2) REFERENCES users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE pendingInvites(
  projectid INTEGER NOT NULL,
  username1 VARCHAR(20) NOT NULL,
  username2 VARCHAR(20) NOT NULL,
  PRIMARY KEY(projectid, username2),
  FOREIGN KEY(projectid) REFERENCES projects(projectid)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY(username1) REFERENCES users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY(username2) REFERENCES users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
