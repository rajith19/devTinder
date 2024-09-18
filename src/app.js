const express = require('express');
const app = express();

app.use("/", (req, res) => {
    res.send("hello!");
});
app.use("/test", (req, res) => {
    res.send("Hello testing!");
});
app.use("/hello", (req, res) => {
    res.send("Hello only!");
});

app.listen(3000, () => {
    console.log("server started successfully on port 3000...");
});