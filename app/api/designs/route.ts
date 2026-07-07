// app/api/designs/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Fetch all designs or only featured ones
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const featuredOnly = searchParams.get('featured') === 'true';

    const designs = await prisma.tattooDesign.findMany({
      where: featuredOnly ? { isFeatured: true } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(designs);
  } catch {
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
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}