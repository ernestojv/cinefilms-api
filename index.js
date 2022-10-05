const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config/config');


app.use(express.json());

const whiteList = ['http://localhost:4200', 'localhost:4200', '127.0.0.1:4200'];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('this is cinefilms-api');
});


app.listen(config.port, () => {
    console.log(`Server is running on port: ${config.port}`);
});