# Gold-Team
Gold Team repository

# File Structure
frontend
=======
Frontend
Project setup
1. “Start a new Android Studio Project”
2. Set the application name, domain, and location (domain like example.com)
3. Select phone and tablet (only) and API version 17
4. Add an empty activity
5. Pick a good activity name and title
6. Make sure it generates a layout and has backwards compatibility

Running on an Android emulator
1. Hit the green play button
2. Create New Virtual Device
3. Pick a device and system image (Nexus 5X and O x86 are good)
4. Give it a name and leave the default settings
5. Use same selection for future launches and hit OK
6. Use yellow lightning icon in Android Studio to quickly rebuild and refresh app
7. Close emulator entirely with Cmd+Q

Backend
Creating a Droplet
Use these options
  Django 1.8.7 on 16.04
  $5 per month size (free with student developer pack)
  New York datacenter 1 or 3
  
Accessing the droplet
1. IP address, username and password are emailed to you
2. ssh root@[IP]
3. Change default password upon login
4. Can access IP address’s webpage in browser

Setting up a data base
1. sudo -u postgres psql (use PSQL as user postgres)
2. \connect django (connect to the database)
3. GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO django;
4. \dt (list tables)
5. Use SQL commands from here to do what you need
6. Control+D to exit
>>>>>>> 0bf611ac3b972c97ea36b2e4daf66f0a385559b6
