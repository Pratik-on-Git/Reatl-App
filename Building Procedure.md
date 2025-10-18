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
If we try to register the same user again it will return a response with `status code 400`.
```
{
    "message": "User already exists"
}
```
### ✅ Login User API
```
async function loginUser(req, res){
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })
    if(!user){
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, "0e70fbead3c3b9baaa566e98f4ffabb4")
    res.cookie("token", token)

    return res.status(200).json({
        message: "User Logged In Successfully",
        user:{
            fullName : user.fullName,
            email : user.email,
            _id : user._id
        }
    })
}
```
1. `const { email, password } = req.body;` is used to get the email and password from the request body.
2. `const user = await userModel.findOne({ email })` is used to find the user in the database.
3. `if(!user){ return res.status(400).json({ message: "Invalid Email or Password" }) }` is used to check if the user exists in the database.
4. `const isPasswordValid = await bcrypt.compare(password, user.password)` is used to compare the password with the hashed password.
5. `if(!isPasswordValid){ return res.status(400).json({ message: "Invalid Email or Password" }) }` is used to check if the password is valid.
6. `const token = jwt.sign({ id: user._id }, "0e70fbead3c3b9baaa566e98f4ffabb4")` is used to create a token.
7. `res.cookie("token", token)` is used to save the token in the cookies.
8. `return res.status(200).json({ message: "User Logged In Successfully", user:{ fullName : user.fullName, email : user.email, _id : user._id } })` is used to return the response to the frontend.

Now let's check the login API through Postman.
1. Go to Postman.
2. Click on `POST` button.
3. Enter the URL `http://localhost:3000/api/auth/user/login`.
4. Click on `Body` button.
5. Click on `raw` button.
6. Click on `JSON` button.
7. Enter the JSON data in the body.
```
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```
The API will return a response with `status code 200`.
```
{
    "message": "User Logged In Successfully",
    "user": {
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "_id": "68f2457126db591f8df5fd97"
    }
}
```
### ✅ Environment Variables JWT Secret Key
I can see that here my JWT Secret Key is visible to the client. This is not a good practice. We'll use environment variables to store the JWT Secret Key.

1. Create a `.env` file in the root directory of the project.
2. Add the JWT Secret Key to the `.env` file.
```
JWT_SECRET=0e70fbead3c3b9baaa566e98f4ffabb4
```
3. Add the `.env` file to the `.gitignore` file.
```
.env
node_modules
```
4. Update the `auth.controller.js` file to use the environment variable.
```
const token = jwt.sign({
    id: user._id
}, process.env.JWT_SECRET)
```
5. To use the environment variable we'll use `dotenv` package.
```
npm install dotenv
```
6. We'll be adding the `dotenv` package to the `server.js` file. Without this the server will not be able to access the environment variables so the JWT Secret Key will not be accessible. 

The value of the JWT Secret Key will be undefined.
```
require('dotenv').config();
```
7. Update the `db.js` file to use the environment variable.
```
mongoose.connect(process.env.MONGO_URL)
```
8. Add the environment variables to the `.env` file.
```
JWT_SECRET=0e70fbead3c3b9baaa566e98f4ffabb4
MONGO_URL=mongodb://localhost:27017/reatl
```
### ✅ Logout User API 
1. Update the `auth.controller.js` file to use the environment variable.
```
async function logoutUser(req, res){
    res.clearCookie("token")
    return res.status(200).json({
        message: "User Logged Out Successfully"
    })
}
```
`clearCookie` is a method that clears the cookie.

Now we'll check the logout API through Postman.
1. Go to Postman.
2. Click on `GET` button.
3. Enter the URL `http://localhost:3000/api/auth/user/logout`.
4. Click on `Send` button.
5. The API will return a response with `status code 200`.
```
{
    "message": "User Logged Out Successfully"
}
```
### ✅ Creating APIs for Food Partners
1. At first we'll create a model for the food partner.
2. Create a `foodpartner.model.js` file in the `models` folder.
```
const mongoose = require('mongoose');

const foodPartnerSchema = new mongoose.Schema({
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

const foodPartnerModel = mongoose.model('foodpartner', foodPartnerSchema);

module.exports = foodPartnerModel;
```
3. We've to create same type of user controller functions for food partner like we created for user controller functions.
```
const foodPartnerModel = require('../models/foodpartner.model')
async function registerFoodPartner(req, res){
    const { fullName, email, password } = req.body

    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email
    })
    if(isAccountAlreadyExists){
        return res.status(400).json({
            message: "Food Partner Account Already Exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const foodPartner = await foodPartnerModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: foodPartner._id
    }, process.env.JWT_SECRET)
    res.cookie("token", token)

    return res.status(201).json({
        message: "Food Partner registered successfully",
        foodPartner:{
            fullName : foodPartner.fullName,
            email : foodPartner.email,
            _id : foodPartner._id
        }
    })
}

async function loginFoodPartner(req, res){
    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })
    if(!foodPartner){
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id
    }, process.env.JWT_SECRET)
    res.cookie("token", token)

    return res.status(200).json({
        message: "Food Partner Logged In Successfully",
        foodPartner:{
            fullName : foodPartner.fullName,
            email : foodPartner.email,
            _id : foodPartner._id
        }
    })
}

async function logoutFoodPartner(req, res){
    res.clearCookie("token")
    return res.status(200).json({
        message: "Food Partner Logged Out Successfully"
    })
}
```
4. We've to create same type of user router functions for food partner like we created for user router functions in `auth.routes.js` file.
```
router.post('/foodpartner/register', authController.registerFoodPartner);
router.post('/foodpartner/login', authController.loginFoodPartner);
router.get('/foodpartner/logout', authController.logoutFoodPartner)
```

### ✅ Food Model Creation
1. Create a `food.model.js` file in the `models` folder.
```
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    foodPartnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodpartner',
        required: true,
    }
});

const foodModel = mongoose.model('food', foodSchema);

module.exports = foodModel;
```
In Database we'll only store the link of the video.
* We've created the food routes in `food.routes.js` file.
```
const express = require('express')
const router = express.Router()

module.exports = router
```
* We've added the food routes to the `app.js` file.
```
app.use('/api/food', foodRoutes)
```
* In `food.routes.js` file we've created a POST route for creating a food.
```
router.post('/',){

}
```
* If I need to call this API I need to call it with prefix `/api/food`.
* In Postman `POST /api/food` [protected] -> Normal User can't create a food. Only Food Partner can create a food. We'll create a middleware for this.
* Create a `auth.middleware.js` file in the `middlewares` folder in `backend/src` folder.
```
const foodPartnerModel = require('../models/foodpartner.model');
const jwt = require('jsonwebtoken');
```
* When a Food Partner logs in or registers, we create a token and save it in the cookie. Cookies have a property that whatever we store in the cookie will be sent to the server with every request. 
* We've created a middleware for this to check if the token is valid. `app.use(cookieParser())` in `app.js` file.

### ✅ Food Partner Middleware
1. We created a `auth.middleware.js` file in the `middlewares` folder in `backend/src` folder. Now we'll write a function to check if the token is valid.
```
const foodPartnerModel = require('../models/foodpartner.model');
const jwt = require('jsonwebtoken');

async function authFoodPartnerMiddleware(req, res, next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}
```
2. In middleware we've three parameters `req, res, next`.
3. We're getting the token from the cookie. `jwt.verify()` is used to verify the token.

If the token is valid then we'll find the food partner in the database. We saved `foodPartner._id` in the token in auth.controller.js file.

If the token is valid then it'll be in `decoded.id` as an object. If the token is valid then we'll find the food partner based on the decoded.id.

We're creating a new property in req object to store the food partner. We're setting the value of the property to the foodPartner. `next()` is used to move to the next middleware.
```
try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foodPartner = await foodPartnerModel.findById(decoded.id);
        
        req.foodPartner = foodPartner;
        next();

    }
    catch(err){
        return res.status(401).json({
            message: "Unauthorized Access"
        })
    }
```
