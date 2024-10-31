const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static('public'));

// Rute ip
app.use('/', require('./routes/api/faker'));


app.get('/', async (req, res) => {
    res.send("Hallo");
});

app.listen(3000, () => {
    console.log('app listening on port http://localhost:3002!!!');
});
