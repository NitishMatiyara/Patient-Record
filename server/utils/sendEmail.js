import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const sendEmail = async (email, link) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Admin Gmail ID
        pass: process.env.EMAIL_PASSWORD, // Admin Gmail Password
      },
    });
    // Configure mailgen by setting a theme and your product info
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        // Appears in header & footer of e-mails
        name: "Mailgen",
        link: "https://mailgen.js/",
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
      },
    });

    // Email template
    const emailResponse = {
      body: {
        title: "Welcome to Patient Record App!",
        action: {
          instructions:
            "Please verify your email address & complete the registration process.",
          button: {
            color: "#198754", // Optional action button color
            text: "Verify My Email",
            link: link,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    const emailBody = mailGenerator.generate(emailResponse);
    const message = {
      from: {
        name: "Nitish Matiyara",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: "Patient Record Verification Link",
      html: emailBody,
    };

    await transporter.sendMail(message);
  } catch (error) {
    return error;
  }
};

export default sendEmail;
