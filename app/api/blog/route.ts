import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
   const posts = await prisma.blogPost.findMany();
   return NextResponse.json(posts);
}

export async function POST(request: Request) {
   const body = await request.json();
   const post = await prisma.blogPost.create({
      data: {
         title: body.title,
         content: body.content,
      },
   });
   return NextResponse.json(post);
}
