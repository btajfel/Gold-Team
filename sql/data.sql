INSERT INTO users(username, fullname, email, phonenumber, password, latitude, longitude, created)
VALUES ('azarrabi', 'Ali Zarrabi', 'azarrabi@umich.edu',  '9739857896', 'password', '42.3124', '-83.6985', datetime('now', 'localtime')),
	   ('armruval', 'Armando Ruvalcaba', 'armruval@umich.edu', '7347800645', 'password', '42.2627', '-83.7432', datetime('now', 'localtime')),
	   ('btajfel', 'Brandon Tajfel', 'btajfel@umich.edu', '9088399223', 'brandon', '42.2649', '-83.7145', datetime('now', 'localtime')),
	   ('makaela', 'Makaela Dalley', 'makaela@umich.edu', '6163341225', 'password', '42.2734', '-83.7924', datetime('now', 'localtime')),
	   ('mattjw', 'Matthew Wise', 'mattjw@umich.edu', '2488812898', 'password', '42.2616', '-83.7634', datetime('now', 'localtime')),
	   ('tobymac', 'Toby Jaroslaw', 'tobymac@umich.edu', '55555555555', 'password', '42.2723', '-83.7239', datetime('now', 'localtime')),
	   ('tjsande', 'Trevor Sanderson', 'tjsande@umich.edu', '6165589151', 'password', '42.2750', '-83.7495', datetime('now', 'localtime'));

INSERT INTO projects(projectid, name, owner, created)
VALUES (1, 'Vacation', 'azarrabi', datetime('now', 'localtime')),
	   (2, 'First Day of College', 'azarrabi', datetime('now', 'localtime')),
	   (3, 'New Project', 'azarrabi', datetime('now', 'localtime'));

INSERT INTO creators(creatorid, username, projectid, filename, created)
VALUES (1, 'azarrabi', 3, 'test.mov', datetime('now', 'localtime')),
	   (2, 'armruval', 3, 'test.mov', datetime('now', 'localtime')),
	   (3, 'btajfel', 3, 'test.mov', datetime('now', 'localtime'));
