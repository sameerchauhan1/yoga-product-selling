import Link from 'next/link'
import Image from 'next/image'

// This would typically come from a database
const blogPosts = [
  { id: 1, title: 'Yoga for Beginners: Getting Started', excerpt: 'Learn the basics of yoga and how to start your journey...' },
  { id: 2, title: 'The Benefits of Smart Yoga Technology', excerpt: 'Discover how smart yoga products can enhance your practice...' },
  { id: 3, title: 'Meditation Techniques for Stress Relief', excerpt: 'Explore effective meditation techniques to reduce stress...' },
  { id: 4, title: 'Yoga Poses for Better Sleep', excerpt: 'Try these relaxing yoga poses to improve your sleep quality...' },
]

export default function BlogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="border rounded-lg overflow-hidden shadow-md">
            <Image src={`/placeholder.svg?height=200&width=400`} alt={post.title} width={400} height={200} className="w-full" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.id}`} className="text-indigo-600 hover:underline">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}