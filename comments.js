// Creat web server
// 1. npm init -y
// 2. npm i express
// 3. npm i body-parser
// 4. npm i cors
// 5. npm i mongoose
// 6. npm i nodemon -D
// 7. npm i dotenv
// 8. npm i jsonwebtoken
// 9. npm i bcryptjs

// 1. Import
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// 2. Config
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

// 3. Middlewares
app.use(cors());
app.use(bodyParser.json());

// 4. Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// 5. Routes
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');
const postsRouter = require('./routes/posts');

app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);

// 6. Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});