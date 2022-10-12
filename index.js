const express = require('express');
const app = express();
const routerApi = require('./routes/index.js');
const cors = require('cors');
const config = require('./config/config');
const dbo = require('./db/connection');

const { errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

process.env.TZ = 'America/Guatemala';

app.use(express.json());

require('./utils/auth');

const whiteList = ['http://localhost:4200', 'localhost:4200', '127.0.0.1:4200', 'https://cinefilms-ffhufhaps-ernestojv.vercel.app/', 'cinefilms-ffhufhaps-ernestojv.vercel.app'];
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

routerApi(app);

app.use(boomErrorHandler);
app.use(errorHandler);

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

