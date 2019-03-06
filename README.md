# Gold-Team

## Frontend
### Project setup

1. Download all the React Native dependencies, following the Getting Started Tutorial at https://facebook.github.io/react-native/docs/getting-started.html
2. Clone the GoldTeam repository from GitHub onto your local machine.
3. Make sure you're in the directory with the GoldTeam folder and run the following command:
```
react-native init GoldTeam
```
4. Run the app on a simulator. Make sure you have Xcode/AndroidStudio downloaded on your computer and run the following commands:

#### iOS
```
cd GoldTeam
react-native run-ios
```

#### Android
```
cd GoldTeam
react-native run-android
```

## Backend
### Creating a Droplet
Use these options
  Django 1.8.7 on 16.04
  $5 per month size (free with student developer pack)
  New York datacenter 1 or 3

### Accessing the droplet
1. IP address, username and password are emailed to you
2. ssh root@[IP]
3. Change default password upon login
4. Can access IP address’s webpage in browser


### Setting up a data base
1. sudo -u postgres psql (use PSQL as user postgres)
2. \connect django (connect to the database)
3. GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO django;
4. \dt (list tables)
5. Use SQL commands from here to do what you need
6. Control+D to exit

## File Structure
    GoldTeam
    ├── App.js
    ├── README.md
    ├── __tests__
    │   └── App.js
    ├── app.json
    ├── index.js
    ├── package-lock.json
    ├── package.json
    └── screens
        ├── friends.js
        ├── home.js
        ├── library.js
        └── record.js

