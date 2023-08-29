require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = 3000;
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.mongo_uri;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(morgan('tiny'));

const {
    // Wallet Handlers
    addWallet,
    getAllWallets,
    getWallet,
    updateWallet,
    deleteWallet,
    updateWalletFeatures,

    // Post & Comment Handlers
    addPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost,
    addCommentToPost,
    getCommentsForPost,
    getComment,
    updateComment,
    deleteComment,

    //User handlers
    signup,
    signin,
    signout,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
    
  } = require("./handlers");

// CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const walletRouter = express.Router();
// Wallet Routes
walletRouter.post("/:category", addWallet); // Add a new wallet to a specified category
walletRouter.get("/:category", getAllWallets); // Retrieve all wallets of a specified category
walletRouter.get("/:category/:id", getWallet); // Retrieve a specific wallet by its ID from a specified category
walletRouter.patch("/:category/:id", updateWallet); // Update a specific wallet by its ID from a specified category
walletRouter.delete("/:category/:id", deleteWallet); // Delete a specific wallet by its ID from a specified category
walletRouter.patch("/:category/:id/features", updateWalletFeatures); // Update features of a specific wallet


const postRouter = express.Router();
// Post Routes
postRouter.post("/", addPost); // Add a new post
postRouter.get("/", getAllPosts); // Retrieve all posts
postRouter.get("/:id", getPost); // Retrieve a specific post by its ID
postRouter.patch("/:id", updatePost); // Update a specific post by its ID
postRouter.delete("/:id", deletePost); // Delete a specific post by its ID


const commentRouter = express.Router();
// Comment Routes
commentRouter.post("/", addCommentToPost); // Add a comment to a specific post
commentRouter.get("/", getCommentsForPost); // Retrieve all comments for a specific post
commentRouter.get("/:commentId", getComment); // Retrieve a specific comment by its ID
commentRouter.patch("/:commentId", updateComment); // Update a specific comment by its ID
commentRouter.delete("/:commentId", deleteComment); // Delete a specific comment by its ID

const userRouter = express.Router();
// User routes
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/signout", signout);
userRouter.get("/profile", getUserProfile);
userRouter.patch("/profile", updateUserProfile);
userRouter.delete("/profile", deleteUserProfile);

// Use the routers
app.use("/wallets", walletRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);

//For now
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

client.connect(err => {
    if (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
    console.log("Connected to MongoDB");

    app.use((req, res, next) => {
        req.dbClient = client;
        next();
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

});
