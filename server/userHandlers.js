const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

const findUserByEmail = async (email) => {
    const { client, db } = await connectToDB();
    const user = await db.collection("users").findOne({ email });
    client.close();
    return user;
};

const addUser = async (user) => {
    const { client, db } = await connectToDB();
    const result = await db.collection("users").insertOne(user);
    client.close();
    return result;
};

const updateUsername = async (req, res) => {
    let client;
    const userId = req.params.userId;
    const newUsername = req.body.username;

    try {
        client = new MongoClient(MONGO_URI);
        await client.connect();
        const dbName = "btc---wallets";
        const db = client.db(dbName);

        // Check if the new username is already taken
        const existingUser = await db.collection("users").findOne({ username: newUsername });
        if (existingUser) {
            return res.status(400).json({ status: 400, message: "Username is already taken." });
        }

        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(userId) },
            { $set: { username: newUsername } }
        );

        if (result.modifiedCount === 1) {
            res.status(200).json({ status: 200, message: "Username updated successfully!" });
        } else {
            throw new Error("Failed to update username.");
        }

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }
};

const deleteUserProfile = async (req, res) => {
    let client;
    const userId = req.params.userId;

    try {
        client = new MongoClient(MONGO_URI);
        await client.connect();
        const dbName = "btc---wallets";
        const db = client.db(dbName);

        const result = await db.collection("users").deleteOne({ _id: new ObjectId(userId) });

        if (result.deletedCount === 1) {
            res.status(200).json({ status: 200, message: "User successfully deleted!" });
        } else {
            throw new Error("User deletion failed.");
        }

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }
};

const signin = async (req, res) => {
    let client;
    const { email } = req.body;

    try {
        client = new MongoClient(MONGO_URI);
        await client.connect();
        const dbName = "btc---wallets";
        const db = client.db(dbName);

        const user = await db.collection("users").findOne({ email: email });

        if (user) {
            res.status(200).json({ status: 200, data: user, message: "User found!" });
            req.session.userId = user._id;
        } else {
            return res.status(404).json({ status: 404, message: "User not found." });
        }

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }
};

const signup = async (req, res) => {
    let client;
    const { email, username } = req.body;

    try {
        client = new MongoClient(MONGO_URI);
        await client.connect();
        const dbName = "btc---wallets";
        const db = client.db(dbName);

        // Check for duplicate email
        const existingUser = await db.collection("users").findOne({ email: email }); 
        if (existingUser) {
            return res.status(400).json({ status: 400, message: "This email already exists." });
        }

        const result = await db.collection("users").insertOne({ email, username });

        if (result.acknowledged) {
            res.status(201).json({ status: 201, data: { email, username }, message: "User successfully added!" });
        } else {
            throw new Error("User registration failed.");
        }

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }
};

const signout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ status: 500, message: "Couldn't log out, try again" });
        }
        res.status(200).json({ status: 200, message: "Logged out successfully" });
    });
};

const getUserProfile = async (req, res) => {
    const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ status: 401, message: "Not authenticated" });
        }

        try {
            const user = await findUserById(userId);
            if (!user) {
                return res.status(404).json({ status: 404, message: "User not found" });
            }
            res.status(200).json({ status: 200, data: user, message: "User profile fetched successfully" });
        } catch (err) {
            res.status(500).json({ status: 500, message: err.message });
    }
};

module.exports = {
    findUserByEmail,
    addUser,
    updateUsername,
    deleteUserProfile,
    signin,
    signup,
    signout,
    getUserProfile,
    // findUserById,
    // updateUserToken,
    // findUserByToken
};

// const findUserById = async (id) => {
//     const { client, db } = await connectToDB();
//     const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
//     client.close();
//     return user;
// };

// const findUserByToken = async (token) => {
//     const { client, db } = await connectToDB();
//     const user = await db.collection("users").findOne({ token });
//     client.close();
//     return user;
// };

// const updateUserToken = async (email, token) => {
//     const { client, db } = await connectToDB();
//     await db.collection("users").updateOne({ email }, { $set: { token } });
//     client.close();
// };