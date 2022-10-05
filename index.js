const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config/config');
const dbo = require('./db/connection');

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

dbo.connectToServer((error) => {
    if(error) {
        // eslint-disable-next-line no-console
        console.log(error);
        process.exit();
    }
    app.listen(config.port, () => {
        // eslint-disable-next-line no-console
        console.log(`Server is running on port: ${config.port}`);
    });
});

