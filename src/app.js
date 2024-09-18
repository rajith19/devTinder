const express = require('express');
const app = express();

// This will only match GET call to /user
app.get("/user", (req, res) => {
    res.send({"firstName" : "Rajith", "lastname" : "Gopal"});

})


app.listen(3000, () => {
    console.log("server started successfully on port 3000...");
});