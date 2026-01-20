// ============================================================================
// IMPORTS - Bringing in tools we need
// ============================================================================

// useState: Store variables that can change (like a regular variable in JS)
// useEffect: Run code when the page loads (like window.onload in vanilla JS)
import { useState, useEffect } from 'react'

// Import our pre-made card components (these are just styled divs)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Link } from 'react-router-dom'

// ============================================================================
// DATA TYPES - Defining what our data looks like (optional but helpful)
// ============================================================================

// This is like a schema - it says each event has these properties
interface Event {
  id: number          // Unique event ID
  name: string        // Event name
  date: string        // Event date
}


// ============================================================================
// EVENT LIST COMPONENT - Displays list of racing events
// ============================================================================

export default function EventList() {
  
  // ------------------------------------------------------------------
  // STATE VARIABLES - Think of these like regular variables, but when
  // they change, the page automatically updates to show the new value
  // ------------------------------------------------------------------
  
  // events: holds array of event data
  // setEvents: function to update events (like events = newValue)
  // useState([]) means it starts as an empty array
  const [events, setEvents] = useState<Event[]>([])
  
  // loading: true when fetching data, false when done
  const [loading, setLoading] = useState(true)
  
  // error: holds error message, or null if no error
  const [error, setError] = useState<string | null>(null)


  // ------------------------------------------------------------------
  // FETCH DATA WHEN COMPONENT LOADS - Like window.onload in vanilla JS
  // ------------------------------------------------------------------
  
  useEffect(() => {
    // This function gets data from the backend API
    const fetchEvents = async () => {
      try {
        // API URL: In dev uses proxy, in production uses env variable
        const apiUrl = import.meta.env.VITE_API_URL 
          ? `${import.meta.env.VITE_API_URL}/api/v1/events/`
          : '/api/v1/events/'
        
        // Call the backend API (like using fetch() in vanilla JS)
        const response = await fetch(apiUrl)
        
        // Check if request was successful
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        
        // Convert response to JSON (same as vanilla JS)
        const data = await response.json()
        
        // Update the events variable with the data we got
        setEvents(data.events)

        // We're done loading
        setLoading(false)
        
      } catch (err) {
        // If something went wrong, store the error message
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    // Run the fetch function
    fetchEvents()
    
    // STUB: Add more data fetching here if needed
    
  }, []) // The [] means "run once when component loads" (like window.onload)


  // ------------------------------------------------------------------
  // RENDER - This is the HTML that gets displayed
  // Everything below "return" is just HTML with some JS mixed in
  // {variable} is how you show a variable's value in the HTML
  // ------------------------------------------------------------------
  
  return (
    // CARD COMPONENT - Just a fancy styled box
    <Card>
      
      {/* CARD HEADER */}
      <CardHeader>
        <CardTitle>Rally Events</CardTitle>
        <CardDescription>View event details and live race updates.</CardDescription>
        {/* STUB: Add more header elements here if needed */}
      </CardHeader>
      
      {/* CARD BODY */}
      <CardContent>
        
        {/* CONDITIONAL RENDERING - Show different things based on state */}
        
        {/* If loading is true, show "Loading..." */}
        {loading && (
          <p className="text-center text-slate-600 dark:text-slate-400">Loading events...</p>
        )}
        
        {/* If there's an error, show the error message */}
        {/* The {error} puts the error text inside the paragraph */}
        {error && (
          <p className="text-center text-red-600 dark:text-red-400">Error: {error}</p>
        )}
        
        {/* If NOT loading and NO error, show the events */}
        {!loading && !error && (
          <div className="space-y-3">
            
            {/* LOOP THROUGH ARRAY - Like a for loop in vanilla JS */}
            {/* events.map() creates one div for each event */}
            {events.map((event) => (
              
              // Each event item - clickable link that displays event details
              // Using Link component to make the whole card clickable
              // Modern hover effects: border, shadow, and slight scale
              <Link
                key={event.id}  // React needs a unique "key" for each item in a loop
                to={`/events/${event.id}`}  // Navigate to individual event page (to be created)
                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                {/* LEFT SIDE - Event name */}
                <div className="flex items-center gap-4">
                  
                  {/* Event name */}
                  <span className="text-lg text-slate-700 dark:text-slate-300">
                    {event.name}
                  </span>
                  
                  {/* STUB: Add event icon or image here */}
                </div>
                
                {/* RIGHT SIDE - Event date */}
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  {event.date}
                </span>
                
                {/* STUB: Add more data here (e.g., location, status, etc.) */}
              </Link>
            ))}
            
            {/* Show message if no events */}
            {events.length === 0 && (
              <p className="text-center text-slate-500 dark:text-slate-400">No upcoming events</p>
            )}
            
            {/* STUB: Add pagination or "Load More" button here */}
          </div>
        )}
        
      </CardContent>
    </Card>
  )
}

// ============================================================================
// NOTES FOR BEGINNERS:
// ============================================================================
// - This is a "reusable component" - you can import it anywhere
// - It handles its own data fetching (self-contained)
// - The logic is separate from the page, keeping code organized
// - You can use this component in HomePage, or any other page
// - Import it like: import EventList from '@/components/events/EventList'
// - Use it like: <EventList />
// ============================================================================
