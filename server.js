const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// UPTIMEROBOT PING / HEALTH CHECK
app.get('/', (req, res) => {
    res.status(200).send('Server is alive!');
});

// MEMORY DATABASE (Dito nase-save yung mga gumamit ng script mo)
let executedUsers = {};

// ROBLOX SCRIPT SENDS DATA DITO KAPAG NA-EXECUTE
app.post('/execute', (req, res) => {
    const { userId, username } = req.body;
    if (userId && username) {
        executedUsers[userId] = {
            username: username,
            executed: true,
            time: new Date().toISOString()
        };
        console.log(`Executed by: ${username} (${userId})`);
        res.status(200).json({ success: true, message: "Logged" });
    } else {
        res.status(400).json({ success: false, message: "Missing data" });
    }
});

// ADMIN COMMAND (/list) KUKUHA NG DATA DITO
app.get('/list', (req, res) => {
    res.status(200).json(executedUsers);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
