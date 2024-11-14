import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600">Smart Yoga</Link>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:text-indigo-600">Home</Link></li>
          <li><Link href="/products" className="hover:text-indigo-600">Products</Link></li>
          <li><Link href="/blog" className="hover:text-indigo-600">Blog</Link></li>
          <li><Link href="/admin" className="hover:text-indigo-600">Admin</Link></li>
        </ul>
      </nav>
    </header>
  )
}