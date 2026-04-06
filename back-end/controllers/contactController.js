const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const Contact = require('../modals/contactModel');

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

const isMongoAvailable = () => mongoose.connection.readyState === 1;

const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  try {
    if (!isMongoAvailable()) {
      return res.status(503).json({
        message: 'MongoDB is unavailable. Please try again after the database connection is restored.',
      });
    }

    const savedContact = await Contact.create({
      name,
      email,
      message,
    });

    const transporter = createTransporter();

    let emailSent = false;
    let emailWarning = '';

    if (!transporter) {
      emailWarning = 'Message saved to the database. SMTP is not configured, so email was not sent.';
    } else {
      try {
        const senderEmail = process.env.CONTACT_SENDER_EMAIL || process.env.SMTP_USER;
        const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER;

        const info = await transporter.sendMail({
          from: senderEmail,
          to: receiverEmail,
          replyTo: email,
          subject: `Portfolio contact message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
              <h2>New portfolio contact message</h2>
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p><strong>Message:</strong></p>
              <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
            </div>
          `,
        });

        emailSent = Boolean(info?.messageId);
      } catch (mailError) {
        emailWarning = 'Message saved to the database, but email delivery failed.';
      }
    }

    return res.status(200).json({
      message: emailSent ? 'Message sent successfully.' : 'Message saved successfully.',
      contactId: savedContact._id,
      submittedAt: savedContact.submittedAt,
      emailSent,
      warning: emailWarning || undefined,
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || 'Failed to save the message. Please try again later.',
    });
  }
};

module.exports = {
  sendContactMessage,
};