'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = 3000;

const session = require('express-session');
const MongoStore = require('connect-mongo');
const sessionSecret = process.env.SESSION_SECRET;

// CORS headers
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Methods', 
            'OPTIONS, HEAD, GET, PUT, POST, DELETE'
        );
        res.header(
            'Access-Control-Allow-Headers', 
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
});

// Initialize session middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

const {
    // Wallet Handlers
    addWallet,
    getAllWallets,
    getWallet,
    updateWallet,
    deleteWallet,
    updateWalletFeatures,
} = require("./handlers");

const {
    findUserByEmail,
    addUser,
    updateUsername,
    deleteUserProfile,
    signin,
    signup,
    signout,
    getUserProfile,
} = require("./userHandlers");

const walletRouter = express.Router();
// Wallet Routes
walletRouter.post("/:category", addWallet); // Add a new wallet to a specified category
walletRouter.get("/:category", getAllWallets); // Retrieve all wallets of a specified category
walletRouter.get("/:category/:id", getWallet); // Retrieve a specific wallet by its ID from a specified category
walletRouter.patch("/:category/:id", updateWallet); // Update a specific wallet by its ID from a specified category
walletRouter.delete("/:category/:id", deleteWallet); // Delete a specific wallet by its ID from a specified category
walletRouter.patch("/:category/:id/features", updateWalletFeatures); // Update features of a specific wallet

const userRouter = express.Router();
// // User routes
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/signout", signout);
userRouter.get("/profile", getUserProfile);
userRouter.patch("/profile/:userId", updateUsername);
userRouter.delete("/profile/:userId", deleteUserProfile);

// Use the routers
app.use("/wallets", walletRouter);
app.use("/users", userRouter);
// app.use("/comments",commentRouter);
// app.use("/posts", postRouter);

//For now
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(passport.session());

// //For Passport and Passwordless
// const passport = require('passport');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const passwordless = require('passwordless');
// const MongoStore = require('passwordless-mongostore-bcrypt-node');
// const email = require("emailjs");

// //Email Configuration
// const smtpServer = email.server.connect({
//     user:    process.env.SMTP_USER,
//     password: process.env.SMTP_PASSWORD,
//     host:    process.env.SMTP_HOST,
//     ssl:     true
// });

//  // Initialize Passwordless with MongoDB store
// passwordless.init(new MongoStore(process.env.MONGO_URI));
// passwordless.addDelivery(
//     function(tokenToSend, uidToSend, recipient, callback) {
//         smtpServer.send({
//             text:    'Hello!\nAccess your account here: http://localhost:3000/auth/verify?token=' 
//                     + tokenToSend + '&uid=' + encodeURIComponent(uidToSend), 
//             from:    process.env.SMTP_USER,
//             to:      recipient,
//             subject: 'Token for ' + 'http://localhost:3000'
//         }, function(err, message) { 
//             if(err) {
//                 console.log(err);
//             }
//             callback(err);
//         });
//     }
// );

// require('./passportConfig');

    // // Post & Comment Handlers
    // addPost,
    // getAllPosts,
    // getPost,
    // updatePost,
    // deletePost,
    // addCommentToPost,
    // getCommentsForPost,
    // getComment,
    // updateComment,
    // deleteComment,

    // const authRoutes = require('./authRoutes'); 
// //Auth routes
// app.use('/auth', authRoutes);

// const postRouter = express.Router();
// // Post Routes
// postRouter.post("/", addPost); // Add a new post
// postRouter.get("/", getAllPosts); // Retrieve all posts
// postRouter.get("/:id", getPost); // Retrieve a specific post by its ID
// postRouter.patch("/:id", updatePost); // Update a specific post by its ID
// postRouter.delete("/:id", deletePost); // Delete a specific post by its ID

// const commentRouter = express.Router();
// // Comment Routes
// commentRouter.post("/", addCommentToPost); // Add a comment to a specific post
// commentRouter.get("/", getCommentsForPost); // Retrieve all comments for a specific post
// commentRouter.get("/:commentId", getComment); // Retrieve a specific comment by its ID
// commentRouter.patch("/:commentId", updateComment); // Update a specific comment by its ID
// commentRouter.delete("/:commentId", deleteComment); // Delete a specific comment by its ID

