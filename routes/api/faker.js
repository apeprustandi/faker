const express = require('express');
const fs = require('fs');

const router = express.Router();

// Load data once when the server starts
const users = JSON.parse(fs.readFileSync('data/user/users.json', 'utf8'));
const myIp = JSON.parse(fs.readFileSync('data/iplist/id.json', 'utf8'));

router.get('/ip/:country', (req, res) => {
    const country = req.params.country;

    try {
        const ipList = JSON.parse(fs.readFileSync(`data/iplist/${country}.json`, 'utf8'));
        const randomIp = ipList[Math.floor(Math.random() * ipList.length)];
        res.json(randomIp);
    } catch (error) {
        res.status(404).json({ error: 'Country not found or invalid file format' });
    }
});

router.get('/user', (req, res) => {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomIp = myIp[Math.floor(Math.random() * myIp.length)];
    
    const sensitive = false;
    const userResponse = sensitive ? randomUser : (({ nik, nkk, ...rest }) => rest)(randomUser);
    
    res.json({ user: userResponse, ip: randomIp });
});

module.exports = router;
