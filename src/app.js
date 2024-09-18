const express = require('express');
const app = express();

// This will only match GET call to /user
app.get("/user", (req, res) => {
    res.send({"firstName" : "Rajith", "lastname" : "Gopal"});

})

// these will match all HTTP method API calls to /test
app.use("/test", (req, res) => {
    res.send("Hello testing!");
});
app.use("/hello", (req, res) => {
    res.send("Hello only!");
});

app.listen(3000, () => {
    console.log("server started successfully on port 3000...");
});