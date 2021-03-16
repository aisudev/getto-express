const express = require('express')
const colors = require('colors')
const app = express()
const bparser = require('body-parser')
const path = require('path')
const nodemailer = require('nodemailer')
const PORT = 5555

// ? FOR parse the body data from front to back
app.use(bparser.urlencoded({ extended: true }))

// ? home page
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/src/index.html'))
})
// ? contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/src/contact.html'))
})
// ?email subscribe
app.post('/contact', (req, res) => {
    // ? get the parameter from form
    const {name, email} = req.body
    // ? create the transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'xxxxxx@gmail.com', // !enter email
            pass: 'password' // !enter password
        }
    });
    // ? create the structure of email
    let mailOptions = {
        from: 'xxxxxxxx@gmail.com',
        to: email,
        subject: 'Hello, '+name,
        html: '<b>Do you receive this mail?</b>'
    };
    // ? sending
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });

    res.redirect('/')
})

app.use(express.static(path.join(__dirname, 'src')))

app.listen(PORT, () => {
    console.log(`APP IS RUNNING IN PORT:${PORT}`.cyan)
})