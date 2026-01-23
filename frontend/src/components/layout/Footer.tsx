import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">

        <p className="text-slate-400 mb-4">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <br />
          <Link to="/about" className="hover:text-white transition-colors">
            About
          </Link>
          
        </p>


        <p className="text-slate-400 mb-4">
          <a href="https://maps.app.goo.gl/bqBcJzuWWCKiYYAE7" className="hover:text-white transition-colors">
            1500 FM 1466,<br />Coupland, TX 78615
          </a>
        </p>


        <p className="text-slate-400 mb-4">
          <a href="mailto:Josh@AustinRallyProject.com" className="hover:text-white transition-colors">
            Josh@AustinRallyProject.com
          </a>
        </p>
        <p className="text-slate-400">Made with ❤️ by Blake K.</p>
        <p className="text-slate-400">
          © {new Date().getFullYear()} ARP Event Results App
        </p>
      </div>
    </footer>
  )
}
