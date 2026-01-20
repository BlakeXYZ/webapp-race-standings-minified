import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">Race Standings App</Link>
          <ul className="flex gap-6">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link to="/standings" className="hover:text-blue-400 transition-colors">Standings</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
