import nodemailer from "nodemailer";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter is working
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Connection verified successfully");
  }
});

// Send email to user (confirmation)
export async function sendUserConfirmationEmail(
  userEmail: string,
  userName: string,
): Promise<void> {
  const mailOptions = {
    from: `${process.env.CONTACT_EMAIL}`,
    to: userEmail,
    subject: "We received your message 📬",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Thank You for Reaching Out!</h1>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 10px 10px;">
          <p>Hi <strong>${userName}</strong>,</p>
          
          <p>We have successfully received your message and will get back to you as soon as possible. Our team typically responds within 24-48 hours.</p>
          
          <p>In the meantime, if you have any other questions or need immediate assistance, feel free to reach out to us directly.</p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="color: #666; font-size: 14px; text-align: center;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      </div>
    `,
    text: `Hi ${userName},\n\nWe have successfully received your message and will get back to you as soon as possible. Our team typically responds within 24-48 hours.\n\nThank you for contacting us!`,
  };

  await transporter.sendMail(mailOptions);
}

// Send email to admin (notification)
export async function sendAdminNotificationEmail(
  userName: string,
  userEmail: string,
  subject: string,
  message: string,
): Promise<void> {
  const mailOptions = {
    from: `${process.env.CONTACT_EMAIL}`,
    to: process.env.CONTACT_EMAIL,
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #333; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">📬 New Contact Form Submission</h1>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9; border-radius: 0 0 10px 10px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 12px; font-weight: bold; width: 100px;">Name:</td>
              <td style="padding: 12px;">${userName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 12px; font-weight: bold;">Email:</td>
              <td style="padding: 12px;"><a href="mailto:${userEmail}">${userEmail}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 12px; font-weight: bold;">Subject:</td>
              <td style="padding: 12px;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 12px; white-space: pre-wrap; word-wrap: break-word;">${message}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
            <a href="mailto:${userEmail}" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reply to ${userName}</a>
          </div>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission

Name: ${userName}
Email: ${userEmail}
Subject: ${subject}

Message:
${message}
    `.trim(),
  };

  await transporter.sendMail(mailOptions);
}
