import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
   const socialLinks = await prisma.socialMediaLinks.findFirst();
   return NextResponse.json(socialLinks);
}

export async function PUT(request: Request) {
   const body = await request.json();
   const socialLinks = await prisma.socialMediaLinks.upsert({
      where: { id: 1 },
      update: {
         facebook: body.facebook,
         instagram: body.instagram,
         twitter: body.twitter,
      },
      create: {
         facebook: body.facebook,
         instagram: body.instagram,
         twitter: body.twitter,
      },
   });
   return NextResponse.json(socialLinks);
}
