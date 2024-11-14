import Image from "next/image";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductImage from "@/app/components/ProductImage";


interface PageProps {
   params: {
      id: string;
   };
   searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductPage({ params, searchParams }: PageProps) {
   const id = parseInt(params.id);

   const product = await prisma.product.findUnique({
      where: { id },
   });

   if (!product) {
      notFound();
   }

   return (
      <div className="container mx-auto px-4 py-8">
         <div className="grid md:grid-cols-2 gap-8">
            <ProductImage src={product.imageUrl} alt={product.name} />
            <div className="space-y-4">
               <h1 className="text-3xl font-bold">{product.name}</h1>
               <p className="text-xl font-semibold">
                  ${product.price.toFixed(2)}
               </p>
               <p className="text-gray-600">{product.description}</p>
               <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors">
                  Add to Cart
               </button>
            </div>
         </div>
      </div>
   );
}
