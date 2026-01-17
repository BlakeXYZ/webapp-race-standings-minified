# ==============================================================================
# STANDINGS ROUTES - API endpoints for race standings
# ==============================================================================
# This file defines all the routes (URLs) related to race standings
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
# ROUTE 1: GET ALL STANDINGS
# ==============================================================================
# This creates a route at: /api/v1/standings/
# HTTP Method: GET
# Returns: List of all driver standings

@router.get("/")
async def get_standings():
    """
    Get race standings
    
    Returns all drivers and their current standings
    
    Example response:
    {
        "standings": [
            {"position": 1, "driver": "Driver 1", "points": 100},
            {"position": 2, "driver": "Driver 2", "points": 85}
        ]
    }
    """
    
    # ------------------------------------------------------------------
    # MOCK DATA - Replace this with database query
    # ------------------------------------------------------------------
    # Currently returning fake data for demonstration
    # STUB: Replace with actual database query
    # Example with database:
    # from app.models import Standing
    # standings = await Standing.get_all()
    # return {"standings": standings}
    
    standings_data = [
        {"position": 1, "driver": "Driver 1", "points": 100},
        {"position": 2, "driver": "Driver 2", "points": 85},
        {"position": 3, "driver": "Driver 3", "points": 70},
    ]
    
    return {"standings": standings_data}
    
    # STUB: Add filtering, sorting, pagination
    # Example: ?sort=points&order=desc&page=1&limit=10


# ==============================================================================
# ROUTE 2: GET SPECIFIC DRIVER STANDING
# ==============================================================================
# This creates a route at: /api/v1/standings/{driver_id}
# HTTP Method: GET
# URL Parameter: driver_id (the number in the URL)
# Returns: Standing for one specific driver

@router.get("/{driver_id}")
async def get_driver_standing(driver_id: int):
    """
    Get specific driver standing
    
    Args:
        driver_id: The ID of the driver (must be an integer)
        
    Returns:
        Driver's position and points
        
    Example:
        GET /api/v1/standings/1
        Returns: {"driver_id": 1, "position": 1, "points": 100}
    """
    
    # ------------------------------------------------------------------
    # MOCK DATA - Replace with database lookup
    # ------------------------------------------------------------------
    # STUB: Replace with database query
    # from app.models import Standing
    # standing = await Standing.get_by_id(driver_id)
    # if not standing:
    #     raise HTTPException(status_code=404, detail="Driver not found")
    # return standing
    
    # For now, just return mock data
    return {
        "driver_id": driver_id,
        "position": 1,
        "points": 100
    }


# ==============================================================================
# STUB: ADD MORE ROUTES HERE
# ==============================================================================

# Example: Create new standing (POST request)
# @router.post("/")
# async def create_standing(standing: StandingCreate):
#     """Create a new standing entry"""
#     # Validate data, save to database
#     return {"message": "Standing created", "id": new_id}


# Example: Update standing (PUT request)
# @router.put("/{driver_id}")
# async def update_standing(driver_id: int, standing: StandingUpdate):
#     """Update an existing standing"""
#     # Find in database, update, save
#     return {"message": "Standing updated"}


# Example: Delete standing (DELETE request)
# @router.delete("/{driver_id}")
# async def delete_standing(driver_id: int):
#     """Delete a standing"""
#     # Find in database, delete
#     return {"message": "Standing deleted"}


# Example: Get standings by team
# @router.get("/team/{team_name}")
# async def get_team_standings(team_name: str):
#     """Get all drivers from a specific team"""
#     # Query database for team
#     return {"team": team_name, "drivers": [...]}


# Example: Search standings
# @router.get("/search/")
# async def search_standings(
#     query: str = Query(..., description="Search term"),
#     min_points: int = Query(0, description="Minimum points")
# ):
#     """Search standings by driver name or points"""
#     # Search database
#     return {"results": [...]}


# ==============================================================================
# NOTES
# ==============================================================================
# 
# HTTP Methods and their typical uses:
# - GET: Retrieve data (read-only, safe)
# - POST: Create new data
# - PUT: Update existing data (replace entire resource)
# - PATCH: Update existing data (partial update)
# - DELETE: Remove data
# 
# URL Parameters:
# - Path parameters: /standings/{driver_id} - part of the URL
# - Query parameters: /standings/?team=RedBull&year=2024 - after the ?
# 
# Error Handling:
# - Use HTTPException to return error responses
# - Example: raise HTTPException(status_code=404, detail="Not found")
# 
# ==============================================================================

