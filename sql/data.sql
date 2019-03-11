INSERT INTO users(username, fullname, email, password, created)
VALUES ('azarrabi', 'Ali Zarrabi', 'azarrabi@umich.edu',  55555555555, 'sha512$a45ffdcc71884853a2cba9e6bc55e812$c739cef1aec45c6e345c8463136dc1ae2fe19963106cf748baf87c7102937aa96928aa1db7fe1d8da6bd343428ff3167f4500c8a61095fb771957b4367868fb8', datetime('now', 'localtime')),
	   ('armruval', 'Armando Ruvalcaba', 'armruval@umich.edu', 55555555555, 'sha512$a45ffdcc71884853a2cba9e6bc55e812$c739cef1aec45c6e345c8463136dc1ae2fe19963106cf748baf87c7102937aa96928aa1db7fe1d8da6bd343428ff3167f4500c8a61095fb771957b4367868fb8', datetime('now', 'localtime')),
	   ('btajfel', 'Brandon Tajfel', 'btajfel@umich.edu', 55555555555, 'sha512$a45ffdcc71884853a2cba9e6bc55e812$c739cef1aec45c6e345c8463136dc1ae2fe19963106cf748baf87c7102937aa96928aa1db7fe1d8da6bd343428ff3167f4500c8a61095fb771957b4367868fb8', datetime('now', 'localtime')),
	   ('makaela', 'Makaela Dalley', 'makaela@umich.edu', 55555555555, 'sha512$a45ffdcc71884853a2cba9e6bc55e812$c739cef1aec45c6e345c8463136dc1ae2fe19963106cf748baf87c7102937aa96928aa1db7fe1d8da6bd343428ff3167f4500c8a61095fb771957b4367868fb8', datetime('now', 'localtime')),
	   ('mattjw', 'Matthew Wise', 'mattjw@umich.edu', 55555555555, 'sha512$a45ffdcc71884853a2cba9e6bc55e812$c739cef1aec45c6e345c8463136dc1ae2fe19963106cf748baf87c7102937aa96928aa1db7fe1d8da6bd343428ff3167f4500c8a61095fb771957b4367868fb8', datetime('now', 'localtime')),
	   ('tobymac', 'Toby Jaroslaw', 'tobymac@umich.edu', 55555555555, 'sha512$a45ffdcc71884853a2cba9e6bc55e812$c739cef1aec45c6e345c8463136dc1ae2fe19963106cf748baf87c7102937aa96928aa1db7fe1d8da6bd343428ff3167f4500c8a61095fb771957b4367868fb8', datetime('now', 'localtime')),
	   ('tjsande', 'Trevor Sanderson', 'tjsande@umich.edu', 55555555555, 'sha512$a45ffdcc71884853a2cba9e6bc55e812$c739cef1aec45c6e345c8463136dc1ae2fe19963106cf748baf87c7102937aa96928aa1db7fe1d8da6bd343428ff3167f4500c8a61095fb771957b4367868fb8', datetime('now', 'localtime'));

INSERT INTO projects(projectid, name, owner, created)
VALUES (1, 'Vacation', 'azarrabi', datetime('now', 'localtime')),
	   (2, 'First Day of College', 'azarrabi', datetime('now', 'localtime')),
	   (3, 'New Project', 'azarrabi', datetime('now', 'localtime'));

INSERT INTO creators(creatorid, username, projectid, filename, created)
VALUES (1, 'azarrabi', 3, 'test.mov', datetime('now', 'localtime')),
	   (2, 'armruval', 3, 'test.mov', datetime('now', 'localtime')),
	   (3, 'btajfel', 3, 'test.mov', datetime('now', 'localtime'));

INSERT INTO friends(username1, username2, created)
VALUES ('azarrabi', 'armruval', datetime('now', 'localtime')),
	   ('azarrabi', 'btajfel', datetime('now', 'localtime')),
	   ('azarrabi', 'makaela', datetime('now', 'localtime')),
	   ('azarrabi', 'mattjw', datetime('now', 'localtime')),
	   ('azarrabi', 'tobymac', datetime('now', 'localtime')),
	   ('azarrabi', 'tjsande', datetime('now', 'localtime'));
