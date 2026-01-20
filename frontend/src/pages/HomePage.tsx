import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
            Welcome to Race Standings
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Track your favorite drivers and teams in real-time
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Live Standings</CardTitle>
              <CardDescription>Real-time championship rankings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                View current driver standings, points, and rankings updated in real-time.
              </p>
              <Link 
                to="/standings" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                View Standings →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>About This App</CardTitle>
              <CardDescription>Learn more about the project</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Built with React, FastAPI, and modern web technologies.
              </p>
              <Link 
                to="/about" 
                className="inline-block bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Learn More →
              </Link>
            </CardContent>
          </Card>

        </div>

        {/* Quick Stats Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">20</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Drivers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">10</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Teams</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">23</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Races</div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
