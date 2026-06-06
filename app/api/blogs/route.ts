import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Helper to create a URL-friendly slug
const slugify = (text: string) => 
  text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch {
    console.error("GET BLOGS ERROR: unknown error");
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Ensure slug exists since it's @unique and required in your schema
    const slug = body.slug || slugify(body.title);

    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug: slug,
        content: body.content,
        excerpt: body.excerpt,
        image: body.imageUrl || body.image, // Supporting both naming conventions
        published: true,
        author: body.author || "Anjit",
      },
    });
    
    return NextResponse.json(post);
  } catch {
    console.error("POST BLOG ERROR: unknown error");
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}