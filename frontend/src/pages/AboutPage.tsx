import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-900 dark:text-slate-100">
          About This Project
        </h1>

        {/* Project Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              This is a full-stack web application that displays race standings in real-time.
              It demonstrates modern web development practices using React for the frontend
              and FastAPI for the backend.
            </p>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">Frontend</h3>
                <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1">
                  <li>React 18 with TypeScript</li>
                  <li>Vite for build tooling</li>
                  <li>Tailwind CSS for styling</li>
                  <li>shadcn/ui components</li>
                  <li>React Router for navigation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">Backend</h3>
                <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1">
                  <li>FastAPI (Python)</li>
                  <li>RESTful API architecture</li>
                  <li>Docker containerization</li>
                  <li>CORS enabled</li>
                  <li>Auto-generated docs</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2">
              <li>Real-time race standings display</li>
              <li>Responsive design for mobile and desktop</li>
              <li>Dark mode support</li>
              <li>Docker-based development environment</li>
              <li>Hot reload for rapid development</li>
              <li>Type-safe code with TypeScript</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact/Links */}
        <Card>
          <CardHeader>
            <CardTitle>Links & Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-slate-700 dark:text-slate-300">
              <p><strong>API Documentation:</strong> <a href="http://localhost:8000/docs" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">http://localhost:8000/docs</a></p>
              <p><strong>Frontend Port:</strong> 5173</p>
              <p><strong>Backend Port:</strong> 8000</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
