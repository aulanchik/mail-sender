const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

const middlewares = [
    helmet(),
    morgan('dev'),
    express.json(),
    express.urlencoded({ extended: true })
]

app.use(middlewares);

app.listen(PORT, () => {
    console.log(`App is up and running on port ${PORT}`);
})
