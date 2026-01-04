// app/api/designs/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Fetch all designs
export async function GET() {
  try {
    const designs = await prisma.tattooDesign.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(designs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST: Create a new design
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newDesign = await prisma.tattooDesign.create({
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
        category: body.category,
        isFeatured: body.isFeatured || false,
      },
    });
    return NextResponse.json(newDesign);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}