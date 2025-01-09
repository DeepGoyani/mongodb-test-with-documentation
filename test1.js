const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const uri = "mongodb://127.0.0.1:27017";
const dbName = "test1";

app.use(express.json());

let db, users, connections, posts, messages;

async function initializeDatabase() {
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    db = client.db(dbName);
    users = db.collection("users");
    connections = db.collection("connections");
    posts = db.collection("posts");
    messages = db.collection("messages");
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}

initializeDatabase();

app.get('/users', async (req, res) => {
    const allUsers = await users.find().toArray();
    res.status(200).json(allUsers);
});

app.get('/users/:userId', async (req, res) => {
    const user = await users.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).send("User not found");
    res.status(200).json(user);
});

app.post('/users', async (req, res) => {
    const newUser = req.body;
    const result = await users.insertOne(newUser);
    res.status(201).send(`User created with ID: ${result.insertedId}`);
});

app.patch('/users/:userId', async (req, res) => {
    const result = await users.updateOne(
        { userId: req.params.userId },
        { $set: { headline: req.body.headline } }
    );
    if (result.matchedCount === 0) return res.status(404).send("User not found");
    res.status(200).send("User headline updated");
});

app.delete('/users/:userId', async (req, res) => {
    const result = await users.deleteOne({ userId: req.params.userId });
    if (result.deletedCount === 0) return res.status(404).send("User not found");
    res.status(200).send("User deleted");
});

app.get('/connections/:userId', async (req, res) => {
    const userConnections = await connections.find({ user1: req.params.userId }).toArray();
    res.status(200).json(userConnections);
});

app.post('/connections', async (req, res) => {
    const newConnection = req.body;
    const result = await connections.insertOne(newConnection);
    res.status(201).send(`Connection created with ID: ${result.insertedId}`);
});

app.patch('/connections/:connectionId', async (req, res) => {
    const result = await connections.updateOne(
        { connectionId: req.params.connectionId },
        { $set: { status: "connected" } }
    );
    if (result.matchedCount === 0) return res.status(404).send("Connection not found");
    res.status(200).send("Connection accepted");
});

app.delete('/connections/:connectionId', async (req, res) => {
    const result = await connections.deleteOne({ connectionId: req.params.connectionId });
    if (result.deletedCount === 0) return res.status(404).send("Connection not found");
    res.status(200).send("Connection removed");
});

app.get('/posts', async (req, res) => {
    const allPosts = await posts.find().toArray();
    res.status(200).json(allPosts);
});

app.get('/posts/:postId', async (req, res) => {
    const post = await posts.findOne({ postId: req.params.postId });
    if (!post) return res.status(404).send("Post not found");
    res.status(200).json(post);
});

app.post('/posts', async (req, res) => {
    const newPost = req.body;
    newPost.createdAt = new Date();
    const result = await posts.insertOne(newPost);
    res.status(201).send(`Post created with ID: ${result.insertedId}`);
});

app.patch('/posts/:postId/likes', async (req, res) => {
    const result = await posts.updateOne(
        { postId: req.params.postId },
        { $inc: { likes: 1 } }
    );
    if (result.matchedCount === 0) return res.status(404).send("Post not found");
    res.status(200).send("Like added to post");
});

app.delete('/posts/:postId', async (req, res) => {
    const result = await posts.deleteOne({ postId: req.params.postId });
    if (result.deletedCount === 0) return res.status(404).send("Post not found");
    res.status(200).send("Post deleted");
});

app.get('/messages/:userId', async (req, res) => {
    const userMessages = await messages.find({ to: req.params.userId }).toArray();
    res.status(200).json(userMessages);
});

app.post('/messages', async (req, res) => {
    const newMessage = req.body;
    newMessage.sentAt = new Date();
    const result = await messages.insertOne(newMessage);
    res.status(201).send(`Message sent with ID: ${result.insertedId}`);
});

app.delete('/messages/:messageId', async (req, res) => {
    const result = await messages.deleteOne({ messageId: req.params.messageId });
    if (result.deletedCount === 0) return res.status(404).send("Message not found");
    res.status(200).send("Message deleted");
});

app.get('/users/:userId/profile-views', async (req, res) => {
    const user = await users.findOne(
        { userId: req.params.userId },
        { projection: { profileViews: 1 } }
    );
    if (!user) return res.status(404).send("User not found");
    res.status(200).json(user);
});

app.put('/users/:userId/skills', async (req, res) => {
    const result = await users.updateOne(
        { userId: req.params.userId },
        { $push: { skills: req.body.skill } }
    );
    if (result.matchedCount === 0) return res.status(404).send("User not found");
    res.status(200).send("Skill added to user");
});

app.patch('/users/:userId/premium', async (req, res) => {
    const result = await users.updateOne(
        { userId: req.params.userId },
        { $set: { isPremium: true } }
    );
    if (result.matchedCount === 0) return res.status(404).send("User not found");
    res.status(200).send("User upgraded to premium");
});
