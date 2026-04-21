import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure your SMTP settings via environment variables
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL

async function sendEmail(
  to: string,
  subject: string,
  html: string,
) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, company, website, service, budget, message } = body;

    // Validate required fields
    if (!fullName || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('[v0] SMTP not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

    // Email to Ayesha (admin)
    const adminEmailHTML = `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; color: #000;">
        <h2 style="color: #4ddcd3; border-bottom: 2px solid #4ddcd3; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <div style="margin: 20px 0;">
          <p><strong>From:</strong> ${fullName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          ${website ? `<p><strong>Website:</strong> <a href="${website}" target="_blank">${website}</a></p>` : ''}
          <p><strong>Service:</strong> ${service}</p>
          ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-left: 4px solid #4ddcd3; white-space: pre-wrap;">
            ${message}
          </p>
        </div>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          Reply directly to ${email} or use the contact form on your website.
        </p>
      </div>
    `;

    // Auto-reply email to the sender
    const autoReplyHTML = `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; color: #000;">
        <h1 style="color: #4ddcd3;">Thank You, ${fullName}!</h1>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4ddcd3;">
          <p><strong>Here's what happens next:</strong></p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>I'll review your request within 24 hours</li>
            <li>I'll assess the scope and timeline based on your project details</li>
            <li>I'll reach out with a customized proposal</li>
          </ul>
        </div>
        <p>In the meantime, feel free to reach out on LinkedIn or check out my latest security research on the blog.</p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          <strong>Ayesha Attaria</strong><br>
          Web App & API Penetration Tester<br>
          <a href="https://ayeshaattaria.com" style="color: #4ddcd3; text-decoration: none;">ayeshaattaria.com</a>
        </p>
      </div>
    `;

    // Send email to admin
    await sendEmail(
      contactEmail,
      `New Contact Form: ${fullName} - ${service}`,
      adminEmailHTML
    );

    // Send auto-reply to user
    await sendEmail(
      email,
      'I Received Your Message! - Ayesha Attaria',
      autoReplyHTML
    );

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
