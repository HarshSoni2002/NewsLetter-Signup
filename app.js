const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.First;
  const lastName = req.body.Last;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  // https://<dc>.api.mailchimp.com/3.0/
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/3ffedfaefb";
  const options = {
    method: "POST",
    auth: "hsoni4198:5fa251fb43b394a512cff38c1dd85a16-us21",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure.html", function (req, res) {
  res.redirect("/");
});

app.listen(3000, function (req, res) {
  console.log("server is running on port 3000");
});

// APi KEy
// 5fa251fb43b394a512cff38c1dd85a16-us21

// list id
// 3ffedfaefb
