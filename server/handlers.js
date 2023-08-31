const { MongoClient } = require("mongodb");
require('dotenv').config();
const { MONGO_URI } = process.env;


const { v4: uuidv4 } = require("uuid");

//Wallet handlers
//For all the wallets
const getAllWallets = async (req, res) => {
    let client;
    try {
        client = new MongoClient(MONGO_URI);
        await client.connect();
        const dbName = "btc---wallets";
        const db = client.db(dbName);

        //Filter wallets by category
        const category = req.params.category || null;
        let result;

        if(category) {
            result = await db.collection("wallets").find({ Category: category }).toArray();
        } else {
            result = await db.collection("wallets").find().toArray();
        }

        if(!result.length) {
            res.status(400).json({ status: 400, message: "No results" });
        } else {
            res.status(200).json({ status: 200, data: result });
        }
        client.close();
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
};

//Get single wallet
const getWallet = async (req, res) => {
    const { id } = req.params;

    try {
        client = new MongoClient(MONGO_URI);
        await client.connect();
        const dbName = "btc---wallets";
        const db = client.db(dbName);

        const wallet = await db.collection("wallets").findOne({ _id: id });

        if (!wallet) {
            res.status(404).json({ status: 404, message: "Wallet not found" });
        } else {
            res.status(200).json({ status: 200, data: wallet });
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } finally {
    client.close();
    }
};

//Add a single wallet
const addWallet = async (req, res) => {
    let newUUID = uuidv4(); 
    const wallet = req.body.wallet;
    const category = req.params.category;

    //Check if category is valid
    const validCategories = ["on-chain", "lightning", "hardware"];
    if (!category || !validCategories.includes(category)) {
        return res.status(400).json({ status: 400, message: "Invalid or missing category label."})
    }

    let newWallet = { _id: newUUID, category: category, ...wallet };

    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        const dbName = "btc---wallets";
        const db = client.db(dbName);

        // Check for duplicate wallet
        const existingWallet = await db.collection("wallets").findOne({ Name: wallet.Name, category: category }); 
        if (existingWallet) {
            return res.status(400).json({ status: 400, message: "This wallet already exists." });
        }

        const result = await db.collection("wallets").insertOne(newWallet);

        if (result.acknowledged) {
            res.status(201).json({ status: 201, data: newWallet, message: "Wallet successfully added!" });
        } else {
            throw new Error("Wallet insertion failed.");
        }

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }
};

//Update a wallet
const updateWallet = async (req, res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(400).json({ status: 400, message: "ID is required."})
    }

    try {
        client = new MongoClient(MONGO_URI);
        await client.connect();
        const dbName = "btc---wallets";
        const db = client.db(dbName);

        // Fetch the current wallet data (to merge with the new data if needed)
        const currentWalletData = await db.collection('wallets').findOne({ _id: id });

        if (!currentWalletData) {
            return res.status(404).json({ status: 404, message: 'Wallet not found' });
        }

        // Merge the current wallet data with the new data from the request
        const updatedWalletData = {
            ...currentWalletData,
            ...req.body
        };

        // Update the wallet in the database
        const result = await db.collection('wallets').updateOne({ _id: id }, { $set: updatedWalletData });

        if (result.modifiedCount === 1) {
            res.status(200).json({ status: 200, data: updatedWalletData });
        } else {
            res.status(400).json({ status: 400, message: 'Update failed' });
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }
};

//Update features of a specific wallet
const updateWalletFeatures = async (req, res) => {
    const { id } = req.params;
    const { features } = req.body;

    if (!features || Object.keys(features).length === 0) {
        return res.status(400).json({ status: 400, message: "No features provided to update." });
    }

    let client;

    try {
        client = new MongoClient(MONGO_URI);
        await client.connect();
        const dbName = "btc---wallets";
        const db = client.db(dbName);
        const collection = db.collection("wallets");

        // Update the features for the specified wallet
        const result = await collection.updateOne(
            { _id: id }, // filter
            { $set: { features: features } }  // update the features
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ status: 404, message: "Wallet not found." });
        }

        if (result.modifiedCount === 0) {
            return res.status(400).json({ status: 400, message: "No features were updated. They might be the same as the existing ones." });
        }

        res.status(200).json({ status: 200, message: "Wallet features updated successfully." });

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }
};

//Delete a single wallet based on its id and its category
const deleteWallet = async (req, res) => {
    const { id } = req.params;

    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        const dbName = "btc---wallets";
        const db = client.db(dbName);

        // Use the deleteOne method to delete the wallet by its ID
        const result = await db.collection("wallets").deleteOne({ _id: id });

        if (result.deletedCount === 1) {
            res.status(200).json({ status: 200, message: "Successfully deleted the wallet!" });
        } else {
            res.status(404).json({ status: 404, message: "Wallet not found!" });
        }

        await client.close();
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
};

//Post Handlers

//Comment handlers

//User handlers

module.exports = {
    getAllWallets,
    getWallet,
    addWallet,
    updateWallet,
    updateWalletFeatures,
    deleteWallet
};