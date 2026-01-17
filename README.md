# Race Standings Web Application

A full-stack web application for displaying race standings with FastAPI backend and React + Vite frontend.

## Tech Stack

### Backend
- **FastAPI** - Modern, fast Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD pipeline
- **GHCR** - GitHub Container Registry
- **Nginx** - Reverse proxy and static file server

## Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── core/         # Configuration
│   │   ├── models/       # Data models
│   │   └── main.py       # FastAPI app
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .dockerignore
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities
│   │   ├── App.tsx       # Main component
│   │   └── main.tsx      # Entry point
│   ├── public/
│   ├── Dockerfile        # Production build
│   ├── Dockerfile.dev    # Development build
│   ├── nginx.conf        # Nginx configuration
│   └── package.json
├── .github/
│   └── workflows/
│       └── deploy.yml    # CI/CD pipeline
├── docker-compose.yml     # Development setup
├── docker-compose.prod.yml # Production setup
└── README.md
```

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 20+ (for local development)
- Python 3.11+ (for local development)

### Development with Docker Compose

1. Clone the repository:
```bash
git clone <repository-url>
cd webapp-race-standings-minified
```

2. Start the application:
```bash
docker-compose up --build
```

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Local Development (without Docker)

#### Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

#### Backend (.env)
```
PROJECT_NAME="Race Standings API"
VERSION="1.0.0"
API_V1_STR="/api/v1"
BACKEND_CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

## Deployment

### GitHub Actions Setup

Configure the following secrets in your GitHub repository:

- `VPS_HOST` - Your VPS IP address or hostname
- `VPS_USERNAME` - SSH username
- `VPS_SSH_KEY` - Private SSH key for authentication
- `VPS_PORT` - SSH port (default: 22)
- `VPS_APP_PATH` - Path on VPS where app is deployed (e.g., `/opt/race-standings`)
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions

### VPS Setup

1. Install Docker and Docker Compose on your VPS
2. Create the app directory:
```bash
mkdir -p /opt/race-standings
cd /opt/race-standings
```

3. Copy `docker-compose.prod.yml` to your VPS
4. Create a `.env` file with production environment variables
5. Set up the `GITHUB_REPOSITORY` environment variable

### Manual Deployment

```bash
# Build images
docker build -t race-standings-backend ./backend
docker build -t race-standings-frontend ./frontend

# Push to registry (optional)
docker tag race-standings-backend ghcr.io/<username>/race-standings-backend:latest
docker push ghcr.io/<username>/race-standings-backend:latest

# Deploy with docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Available Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /api/v1/standings/` - Get all race standings
- `GET /api/v1/standings/{driver_id}` - Get specific driver standing

## Adding shadcn/ui Components

To add new shadcn/ui components:

```bash
cd frontend
npx shadcn-ui@latest add <component-name>
```

Example:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add table
```

## Development Workflow

1. Create a new branch for your feature
2. Make changes and test locally
3. Commit and push to GitHub
4. GitHub Actions will build and test
5. On merge to `main`, automatic deployment to VPS

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
