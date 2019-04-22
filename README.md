# Gold-Team

## Frontend
### Project setup

1. Download all React Native dependencies, following the Getting Started Tutorial at https://facebook.github.io/react-native/docs/getting-started.html
2. Clone the GoldTeam repository from GitHub onto your local machine.
3. Run the following command to install expo:
    ```
    npm install -g expo-cli
    ```
    \* Download the Expo Client app from your phone's app store if you want to simulate the app on your own phone
4. Make sure there is no node_modules folder in the project directory:
    ```
    cd GoldTeam
    rm -rf node_modules/
    ```

5. Install all the required packages 
    ```
    cd GoldTeam
    npm install
    ```
6. Run the development server
    ```
    cd GoldTeam
    npm start
    ```
7. From here you can run the app through the iOS or Android simulators. You can also run the app on your phone if you have the Expo Client app and scan the QR code.

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
tree --matchdirs -I 'node_modules|ios|android|camcrew.egg-info|env|node_modules|yarn.lock'
```
    .
    ├── App.js
    ├── README.md
    ├── Setup.pem
    ├── __tests__
    │   ├── App-test.js
    │   └── App.js
    ├── app.json
    ├── assets
    │   ├── fonts
    │   │   └── SpaceMono-Regular.ttf
    │   └── images
    │       ├── CC-icon.png
    │       ├── CC-icon.xcf
    │       ├── CC.ico
    │       ├── CC.png
    │       ├── camcrew_logo.png
    │       ├── icon.png
    │       ├── robot-dev.png
    │       ├── robot-prod.png
    │       └── splash.png
    ├── babel.config.js
    ├── bin
    │   ├── camcrew_db
    │   └── camcrew_run
    ├── camcrew
    │   ├── __init__.py
    │   ├── __pycache__
    │   │   ├── __init__.cpython-37.pyc
    │   │   ├── config.cpython-37.pyc
    │   │   └── model.cpython-37.pyc
    │   ├── api
    │   │   ├── __init__.py
    │   │   ├── __pycache__
    │   │   │   ├── __init__.cpython-37.pyc
    │   │   │   ├── contacts.cpython-37.pyc
    │   │   │   ├── creators.cpython-37.pyc
    │   │   │   ├── error_handler.cpython-37.pyc
    │   │   │   ├── invite.cpython-37.pyc
    │   │   │   ├── location.cpython-37.pyc
    │   │   │   ├── login.cpython-37.pyc
    │   │   │   ├── projects.cpython-37.pyc
    │   │   │   ├── save.cpython-37.pyc
    │   │   │   └── videos.cpython-37.pyc
    │   │   ├── contacts.py
    │   │   ├── create.py
    │   │   ├── error_handler.py
    │   │   ├── invite.py
    │   │   ├── location.py
    │   │   ├── login.py
    │   │   ├── pending_invite.py
    │   │   ├── projects.py
    │   │   ├── render.py
    │   │   ├── save.py
    │   │   ├── shared_with.py
    │   │   └── videos.py
    │   ├── config.py
    │   ├── model.py
    │   └── views
    │       ├── __init__.py
    │       └── __pycache__
    │           └── __init__.cpython-37.pyc
    ├── components
    │   ├── StyledText.js
    │   ├── TabBarIcon.js
    │   └── __tests__
    │       └── StyledText-test.js
    ├── constants
    │   ├── Colors.js
    │   └── Layout.js
    ├── index.js
    ├── navigation
    │   ├── AppNavigator.js
    │   └── MainTabNavigator.js
    ├── package-lock.json
    ├── package.json
    ├── screens
    │   ├── AuthLoadingScreen.js
    │   ├── ContactRender.js
    │   ├── ContactScreen.js
    │   ├── ContactShare.js
    │   ├── EditRender.js
    │   ├── EditScreen.js
    │   ├── LibraryRender.js
    │   ├── LibraryScreen.js
    │   ├── ProjectSettings.js
    │   ├── RecordScreen.js
    │   ├── SharedProjects.js
    │   ├── SignInScreen.js
    │   ├── SignUpScreen.js
    │   ├── Vid.js
    │   └── ViewScreen.js
    ├── setup.py
    ├── sftp-config.json
    ├── sql
    │   ├── data.sql
    │   ├── schema.sql
    │   └── uploads
    │       └── test.MOV
    └── var
        ├── camcrew.sqlite3
        └── uploads

```

