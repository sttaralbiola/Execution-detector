const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Dito mase-save yung mga nag-execute (Memory Database)
let executedUsers = {};

// Roblox Script magse-send dito kapag na-execute
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

// Admin Command (/list) kukuha ng data dito
app.get('/list', (req, res) => {
    res.status(200).json(executedUsers);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
