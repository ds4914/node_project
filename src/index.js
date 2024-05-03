const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/note", noteRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://dineshsuthar:ds49145198@cluster0.ntlmz8x.mongodb.net/').then(
    () => {
        app.listen(PORT, () => {
            console.log("Server started on port no. "+ PORT);
        });
    }
).catch((error) => {
    console.log(error);
});

app.get("/", (req, res) => {
    res.send("Hello");
});

