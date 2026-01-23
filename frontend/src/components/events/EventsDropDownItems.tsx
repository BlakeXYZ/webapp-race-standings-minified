// ============================================================================
// IMPORTS - Bringing in tools we need
// ============================================================================

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ============================================================================
// DATA TYPES - Defining what our data looks like
// ============================================================================

interface Event {
  id: number
  name: string
  date: string
}

// ============================================================================
// EVENTS DROPDOWN COMPONENT - Dynamically populates dropdown with events
// ============================================================================

export default function EventsDropDownItems() {
  
  // ------------------------------------------------------------------
  // STATE VARIABLES - Store events data
  // ------------------------------------------------------------------
  
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  // ------------------------------------------------------------------
  // FETCH DATA WHEN COMPONENT LOADS
  // ------------------------------------------------------------------
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL 
          ? `${import.meta.env.VITE_API_URL}/api/v1/events/`
          : '/api/v1/events/'
        
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        
        const data = await response.json()
        setEvents(data.events)
        setLoading(false)
        
      } catch (err) {
        console.error('Error fetching events:', err)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // ------------------------------------------------------------------
  // RENDER - The dropdown menu
  // ------------------------------------------------------------------
  
  return (
    <>
        {/* Show loading state */}
        {loading && (
            <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
        )}
        
        {/* Dynamically render each event */}
        {!loading && events.map((event) => (
            <DropdownMenuItem key={event.id} asChild>
            <Link to={`/events/${event.date}`} className='cursor-pointer'>
                {event.name}
            </Link>
            </DropdownMenuItem>
        ))}
        
        {/* Show message if no events */}
        {!loading && events.length === 0 && (
            <DropdownMenuItem disabled>No events available</DropdownMenuItem>
        )}
    </>
  )
}