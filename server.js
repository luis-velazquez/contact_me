const express = require("express");
const app = express();
const nodeoutlook = require("nodejs-nodemailer-outlook");
const SMTPConnection = require("nodemailer/lib/smtp-connection");


// const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 3000;

// Middleware here
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/contactform.html");
});

// app.post("/", (req, res) => {
//   console.log(req.body);

//   const transporter = nodemailer.createTransport({
//     service: "outlook",
//     auth: {
//       user: "worksbymahr@outlook.com",
//       pass: "MusicMaker_#91",
//     },
//   });

//   const mailOptions = {
//     from: req.body.email,
//     to: "worksbymahr@outlook.com",
//     subject: `Message from ${req.body.email}: ${req.body.subject}`,
//     text: req.body.message,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.send("error");
//     } else {
//       console.log("Email sent: " + info.response);
//       res.send("success");
//     }
//   });
// });
app.post("/", (req, res) =>{
    nodeoutlook.sendEmail({
        auth: {
          user: "worksbymahr@outlook.com",
          pass: "MusicMaker_#91",
        },
        // secure: false,
        from: "worksbymahr@outlook.com",
        to: "avgluis@gmail.com",
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message,
        replyTo: req.body.email,
        onError: (e) => console.log(e),
        onSuccess: res.send("success"),
      });

})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// *Important note*  Start by using (npm start) then on the web go to the local http://localhost:3000