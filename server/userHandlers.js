const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

const connectToDB = async () => {
    const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return { client, db: client.db("btc---wallets") };
};

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

const updateUsername = async (userId, newUsername) => {
    const { client, db } = await connectToDB();
    const result = await db.collection("users").updateOne(
        { _id: new ObjectId(userId) },
        { $set: { username: newUsername } }
    );
    client.close();
    return result.modifiedCount === 1;
};

const deleteUserProfile = async (userId) => {
    const { client, db } = await connectToDB();
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(userId) });
    client.close();
    return result.deletedCount === 1;
};

const signin = async (email) => {
    // just verifies if the user exists based on the provided email
    return await findUserByEmail(email);
};

const signup = async (email, username) => {
    // Fjust adds the user to the database
    return await addUser({ email, username });
};

const signout = async (email) => {
    // Signout can be handled on the frontend by clearing the context.
    return true;
};

const getUserProfile = async (userId) => {
    const { client, db } = await connectToDB();
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    client.close();
    return user;
};

const updateUserProfile = async (userId, newUsername) => {
    return await updateUsername(userId, newUsername);
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


module.exports = {
    findUserByEmail,
    addUser,
    updateUsername,
    deleteUserProfile,
    signin,
    signup,
    signout,
    getUserProfile,
    updateUserProfile,
    // findUserById,
    // updateUserToken,
    // findUserByToken
};
