const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser'); 




require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Increase payload size limit (default is 100kb)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("hello world");
});

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));
app.use("/api", router);

const PORT = 8080 || process.env.PORT

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running");
        console.log("http://localhost:" + PORT);
    });
});
