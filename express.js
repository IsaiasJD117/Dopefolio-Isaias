const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
const port = 3000;
const xss = require('xss');
require('dotenv').config();
const path = require('path');


app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/send', async (req, res) => {
    let { name, email, message } = xss(req.body);
    

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
      },
      
    });
    
    let mailOptions = {
        from: email,
        to: 'isaiasthewebdeveloper@gmail.com',
        subject: 'New Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Email sent successfully');
    } catch (error) {
        console.log(error);
        res.send('Failed to send email');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

