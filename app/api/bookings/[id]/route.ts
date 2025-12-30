import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function PATCH(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Your Studio's official WhatsApp/Contact number
    const ANJIT_TATTOO_CONTACT = "+977 9840015954"; // Replace with your actual number

    const updated = await prisma.booking.update({
      where: { id: id },
      data: {
        status: body.status,
        scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : undefined,
      },
    });

    if (body.status === 'CONFIRMED') {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"Anjit Tattoo" <${process.env.EMAIL_USER}>`,
        to: updated.email,
        replyTo: process.env.EMAIL_USER, // Ensuring they reply to your gmail
        subject: 'Booking Confirmed - Anjit Tattoo',
        html: `
          <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif; border-radius: 20px; max-width: 600px; margin: auto; border: 1px solid #333;">
            <h1 style="font-style: italic; text-transform: uppercase; color: #fff; letter-spacing: 2px;">Session Confirmed</h1>
            <p style="color: #888;">Hi ${updated.name},</p>
            <p style="color: #ccc;">Your tattoo appointment has been officially confirmed. We have reserved the following time slot for you:</p>
            
            <div style="background: #111; padding: 24px; border: 1px solid #333; border-radius: 12px; font-size: 18px; font-weight: bold; color: #10b981; text-align: center; margin: 20px 0;">
              ${new Date(updated.scheduledAt).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' })}
            </div>
            
            <p style="color: #ccc;">Please arrive 10 minutes early. If you need to reschedule or have questions, please reach out via WhatsApp.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #222;">
              <p style="font-size: 12px; color: #555; text-transform: uppercase; margin-bottom: 5px;">Studio Contact</p>
              <p style="font-size: 16px; font-weight: bold; color: #fff; margin: 0;">WhatsApp: ${ANJIT_TATTOO_CONTACT}</p>
            </div>

            <p style="margin-top: 40px; font-size: 10px; color: #444; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
              Anjit Tattoo Studio • Kathmandu, Nepal
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PATCH_ERROR:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.booking.delete({ where: { id: id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}