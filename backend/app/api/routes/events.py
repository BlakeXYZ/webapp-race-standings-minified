# ==============================================================================
# EVENTS ROUTES - API endpoints for race events
# ==============================================================================
# This file defines all the routes (URLs) related to race events
# Think of routes as the "pages" of your API
# ==============================================================================

from fastapi import APIRouter, HTTPException, Query  # FastAPI tools
from typing import List                             # For type hints

# ==============================================================================
# CREATE ROUTER - Like a mini-app for this specific feature
# ==============================================================================
# APIRouter is like a blueprint in Flask or Router in Express
# It groups related routes together

router = APIRouter()

# ==============================================================================
# ROUTE 1: GET ALL EVENTS
# ==============================================================================
# This creates a route at: /api/v1/events/
# HTTP Method: GET
# Returns: List of all race events

@router.get("/")
async def get_events():
    """
    Get all race events
    
    Returns a list of all events created in the system.

    Example response:
    {
        "events": [
            {"id": 1, "name": "Grand Prix 1", "date": "2024-07-01"},
            {"id": 2, "name": "Grand Prix 2", "date": "2024-07-15"}
        ]
    }
    """

    events_data = [
        {"id": 1, "name": "Rallycross #73, points event #6", "date": "2024-11-24"},
        {"id": 2, "name": "Rallycross #72, points event #5", "date": "2024-11-03"},
        {"id": 3, "name": "Rallycross #71, points event #4", "date": "2024-09-29"},
        {"id": 4, "name": "Rallycross #70, points event #3", "date": "2024-06-30"},
        {"id": 5, "name": "Rallycross #69, points event #2", "date": "2024-06-09"},
        {"id": 6, "name": "Rallycross #68, points event #1", "date": "2024-02-25"},

    ]

    # Placeholder for actual data retrieval logic
    return { "events": events_data }


# ==============================================================================