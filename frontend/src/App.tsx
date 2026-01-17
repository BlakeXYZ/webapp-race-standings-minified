// ============================================================================
// IMPORTS - Bringing in tools we need
// ============================================================================

// useState: Store variables that can change (like a regular variable in JS)
// useEffect: Run code when the page loads (like window.onload in vanilla JS)
import { useState, useEffect } from 'react'

// Import our pre-made card components (these are just styled divs)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'


// ============================================================================
// DATA TYPES - Defining what our data looks like (optional but helpful)
// ============================================================================

// This is like a schema - it says each standing has these 3 properties
// Think of it as documentation for what data structure we expect
interface Standing {
  position: number    // Driver's position (1, 2, 3, etc.)
  driver: string      // Driver's name
  points: number      // Points earned
}


// ============================================================================
// MAIN APP COMPONENT - This is your page
// ============================================================================

function App() {
  
  // ------------------------------------------------------------------
  // STATE VARIABLES - Think of these like regular variables, but when
  // they change, the page automatically updates to show the new value
  // ------------------------------------------------------------------
  
  // standings: holds array of driver data
  // setStandings: function to update standings (like standings = newValue)
  // useState([]) means it starts as an empty array
  const [standings, setStandings] = useState<Standing[]>([])
  
  // loading: true when fetching data, false when done
  const [loading, setLoading] = useState(true)
  
  // error: holds error message, or null if no error
  const [error, setError] = useState<string | null>(null)


  // ------------------------------------------------------------------
  // FETCH DATA WHEN PAGE LOADS - Like window.onload in vanilla JS
  // ------------------------------------------------------------------
  
  useEffect(() => {
    // This function gets data from the backend API
    const fetchStandings = async () => {
      try {
        // Call the backend API (like using fetch() in vanilla JS)
        const response = await fetch('/api/v1/standings/')
        
        // Check if request was successful
        if (!response.ok) {
          throw new Error('Failed to fetch standings')
        }
        
        // Convert response to JSON (same as vanilla JS)
        const data = await response.json()
        
        // Update the standings variable with the data we got
        setStandings(data.standings)
        
        // We're done loading
        setLoading(false)
        
      } catch (err) {
        // If something went wrong, store the error message
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    // Run the fetch function
    fetchStandings()
    
    // STUB: Add more data fetching here if needed
    // Example: fetchDriverDetails(), fetchRaceSchedule(), etc.
    
  }, []) // The [] means "run once when page loads" (like window.onload)


  // ------------------------------------------------------------------
  // RENDER - This is the HTML that gets displayed
  // Everything below "return" is just HTML with some JS mixed in
  // {variable} is how you show a variable's value in the HTML
  // ------------------------------------------------------------------
  
  return (
    // OUTER CONTAINER - Full screen with gradient background
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      
      {/* CENTERED CONTENT - Max width container */}
      <div className="max-w-4xl mx-auto">
        
        {/* PAGE TITLE */}
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-900 dark:text-slate-100">
          Race Standings
          {/* STUB: Customize title text here */}
        </h1>
        
        {/* CARD COMPONENT - Just a fancy styled box */}
        <Card>
          
          {/* CARD HEADER */}
          <CardHeader>
            <CardTitle>Current Championship Standings</CardTitle>
            <CardDescription>Latest driver rankings and points</CardDescription>
            {/* STUB: Add more header elements here if needed */}
          </CardHeader>
          
          {/* CARD BODY */}
          <CardContent>
            
            {/* CONDITIONAL RENDERING - Show different things based on state */}
            
            {/* If loading is true, show "Loading..." */}
            {loading && (
              <p className="text-center text-slate-600 dark:text-slate-400">Loading...</p>
            )}
            
            {/* If there's an error, show the error message */}
            {/* The {error} puts the error text inside the paragraph */}
            {error && (
              <p className="text-center text-red-600 dark:text-red-400">Error: {error}</p>
            )}
            
            {/* If NOT loading and NO error, show the standings */}
            {!loading && !error && (
              <div className="space-y-3">
                
                {/* LOOP THROUGH ARRAY - Like a for loop in vanilla JS */}
                {/* standings.map() creates one div for each standing */}
                {standings.map((standing) => (
                  
                  // Each standing item - position, driver name, points
                  <div
                    key={standing.position}  // React needs a unique "key" for each item in a loop
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    {/* LEFT SIDE - Position and driver name */}
                    <div className="flex items-center gap-4">
                      
                      {/* Position number - {standing.position} shows the value */}
                      <span className="text-2xl font-bold text-slate-900 dark:text-slate-100 w-8">
                        {standing.position}
                      </span>
                      
                      {/* Driver name */}
                      <span className="text-lg text-slate-700 dark:text-slate-300">
                        {standing.driver}
                      </span>
                      
                      {/* STUB: Add driver photo here */}
                      {/* Example: <img src={standing.photo} alt={standing.driver} /> */}
                    </div>
                    
                    {/* RIGHT SIDE - Points */}
                    <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                      {standing.points} pts
                    </span>
                    
                    {/* STUB: Add more data here (e.g., wins, team, etc.) */}
                  </div>
                ))}
                
                {/* STUB: Add pagination or "Load More" button here */}
              </div>
            )}
            
          </CardContent>
        </Card>
        
        {/* STUB: Add more cards/sections below */}
        {/* Example: Recent races, upcoming events, etc. */}
        
      </div>
    </div>
  )
}

// Export so main.tsx can use it
export default App
