const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./server/routes/authRoutes');
const connectDB = require('./server/config/db');
const sessionConfig = require('./server/config/session');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.set('trust proxy', 1);
app.use(sessionConfig);

connectDB();
app.use('/', authRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Site listening on port ${port}`);
});
