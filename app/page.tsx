import Link from "next/link";
import prisma from "@/lib/prisma";
import ProductImage from "./components/ProductImage";

export default async function Home() {
   const featuredProducts = await prisma.product.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
   });
   const recentBlogPosts = await prisma.blogPost.findMany({
      take: 2,
      orderBy: { createdAt: "desc" },
   });

   return (
      <div className="space-y-12">
         <section className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Smart Yoga</h1>
            <p className="text-xl mb-8">
               Enhance your practice with our innovative smart yoga products
            </p>
            <Link
               href="/products"
               className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
            >
               Shop Now
            </Link>
         </section>

         <section>
            <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {featuredProducts.map((product) => (
                  <div
                     key={product.id}
                     className="border rounded-lg overflow-hidden shadow-md"
                  >
                     <ProductImage src={product.imageUrl} alt={product.name} />
                     <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">
                           {product.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                           {product.description}
                        </p>
                        <Link
                           href={`/products/${product.id}`}
                           className="text-indigo-600 hover:underline"
                        >
                           Learn More
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         <section>
            <h2 className="text-3xl font-bold mb-6">Latest from Our Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {recentBlogPosts.map((post) => (
                  <div
                     key={post.id}
                     className="border rounded-lg overflow-hidden shadow-md"
                  >
                     <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">
                           {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                           {post.content.substring(0, 150)}...
                        </p>
                        <Link
                           href={`/blog/${post.id}`}
                           className="text-indigo-600 hover:underline"
                        >
                           Read More
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         <section>
           
         </section>
      </div>
   );
}
