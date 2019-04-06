CREATE TABLE users(
  username VARCHAR(20) NOT NULL,
  fullname VARCHAR(40) NOT NULL,
  email VARCHAR(40) NOT NULL,
  phonenumber VARCHAR(10) NOT NULL,
  password VARCHAR(256) NOT NULL,
  latitude VARCHAR(256),
  longitude VARCHAR(256),
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
    ON UPDATE CASCADE,
  FOREIGN KEY(projectid) REFERENCES collaborators(projectid)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE shared_projects(
  projectid INTEGER NOT NULL,
  name VARCHAR(64) NOT NULL,
  owner VARCHAR(20) NOT NULL,
  sharedWith VARCHAR(20) NOT NULL,
  created TIMESTAMP NOT NULL,
  PRIMARY KEY(projectid, sharedWith),
  FOREIGN KEY(owner) REFERENCES users(username) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY(sharedWith) REFERENCES users(username) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY(projectid) REFERENCES projects(projectid)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE videos(
  videoid INTEGER NOT NULL,
  username VARCHAR(20) NOT NULL,
  projectid INTEGER NOT NULL,
  filename VARCHAR(64) NOT NULL,
  starttime INTEGER NOT NULL,
  endtime INTEGER NOT NULL,
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
  PRIMARY KEY(projectid, username1, username2)
  FOREIGN KEY(username1) REFERENCES users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY(username2) REFERENCES users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE pending_invites(
  projectid INTEGER NOT NULL,
  username1 VARCHAR(20) NOT NULL,
  username2 VARCHAR(20) NOT NULL,
  created TIMESTAMP NOT NULL,
  PRIMARY KEY(projectid, username1, username2)
  FOREIGN KEY(username1) REFERENCES users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY(username2) REFERENCES users(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);





