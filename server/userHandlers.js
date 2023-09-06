const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = "btc---wallets";

const connectToDB = async () => {
    const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return { client, db: client.db(DB_NAME) };
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

const findUserById = async (id) => {
    const { client, db } = await connectToDB();
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    client.close();
    return user;
};

const findUserByToken = async (token) => {
    const { client, db } = await connectToDB();
    const user = await db.collection("users").findOne({ token });
    client.close();
    return user;
};

const updateUserToken = async (email, token) => {
    const { client, db } = await connectToDB();
    await db.collection("users").updateOne({ email }, { $set: { token } });
    client.close();
};

const updateUserUsername = async (userId, newUsername) => {
    try {
        const client = await MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);

        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(userId) },
            { $set: { username: newUsername } }
        );

        await client.close();

        if (result.modifiedCount === 1) {
            return true;
        } else {
            return false;
        }

    } catch (err) {
        console.error("Error updating user's username: ", err);
        return false;
    }
};


module.exports = {
    findUserByEmail,
    addUser,
    findUserById,
    updateUserToken,
    updateUserUsername
};
