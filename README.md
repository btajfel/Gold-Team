# Gold-Team
Gold Team repository

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

# File Structure
    Starter App
    ├───backend
    │   │   manage.py
    │   │
    │   ├───chatter
    │   │       admin.py
    │   │       models.py
    │   │       tests.py
    │   │       views.py
    │   │
    │   └───django_project
    │           settings.py
    │           settings.py.orig
    │           urls.py
    │           wsgi.py
    │
    └───frontend
        │   build.gradle
        │   frontend.iml
        │   gradle.properties
        │   gradlew
        │   gradlew.bat
        │   local.properties
        │   settings.gradle
        │
        ├───app
        │   │   .gitignore
        │   │   app.iml
        │   │   build.gradle
        │   │   proguard-rules.pro
        │   │
        │   └───src
        │       ├───androidTest
        │       │   └───java
        │       │       └───com
        │       │           └───tiberiuvilcu
        │       │               └───chatter
        │       │                       ExampleInstrumentedTest.java
        │       │
        │       ├───main
        │       │   │   AndroidManifest.xml
        │       │   │
        │       │   ├───java
        │       │   │   └───com
        │       │   │       └───tiberiuvilcu
        │       │   │           └───chatter
        │       │   │                   Chatt.java
        │       │   │                   ChattAdapter.java
        │       │   │                   PostActivity.java
        │       │   │                   TimelineActivity.java
        │       │   │
        │       │   └───res
        │       │       ├───layout
        │       │       │       activity_post.xml
        │       │       │       activity_timeline.xml
        │       │       │       chatt_item.xml
        │       │       │
        │       │       ├───mipmap-hdpi
        │       │       │       ic_launcher.png
        │       │       │       ic_launcher_round.png
        │       │       │
        │       │       ├───mipmap-mdpi
        │       │       │       ic_launcher.png
        │       │       │       ic_launcher_round.png
        │       │       │
        │       │       ├───mipmap-xhdpi
        │       │       │       ic_launcher.png
        │       │       │       ic_launcher_round.png
        │       │       │
        │       │       ├───mipmap-xxhdpi
        │       │       │       ic_launcher.png
        │       │       │       ic_launcher_round.png
        │       │       │
        │       │       ├───mipmap-xxxhdpi
        │       │       │       ic_launcher.png
        │       │       │       ic_launcher_round.png
        │       │       │
        │       │       └───values
        │       │               colors.xml
        │       │               strings.xml
        │       │               styles.xml
        │       │
        │       └───test
        │           └───java
        │               └───com
        │                   └───tiberiuvilcu
        │                       └───chatter
        │                               ExampleUnitTest.java
        │
        ├───build
        │   └───intermediates
        │       └───lint-cache
        │           ├───maven.google
        │           │   │   master-index.xml
        │           │   │
        │           │   └───com
        │           │       └───android
        │           │           └───support
        │           │               │   group-index.xml
        │           │               │
        │           │               └───constraint
        │           │                       group-index.xml
        │           │
        │           └───sdk-registry.xml
        │                   sdk-registry.xml
        │
        └───gradle
            └───wrapper
                    gradle-wrapper.jar
                    gradle-wrapper.properties

