import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifyRecaptchaToken } from "@/lib/recaptcha";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
	name: z.string().min(2),
	email: z.email(),
	message: z.string().min(10),
	recaptchaToken: z.string(),
});

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, email, message, recaptchaToken } =
			contactFormSchema.parse(body);

		// Verify reCAPTCHA token
		const isValidToken = await verifyRecaptchaToken(recaptchaToken);
		if (!isValidToken) {
			return NextResponse.json(
				{ error: "Invalid reCAPTCHA token" },
				{ status: 400 },
			);
		}

		// Send email
		await resend.emails.send({
			from: `${name} <${email}>`,
			to: "kris@rabbittale.co",
			replyTo: email,
			subject: "Portfolio Contact Form Message",
			text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
			html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: monospace;
                line-height: 1.6;
                color: #000;
                background-color: #fff;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                border-left: 4px solid #000;
                padding-left: 16px;
                margin-bottom: 24px;
              }
              .header {
                margin-bottom: 32px;
              }
              .header h1 {
                font-size: 24px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin: 0;
              }
              .content {
                background: #fff;
                margin-bottom: 24px;
              }
              .field {
                margin-bottom: 16px;
              }
              .field-label {
                font-size: 14px;
                font-weight: bold;
                color: #666;
                text-transform: uppercase;
              }
              .field-value {
                font-size: 16px;
                margin-top: 4px;
              }
              .message {
                white-space: pre-wrap;
                font-family: monospace;
                line-height: 1.5;
                margin-top: 8px;
              }
              .logo {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 16px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Get In Touch</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="field-label">Name</div>
                  <div class="field-value">${name}</div>
                </div>
                <div class="field">
                  <div class="field-label">Email</div>
                  <div class="field-value">
                    <a href="mailto:${email}" style="color: #000; text-decoration: none;">${email}</a>
                  </div>
                </div>
                <div class="field">
                  <div class="field-label">Message</div>
                  <div class="message">${message}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Contact form error:", error);
		return NextResponse.json(
			{ error: "Failed to send message" },
			{ status: 500 },
		);
	}
}
