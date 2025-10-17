# 🍜 Reatl — Reels-Style Food Ordering App
#### MERN app where users browse short food videos and order instantly. 
#### MVP: Reels feed, one-tap ordering, real-time order status.

### 📃Reatl — Overview
Short vertical, fast-consumption UX like Reels/Shorts where users browse short food videos (or micro-ads) and can instantly order the dish shown. Emphasis: snackable discovery → 1-tap ordering.

### 🗃️ File Structure:
```
Reatl App
    |---> Frontend
    |---> Backend
```

#### 🧍 Normal User (Customer)
Browse Food Content (Reels or list view) + Place Orders + User Login/Logout + Food List/Items View

#### 🏪 Food Partner (Restaurant / Vendor)
Upload and manage dishes & reels.

## 🌐 Backend Building Roadmap
We'll start **Building our Backend First**.

### ✅ Initiate npm: 
```
npm init -y
```
We'll get a file named `package.json` in our folder.

### ✅ Server Creation: 

Install Express 
```
npm i express
```
### ✅ Folder Creation:
```
backend
    |--node_modules
    |--src
    |    |--app.js ✅
    |--server.js ✅
    |--package.json
    |--package-lock.json
```
### ✅ Server Creation: We'll create the server in `app.js`
```

const express = require('express')
//server's instance is created
const app = express()

app.get('/',(req,res)=>{
    res.send('Welcome to the Reatl API')
})

module.exports = app
```
1. We'll Create a simple Express.js server through `const express = require('express')`
2. Instance of the express server is created - `const app = express()`
3. Dummy Route Created through - `app.get('/', (req, res) => { res.send('Welcome to the Reatl API')})`
4. Exporting the app to the server.js file. We'll use this app in the server.js file. `module.exports = app`
### ✅ Start Server: We'll start the server in `server.js`. Server is running on port 3000.

Importing the app from the app.js file.
```
const app = require('./src/app')

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```
### ✅ Refresh Server if new changes occur in any way
```
npx nodemon server.js
```
### ✅ Will you Postman API to test
GET: `http://localhost:3000/` -> Send ➡️
### ✅ Server Connetion with Database
Using Community edition of MongoDB
* Have to install `npm i mongoose`
* Create `db.js` inside `db` folder in `src` ➡️ `/src/db/db.js`
```
const mongoose = require('mongoose')


function connectDB(){
    mongoose.connect("mongodb://localhost:27017/reatl")
    .then(()=>{
        console.log('✅ Connected to MongoDB');
    })
    .catch((err) => {
        console.log("❌ Error connecting to MongoDB", err);
    });
}
module.exports = connectDB
```
1. We'll Connect to the MongoDB database through `const mongoose = require('mongoose')`
2. We'll code how the database will be connected to the server through `function connectDB()`
3. `mongodb://localhost:27017` (The default port for MongoDB is 27017.) & name of the database - `reatl`
4. If the connection is successful, the following messages will be printed to the console or not. (`err` -> Error)
5. Until the function is getting called it won't connect our database to the server as all the logics are written here.
6. We'll call the function in `server.js` file.
```
const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB();
```
We'll Connect to the MongoDB database. `connectDB()` <-- This will connect the MongoDB database to the server.

### ✅ Creating Authentication Routes
We'll create authentication routes in `auth.routes.js` file.
* We've to create a router for the auth routes. When we want to create an API inside a routes file we've to use express router.
```
const express = require('express')
const router = express.Router()

router.post('/user/register',)

module.exports = router
```
* We'll create a function to register a user. The callback function `(req, res)` is the request and response object which we can also call `controller`.
* Logic of the function is written in the `controller` file `auth.controller.js.` in `src/controllers` folder.
* `router.post` is an API endpoint for the register route. `router.post('/user/register',)`

### ✅ Creating User Model
We'll create a user model in `user.model.js` file of `src/models` folder. 
* Prior creating user in database we've to create a model about how the user will look in the database. 

_We create model so that we can interact with the database regarding the user data._
```
const mongoose = require('mongoose');

// userSchema is created to store the user data in the database. 
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    }
},
{ 
    timestamps: true,
}
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
```
1. `mongoose` is needed to create a model `const mongoose = require('mongoose')`
2. `userSchema` is created to store the user data in the database. `const userSchema = new mongoose.Schema({})`
3. `timestamps: true` is used to create a timestamp for the user data. `timestamps: true` through this we'll be able to keep a track of when the user was created and when the user was updated.
4. `userModel` is created to store the user data in the database. `const userModel = mongoose.model('User', userSchema)`
5. `module.exports = userModel` is used to export the user model to the server.js file.

Now I can perform any operation on the user data in the database.

### ✅ Creating User Controller
We'll create a user controller in `auth.controller.js` file of `src/controllers` folder.

```
const userModel = require('../models/user.model');

async function registerUser(req, res) {
    const { fullName, email, password } = req.body
}

module.exports = { registerUser }
```
1. `userModel` is needed to create a user controller `const userModel = require('../models/user.model')`
2. `registerUser` is created to register a user `async function registerUser(req, res) {`
3. Destructuring the request body. fullName, email, password are the fields that are required to register a user. 
4. By default server that we create from express.js is not able to parse the request body. So we'll use the `express.json()` middleware to parse the request body in `app.js` file.

The data is coming from frontend but the server is not able to parse the request body. So we'll use the `express.json()` middleware to parse the request body. it makes the data readable for the server so that we can perform any operation on the data.
```
app.use(express.json());
```
This is a built-in middleware function in Express.js. It is used to parse the request body and convert it into a JSON object from `auth.controller.js` file.

5. Now We'll check if the email already exists in the database `auth.controller.js`. 
```
const { fullName, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User already exists"
        })
    }
```
`await` is used to wait for the response from the database. `userModel` is used to find the user in the database. `findOne` is used to find the user in the database. 

If the user already exists then it will return a response with `status code 400` and a message `"User already exists"`.

### ✅ Hashing Password
Now if there no existing user then we'll create a new user in the database. For that at first we've to hash the password. 

We hash the password to keep the password secure in case of any data breach. We'll use `bcrypt` to hash the password. 
```
npm i bcryptjs
```

Now we'll hash the password.
```
const hashedPassword = await bcrypt.hash(password, 10);
```
After hashing the password we'll create a new user in the database.
```
const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword
})
```
### ✅ Creating Token
Now technically the user is registered in the database. Next time if it requests to the server atleast we need to know from where it's coming. for that we'll be creating a token. We'll save the token in the cookies. 

* To create the token we'll use `jsonwebtoken`.
```
npm i jsonwebtoken
```
* To save the token in the cookies we'll use `cookie-parser`.
```
npm i cookie-parser
```
We'll use `cookie-parser` to save the token in the cookies. We'll use it as a middleware in `app.js` file.
```
app.use(cookieParser());
app.use(express.json());
```

Now we'll create a token. jwt.sign() is a method that creates a token in `auth.controller.js` file.
`id: user._id` is the payload of the token. Object id is the unique identifier of the user.
```
const token = jwt.sign({
    id: user._id
})
```
The token we create is a unique identifier for the user so we've to provide a unique format data to the token. the next parameter is the JWT secret key. We've to generate a random string of characters to use as the JWT secret key.

* Generate a random string of characters to use as the JWT secret key.
1. Go to [jwtsecrets.com](https://jwtsecrets.com/)
2. Click on `Generate` button.
3. Copy the generated string. You can change the string length (bits) as per your requirement. The more the key length is the more secure the token will be but the more time it will take to generate the token (performance of the server will be affected). So we'll try to get a balance between security and performance. (128bits)
4. Copy the generated string and paste it in the `auth.controller.js` file.
```
const token = jwt.sign({
    id: user._id
}, "generated_string")
```
Now we'll save the token in the cookies with the name of "token".
```
res.cookie("token", token)
```
So far `auth.controller.js` code
```
async function registerUser(req, res) {
    const { fullName, email, password } = req.body
    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id
    }, "generated_string")
    res.cookie("token", token)

    return res.status(201).json({
        message: "User registered successfully",
        user:{
            fullName : user.fullName,
            email : user.email,
            _id : user._id
        }
    })
}
```
New resource is being created so we're using 201 status code. Through `user` object we'll send the user data to the frontend. We'll never send the password to the frontend. 

As we'll be creating multiple controller functions in `auth.controller.js` file we'll not export each controller function individually. We'll export the controller functions as an object.
```
module.exports = { registerUser }
```
We'll be requiring the controller functions in `auth.routes.js` file.
```
const { registerUser } = require('../controllers/auth.controller');
```

### ✅ Checking User Registration with Postman 

1. Open Postman.
2. Click on `POST` button.
3. Enter the URL `http://localhost:3000/user/register`.
4. Click on `Body` button.
5. Click on `raw` button.
6. Click on `JSON` button.
7. Enter the JSON data in the body.
```
{
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}
```
8. Click on `Send` button.
9. It will return a response with `status code 404 Not Found`.

The server dosen't know about the route we've created. In both `app.js` & `server.js` file we haven't mentioned the route we've created. 
* I've to make the server aware about the authentication related API routes. 
* We've added prefix `/api/user` to the authentication related API routes. 
* To access the apis of authRoutes we've to use `/api/user` prefix.

Now we'll make the server aware about the authentication related API routes in `app.js` file.
1. Go to Postman.
2. Click on `POST` button.
3. Enter the URL `http://localhost:3000/api/auth/user/register`.
4. Click on `Body` button.
5. Click on `raw` button.
6. Click on `JSON` button.
7. Enter the JSON data in the body.
```
{
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}
```
The API will return a response with `status code 201`.
```
{
    "message": "User registered successfully",
    "user": {
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "_id": "68f2457126db591f8df5fd97"
    }
}
```