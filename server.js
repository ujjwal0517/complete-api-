const express = require("express");
const mongoose = require("mongoose");

//DataBase LocalPath Connection
const DATABASE_URI = "mongodb://localhost/usersCollection";
mongoose.connect(DATABASE_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("error", (err) =>
  console.log("Error, while connecting to DB:::" + err)
);
db.on("open", () => console.log("Database Connected Successfully"));

const app = express(); // Setting up APP

app.use(express.json()); // Using JSON

//Setting up Router
const userRouter = require("./routers/users");
app.use("/users", userRouter);
app.get("/", (req, res) => {
  res.send(`<h1>API ENDPOINTS ARE</h1><br>
    <ul><li>/users --GET</li><li>/users/id --GET</li>
    <li>/users --POST</li><li>/users/id --PATCH</li><li>/users/id --DELETE</ul>
    <hr>Note: UserName is updated automatically, you dont have to insert it.
    `);
});

app.use(express.urlencoded({ extended: false })); // To use Request body
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running @ PORT:::" + PORT));