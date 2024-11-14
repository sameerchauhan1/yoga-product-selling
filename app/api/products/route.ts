import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
   const products = await prisma.product.findMany();
   return NextResponse.json(products);
}

export async function POST(request: Request) {
   const body = await request.json();
   const { name, description, price, imageUrl } = body;

   if (!name || !description || !price || !imageUrl) {
      return NextResponse.json(
         { error: "Missing required fields" },
         { status: 400 }
      );
   }

   // Save the product to the database
   const product = await prisma.product.create({
      data: {
         name,
         description,
         price: parseFloat(price),
         imageUrl,
      },
   });

   return NextResponse.json(product);
}
