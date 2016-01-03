cd %~dp0

@echo *** Start mongo db server ***
start cmd /k "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath data

"C:\Program Files\MongoDB\Server\3.2\bin\mongoimport" -d summeries -c users --type json --file users.json --jsonArray
"C:\Program Files\MongoDB\Server\3.2\bin\mongoimport" -d summeries -c media --type json --file media.json --jsonArray


start cmd /k node app.js
start chrome.exe http://localhost:8080/

@PAUSE