import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// app/api/bookings/route.ts
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const booking = await prisma.booking.create({
      data: {
        name: body.name,
        contactNumber: body.contactNumber,
        email: body.email,
        description: body.description, 
        designData: body.designData,      // Now recognized by TypeScript
        designType: body.designType || 'UPLOAD',
        scheduledAt: new Date(body.scheduledAt), // Saves Date + Time
        status: 'PENDING',
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error: any) {
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
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}