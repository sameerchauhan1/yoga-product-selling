import Link from 'next/link'
import Image from 'next/image'
import prisma from '@/lib/prisma'


interface Product {
   id: string | number;
   name: string;
   description: string;
   price: number;
   imageUrl: string;
}

export default async function ProductsPage() {
  const products = await prisma.product.findMany()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {products.map((product: Product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-md">
            <Image src={product.imageUrl} alt={product.name} width={300} height={200} className="w-full" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
              <Link href={`/products/${product.id}`} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}