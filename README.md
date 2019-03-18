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
### Setting up Flask app
1. Create and activate virtual environment
    ```
    cd GoldTeam
    python3 -m venv env
    source env/bin/activate
    ```
\* Mac users run following to be safe:
    ```
    cd GoldTeam
    /usr/local/bin/python3 -m venv env
    source env/bin/activate
    ```
2. Install flask app onto virtual environment
    ```
    pip install -e .
    ```

### Run Flask app

```
cd GoldTeam
chmod +x bin/camcrew_run
./bin/camcrew_run
```

### Database setup
1. Run the following to create a new database from scratch
    ```
    ./bin/camcrew_db create
    ```
2. Run the following to destroy the database
    ```
    ./bin/camcrew_db destroy
    ```
3. Run the following to reset the database with the default data
    ```
    ./bin/camcrew_db reset
    ```
4. Run the following to output all the database data
    ```
    ./bin/camcrew_db dump
    ```

## File Structure
\* Run following command
```
tree --matchdirs -I 'node_modules|ios|android|camcrew.egg-info|env|node_modules'
```

    GoldTeam
    ├── App.js
    ├── README.md
    ├── __tests__
    │   └── App.js
    ├── app.json
    ├── bin
    │   ├── camcrew_db
    │   └── camcrew_run
    ├── camcrew
    │   ├── __init__.py
    │   ├── __pycache__
    │   │   ├── __init__.cpython-37.pyc
    │   │   └── config.cpython-37.pyc
    │   ├── config.py
    │   └── model.py
    ├── index.js
    ├── package-lock.json
    ├── package.json
    ├── screens
    │   ├── friends.js
    │   ├── home.js
    │   ├── library.js
    │   └── record.js
    ├── setup.py
    ├── sql
    │   ├── data.sql
    │   ├── schema.sql
    │   └── uploads
    │       └── test.MOV
    └── var
        ├── camcrew.sqlite3
        └── uploads
            └── test.MOV

