import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // Use 'id' here
) {
  try {
    const { id } = await params;
    await prisma.post.delete({
      where: { id: id }, // Delete by ID
    });
    return NextResponse.json({ message: "Post deleted" });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt,
        // Auto-generate slug from the new title
        slug: body.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, ''),
        image: body.imageUrl || body.image,
        published: body.published ?? true,
      },
    });
    
    return NextResponse.json(updatedPost);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}