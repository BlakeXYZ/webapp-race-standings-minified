export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-400">
          © {new Date().getFullYear()} Race Standings App. Built with React + FastAPI.
        </p>
      </div>
    </footer>
  )
}
