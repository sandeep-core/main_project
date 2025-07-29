const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const twilio = require('twilio');

require('dotenv').config();

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Twilio client
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// POST /api/contact
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        // Send Email
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `Contact Form: ${subject}`,
            text: `From: ${name} <${email}>\n\n${message}`
        });

        // Send WhatsApp
        await client.messages.create({
            from: 'whatsapp:+14155238886',
            to: process.env.MY_PHONE,
            body: `📩 Contact Form\n👤 ${name}\n📧 ${email}\n📎 ${subject}\n📝 ${message}`
        });

        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

module.exports = router;
