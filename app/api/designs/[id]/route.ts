import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } // Change to Promise
) {
  try {
    const { id } = await params; // Await the id

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.tattooDesign.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error("❌ DELETE_ERROR:", message);
    return NextResponse.json(
      { error: "Delete failed", details: message }, 
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } // Change to Promise
) {
  try {
    const { id } = await params; // Await the id
    const body = await req.json();

    const updated = await prisma.tattooDesign.update({
      where: { id: id },
      data: {
        title: body.title,
        category: body.category,
        imageUrl: body.imageUrl,
        isFeatured: body.isFeatured,
      },
    });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error("❌ PUT_ERROR:", message);
    return NextResponse.json(
      { error: "Update failed", details: message }, 
      { status: 500 }
    );
  }
}