import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// For Next.js 13+, route handlers should use this params type
type Props = {
   params: {
      id: string;
   };
};

export async function GET(
   request: NextRequest,
   { params }: Props // Use the Props type here
) {
   const id = parseInt(params.id);
   const product = await prisma.product.findUnique({
      where: { id },
   });

   if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
   }

   return NextResponse.json(product);
}

export async function PUT(
   request: NextRequest,
   { params }: Props // Use the Props type here
) {
   const id = parseInt(params.id);
   const json = await request.json();

   const updatedProduct = await prisma.product.update({
      where: { id },
      data: json,
   });

   return NextResponse.json(updatedProduct);
}

export async function DELETE(
   request: NextRequest,
   { params }: Props // Use the Props type here
) {
   const id = parseInt(params.id);

   await prisma.product.delete({
      where: { id },
   });

   return NextResponse.json({ message: "Product deleted successfully" });
}
