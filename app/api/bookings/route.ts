import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

// app/api/bookings/route.ts
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const booking = await prisma.booking.create({
      data: {
        name: body.name,
        contactNumber: body.contactNumber,
        email: body.email || '',
        description: body.description, 
        designData: body.designData,      // Now recognized by TypeScript
        designType: body.designType || 'UPLOAD',
        scheduledAt: new Date(body.scheduledAt), // Saves Date + Time
        status: 'PENDING',
      },
    });

    // Send notification email to owner with client's email as reply-to
    try {
      const ownerEmail = process.env.EMAIL_USER;
      if (ownerEmail) {
        const scheduleText = new Date(booking.scheduledAt).toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' });
        const subject = `New booking request from ${booking.name}`;
        const text = `Name: ${booking.name}\nWhatsApp: ${booking.contactNumber}\nEmail: ${booking.email}\nDate: ${scheduleText}\n\nNote:\n${booking.description || 'No notes'}`;
        await sendEmail({ to: ownerEmail, subject, text, replyTo: booking.email || undefined });
      }
    } catch (err) {
      console.warn('Owner email send failed', err);
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error: unknown) {
    console.error("API_ERROR:", error);
    return NextResponse.json({ error: "Check server logs" }, { status: 500 });
  }
}
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}