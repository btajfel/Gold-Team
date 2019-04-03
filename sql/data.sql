INSERT INTO users(username, fullname, email, phonenumber, password, latitude, longitude, created)
VALUES ('azarrabi', 'Ali Zarrabi', 'azarrabi@umich.edu',  '9739857896', 'password', '42.3124', '-83.6985', datetime('now', 'localtime')),
	   ('armruval', 'Armando Ruvalcaba', 'armruval@umich.edu', '7347800645', 'password', '42.2627', '-83.7432', datetime('now', 'localtime')),
	   ('btajfel', 'Brandon Tajfel', 'btajfel@umich.edu', '9088399223', 'password', '42.2649', '-83.7145', datetime('now', 'localtime')),
	   ('makaela', 'Makaela Dalley', 'makaela@umich.edu', '6163341225', 'password', '42.2734', '-83.7924', datetime('now', 'localtime')),
	   ('mattjw', 'Matthew Wise', 'mattjw@umich.edu', '2488812898', 'password', '42.2616', '-83.7634', datetime('now', 'localtime')),
	   ('tobymac', 'Toby Jaroslaw', 'tobymac@umich.edu', '7184270490', 'password', '42.2723', '-83.7239', datetime('now', 'localtime')),
	   ('tjsande', 'Trevor Sanderson', 'tjsande@umich.edu', '6165589151', 'password', '42.2750', '-83.7495', datetime('now', 'localtime')),
	   ('pjzav', 'Paul Zavell', 'pjzav@umich.edu',  '4197058291', 'password', '42.3135', '-83.5678', datetime('now', 'localtime')),
	   ('karagcal', 'Kara Callaghan', 'karagcal@umich.edu', '2487605550', 'password', '42.2322', '-83.7925', datetime('now', 'localtime')),
	   ('jzuid', 'Jack Zuidema', 'jzuid@umich.edu', '2315570535', 'password', '42.3056', '-83.7356', datetime('now', 'localtime')),
	   ('bkandel', 'Brendan Kandel', 'bkandel@umich.edu', '2016698618', 'password', '42.1998', '-83.7924', datetime('now', 'localtime')),
	   ('czam', 'Cameron Zamanian', 'czam@umich.edu', '2012892100', 'password', '42.2616', '-83.7346', datetime('now', 'localtime')),
	   ('rsus', 'Ryan Susterich', 'rsus@umich.edu', '2316709067', 'password', '42.3899', '-83.6987', datetime('now', 'localtime')),
	   ('criz', 'Connolly Rizley', 'criz@umich.edu', '9187701927', 'password', '42.2590', '-83.7555', datetime('now', 'localtime'));

INSERT INTO projects(projectid, name, owner, created)
VALUES (1, 'Vacation', 'azarrabi', datetime('now', 'localtime')),
	   (2, 'First Day of College', 'armruval', datetime('now', 'localtime')),
	   (3, 'New Project', 'btajfel', datetime('now', 'localtime')),
	   (4, 'Vacation', 'makaela', datetime('now', 'localtime')),
	   (5, 'First Day of College', 'mattjw', datetime('now', 'localtime')),
	   (6, 'New Project', 'tobymac', datetime('now', 'localtime')),
	   (7, 'Vacation', 'tjsande', datetime('now', 'localtime')),
	   (8, 'New Project', 'azarrabi', datetime('now', 'localtime')),
	   (9, 'First Day of College', 'btajfel', datetime('now', 'localtime'));

INSERT INTO creators(creatorid, username, projectid, filename, created)
VALUES (1, 'azarrabi', 3, 'test.mov', datetime('now', 'localtime')),
	   (2, 'armruval', 3, 'test.mov', datetime('now', 'localtime')),
	   (3, 'btajfel', 3, 'test.mov', datetime('now', 'localtime'));
