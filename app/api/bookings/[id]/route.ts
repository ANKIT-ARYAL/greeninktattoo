import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendWhatsApp } from '@/lib/whatsapp';

const OWNER_WHATSAPP_NUMBER = process.env.OWNER_WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_OWNER_WHATSAPP_NUMBER || '+9779849080469';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        status: body.status,
        scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : undefined,
      },
    });

    // Notify customer when status changes to CONFIRMED/REJECTED/RESCHEDULED
    try {
      if (['CONFIRMED', 'REJECTED', 'RESCHEDULED'].includes(updated.status)) {
        let msg = '';
        if (updated.status === 'CONFIRMED') {
          msg = `Hi ${updated.name}, your booking for ${new Date(updated.scheduledAt).toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })} has been CONFIRMED.`;
        } else if (updated.status === 'REJECTED') {
          msg = `Hi ${updated.name}, your booking request has been DECLINED. Please reach out on WhatsApp to reschedule.`;
        } else if (updated.status === 'RESCHEDULED') {
          msg = `Hi ${updated.name}, your booking has been RESCHEDULED to ${new Date(updated.scheduledAt).toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })}.`;
        }
        await sendWhatsApp(updated.contactNumber, msg).catch((e) => console.warn('Customer WhatsApp notify failed', e));
      }
    } catch (err) {
      console.warn('Customer WhatsApp notification skipped', err);
    }

    return NextResponse.json(updated);
  } catch (error: unknown) {
    console.error('PATCH_ERROR:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.booking.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('DELETE_ERROR:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
