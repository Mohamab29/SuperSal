const mongoose = require('mongoose');
// Connect once to MongoDB To access the data in the Database:
mongoose
    .connect(global.config.database.connectionString)
    .then((db) => console.log("We're connected to MongoDB"))
    .catch((err) => console.log(err));
