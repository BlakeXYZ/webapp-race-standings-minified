# FastAPI Guide for Python Developers

If you know Python, you already know most of what you need for FastAPI!

## The Basics

### 1. FastAPI is Just Python Functions

```python
from fastapi import FastAPI

app = FastAPI()

# This is just a regular Python function!
@app.get("/")
def read_root():
    return {"message": "Hello World"}
```

**That's it!** The `@app.get("/")` decorator makes it an API endpoint.

---

### 2. Routes = Functions with Decorators

```python
# GET request to /items
@app.get("/items")
def get_items():
    return {"items": [1, 2, 3]}

# POST request to /items
@app.post("/items")
def create_item():
    return {"message": "Item created"}

# PUT request to /items/1
@app.put("/items/{item_id}")
def update_item(item_id: int):
    return {"message": f"Updated item {item_id}"}

# DELETE request to /items/1
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    return {"message": f"Deleted item {item_id}"}
```

---

### 3. URL Parameters (Path Parameters)

```python
# The value from the URL automatically becomes a function parameter
@app.get("/users/{user_id}")
def get_user(user_id: int):  # FastAPI converts to int automatically!
    return {"user_id": user_id}

# Access: GET /users/123
# Returns: {"user_id": 123}
```

**Type hints do validation automatically!** If you say `user_id: int`, FastAPI rejects non-integers.

---

### 4. Query Parameters (After the `?`)

```python
# Query parameters are just function parameters with defaults
@app.get("/search")
def search(query: str, limit: int = 10):
    return {"query": query, "limit": limit}

# Access: GET /search?query=python&limit=5
# Returns: {"query": "python", "limit": 5}

# Access: GET /search?query=python
# Returns: {"query": "python", "limit": 10}  (uses default)
```

**Optional parameters:**
```python
from typing import Optional

@app.get("/search")
def search(query: Optional[str] = None):
    if query:
        return {"results": "..."}
    return {"message": "No query provided"}
```

---

### 5. Request Body (POST/PUT Data)

```python
from pydantic import BaseModel

# Define the shape of the data you expect
class Item(BaseModel):
    name: str
    price: float
    description: Optional[str] = None

# Use it as a parameter
@app.post("/items")
def create_item(item: Item):
    # item.name, item.price, item.description are automatically validated!
    return {"name": item.name, "price": item.price}
```

**Send this JSON:**
```json
{
  "name": "Widget",
  "price": 19.99,
  "description": "A cool widget"
}
```

---

### 6. Return Values

FastAPI automatically converts Python dicts/lists to JSON:

```python
@app.get("/data")
def get_data():
    return {"key": "value"}  # Becomes JSON automatically
    
@app.get("/items")
def get_items():
    return [1, 2, 3, 4, 5]  # Becomes JSON array
    
@app.get("/user")
def get_user():
    user = {"name": "John", "age": 30}
    return user  # Becomes JSON object
```

---

### 7. Async Functions (Optional)

```python
# Regular function (blocking)
@app.get("/slow")
def slow_endpoint():
    time.sleep(5)  # Blocks the whole server
    return {"done": True}

# Async function (non-blocking)
@app.get("/fast")
async def fast_endpoint():
    await asyncio.sleep(5)  # Doesn't block other requests
    return {"done": True}
```

**When to use `async`:**
- Database queries (with async drivers)
- API calls to other services
- File I/O operations

**When NOT to use `async`:**
- CPU-intensive tasks (use regular functions)
- If you're not sure (regular functions work fine!)

---

### 8. Error Handling

```python
from fastapi import HTTPException

@app.get("/items/{item_id}")
def get_item(item_id: int):
    if item_id not in database:
        # Raise an HTTP error
        raise HTTPException(status_code=404, detail="Item not found")
    
    return {"item": database[item_id]}
```

**Common status codes:**
- `200` - OK (default)
- `201` - Created (POST success)
- `400` - Bad Request (invalid data)
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (no permission)
- `404` - Not Found
- `500` - Server Error

---

### 9. Dependency Injection (Advanced but Useful)

```python
from fastapi import Depends

# A dependency is just a function
def get_current_user():
    return {"username": "john_doe"}

# Use it in routes
@app.get("/me")
def read_current_user(user = Depends(get_current_user)):
    return user  # user is the result of get_current_user()
```

**Common uses:**
- Database connections
- Authentication
- Shared logic

---

### 10. Organizing Routes with APIRouter

Instead of putting everything in one file:

```python
# app/api/routes/items.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_items():
    return {"items": []}

@router.post("/")
def create_item():
    return {"message": "Created"}
```

```python
# app/main.py
from fastapi import FastAPI
from app.api.routes import items

app = FastAPI()
app.include_router(items.router, prefix="/items", tags=["items"])

# Now you have: GET /items/ and POST /items/
```

---

## Project Structure

```
backend/
├── app/
│   ├── main.py              # Entry point (creates FastAPI app)
│   ├── core/
│   │   └── config.py        # Configuration/settings
│   ├── api/
│   │   └── routes/
│   │       ├── __init__.py  # Combines all routers
│   │       └── standings.py # Standings endpoints
│   └── models/
│       └── __init__.py      # Database models (future)
├── requirements.txt         # Python dependencies
└── Dockerfile              # Docker configuration
```

---

## Common Patterns

### Pattern 1: CRUD Operations

```python
# Create
@app.post("/items")
def create_item(item: Item):
    # Save to database
    return item

# Read (all)
@app.get("/items")
def read_items():
    # Get from database
    return items

# Read (one)
@app.get("/items/{item_id}")
def read_item(item_id: int):
    # Get from database
    return item

# Update
@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    # Update in database
    return item

# Delete
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    # Delete from database
    return {"message": "Deleted"}
```

### Pattern 2: Pagination

```python
@app.get("/items")
def get_items(skip: int = 0, limit: int = 10):
    items = database[skip : skip + limit]
    return items

# GET /items?skip=20&limit=10
```

### Pattern 3: Filtering/Search

```python
@app.get("/items")
def get_items(
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None
):
    items = database
    
    if category:
        items = [i for i in items if i.category == category]
    
    if min_price:
        items = [i for i in items if i.price >= min_price]
    
    if max_price:
        items = [i for i in items if i.price <= max_price]
    
    return items
```

---

## Testing Your API

### 1. Built-in Interactive Docs

FastAPI automatically creates documentation!

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

You can test all endpoints directly in the browser!

### 2. Using `curl`

```bash
# GET request
curl http://localhost:8000/items

# POST request
curl -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Widget", "price": 19.99}'
```

### 3. Using Python `requests`

```python
import requests

# GET
response = requests.get("http://localhost:8000/items")
print(response.json())

# POST
data = {"name": "Widget", "price": 19.99}
response = requests.post("http://localhost:8000/items", json=data)
print(response.json())
```

---

## Configuration & Environment Variables

```python
# app/core/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "My API"
    database_url: str = "sqlite:///./test.db"
    
    class Config:
        env_file = ".env"

settings = Settings()
```

Create `.env` file:
```
APP_NAME="Production API"
DATABASE_URL="postgresql://user:pass@localhost/db"
```

Use in your app:
```python
from app.core.config import settings

@app.get("/")
def root():
    return {"app_name": settings.app_name}
```

---

## CORS (Cross-Origin Resource Sharing)

Allow your frontend to call the API:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)
```

---

## Running the Server

```bash
# Development (auto-reload on file changes)
uvicorn app.main:app --reload --port 8000

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

## Quick Reference

| Task | Code |
|------|------|
| Create app | `app = FastAPI()` |
| GET route | `@app.get("/path")` |
| POST route | `@app.post("/path")` |
| URL parameter | `@app.get("/items/{id}")` then `def func(id: int)` |
| Query parameter | `def func(query: str)` for `?query=value` |
| Request body | `def func(item: Item)` where Item is Pydantic model |
| Return JSON | `return {"key": "value"}` |
| Raise error | `raise HTTPException(status_code=404)` |
| Async function | `async def func()` |
| Dependency | `def func(dep = Depends(get_dep))` |

---

## Tips

1. **Type hints are your friend** - They enable validation and auto-documentation
2. **Use Pydantic models** - For request/response validation
3. **Check the docs** - http://localhost:8000/docs is interactive!
4. **Start simple** - You don't need async, dependencies, etc. to start
5. **Read the errors** - FastAPI errors are very helpful

---

## Common Mistakes

1. **Forgetting `async` with `await`:**
   ```python
   # WRONG
   async def func():
       result = some_async_function()  # Missing await!
   
   # RIGHT
   async def func():
       result = await some_async_function()
   ```

2. **Not returning a value:**
   ```python
   # WRONG
   @app.get("/")
   def root():
       print("Hello")  # Nothing returned!
   
   # RIGHT
   @app.get("/")
   def root():
       return {"message": "Hello"}
   ```

3. **Wrong parameter types:**
   ```python
   # URL: /items/abc
   @app.get("/items/{item_id}")
   def get_item(item_id: int):  # Will fail - "abc" is not an int
       ...
   
   # Use str if you want to accept anything
   def get_item(item_id: str):
       ...
   ```

---

## Next Steps

1. Add a database (SQLAlchemy, PostgreSQL)
2. Add authentication (JWT tokens)
3. Add file uploads
4. Add background tasks
5. Add WebSockets (real-time)
6. Deploy to production

---

## Resources

- Official Docs: https://fastapi.tiangolo.com
- Full Tutorial: https://fastapi.tiangolo.com/tutorial
- Pydantic Docs: https://docs.pydantic.dev

---

**Remember:** FastAPI is just Python with decorators! If you can write Python functions, you can build APIs with FastAPI.
