- create devtinder folder
- "npm init" in terminal <--
- create src folder 
- create in src app.js file
- create server from expresss.js // so install express.js 

- install nodemon global level like --> npm install -g nodemon
- now run code like --> nodemon fileName.js <---   //old is node fileNme.js <---

- add command in package in script for sort cut 
- "start": "node src/app.js",     // old is  "node fileNme.js"  // new is "npm run start"   <---
- "dev": "nodemon src/app.js"     // old is  "nodemon filename.js"  // new "npm run dev"    <--

- initialize git repozetory     like "git init"   <--- 
- create gitignore file     like .gitignore    and add entry node_modules folder and push 
- add dummy middleware auth for admin , users 

- create config folder in src for databases
- create free clutor on mongodb ( mongo atlas)
- install mongoos --> "npm i mongoose"
- connection your application to database using connectionURL 

- create user schema & user model 
- initilize database

- data pass to dyanmaic from api body 






- question 
- what is package.loack json ?   should put on git repo ? 
- what is JSOn and javascript object ?


- learn 
- order of the routes matter a lot 

- route  --> // "/user?s"  // "/use*rs"
<!-- app.get("/users", (req, res) => {
    res.send({"fname":"Rahul","lname":"Patil"});
}); -->
