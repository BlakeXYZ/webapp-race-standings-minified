# Production Deployment Guide

Complete guide for deploying your Race Standings web app to a VPS using Docker and GitHub Actions.

---

## 📋 Prerequisites

Before you start, you need:

1. **A VPS server** (DigitalOcean, Linode, AWS EC2, etc.)
   - Ubuntu 20.04+ or similar Linux distribution
   - Minimum 1GB RAM, 1 CPU core
   - Root or sudo access

2. **A GitHub repository** with this code pushed

3. **A domain name** (optional but recommended)
   - Point your domain's A record to your VPS IP

4. **SSH access** to your VPS

---

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your VPS

SSH into your VPS:
```bash
ssh root@your-vps-ip
# or
ssh username@your-vps-ip
```

Update the system:
```bash
sudo apt update && sudo apt upgrade -y
```

Install Docker:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

Install Docker Compose:
```bash
sudo apt install docker-compose-plugin -y
```

Verify installation:
```bash
docker --version
docker compose version
```

---

### Step 2: Set Up Application Directory

Create the app directory:
```bash
sudo mkdir -p /opt/race-standings
sudo chown $USER:$USER /opt/race-standings
cd /opt/race-standings
```

---

### Step 3: Create Production Configuration Files

Create `docker-compose.prod.yml`:
```bash
nano docker-compose.prod.yml
```

Copy the contents from your local `docker-compose.prod.yml` file.

Create `.env` file with your production settings:
```bash
nano .env
```

Add these variables (replace with your actual values):
```env
# REQUIRED: Your GitHub repository (username/repo-name)
GITHUB_REPOSITORY=yourusername/webapp-race-standings-minified

# API Configuration
PROJECT_NAME="Race Standings API - Production"
VERSION="1.0.0"

# CORS - Add your actual domain(s)
BACKEND_CORS_ORIGINS=["https://yourdomain.com","https://www.yourdomain.com"]

# Database (if using PostgreSQL)
# DATABASE_URL=postgresql://raceuser:securepassword@postgres:5432/race_standings
# POSTGRES_USER=raceuser
# POSTGRES_PASSWORD=securepassword123
# POSTGRES_DB=race_standings

# Authentication (if implementing)
# SECRET_KEY=your-super-secret-key-at-least-32-characters-long
# ALGORITHM=HS256
# ACCESS_TOKEN_EXPIRE_MINUTES=30

# External Services (if using)
# STRIPE_API_KEY=sk_live_...
# SENDGRID_API_KEY=SG...

# Monitoring (if using)
# SENTRY_DSN=https://...
# LOG_LEVEL=INFO
```

Save and exit (Ctrl+X, Y, Enter).

---

### Step 4: Set Up SSH Key for GitHub Actions

Generate SSH key pair on your VPS:
```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_actions -N ""
```

Add public key to authorized_keys:
```bash
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Display the private key (you'll need this for GitHub):
```bash
cat ~/.ssh/github_actions
```

Copy the entire private key (including `-----BEGIN ... KEY-----` lines).

---

### Step 5: Configure GitHub Secrets

Go to your GitHub repository:
1. Click **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**

Add these secrets:

| Secret Name | Value | Example |
|-------------|-------|---------|
| `VPS_HOST` | Your VPS IP or domain | `123.45.67.89` or `server.example.com` |
| `VPS_USERNAME` | SSH username | `root` or `ubuntu` or `deploy` |
| `VPS_SSH_KEY` | Private key from Step 4 | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `VPS_PORT` | SSH port (optional) | `22` (default) |
| `VPS_APP_PATH` | App directory on VPS | `/opt/race-standings` |

**Optional secrets for advanced setup:**
- `PRODUCTION_DATABASE_URL` - Database connection string
- `PRODUCTION_API_URL` - Backend URL for frontend
- `SECRET_KEY` - For authentication

---

### Step 6: Enable GitHub Container Registry

Make your repository packages public (or configure authentication):

1. Go to your repository on GitHub
2. Push any commit to trigger the workflow
3. After first build, go to **Packages** (in your profile or org)
4. Find your backend/frontend packages
5. Click **Package settings**
6. Under **Danger Zone**, change visibility to **Public** (or set up access tokens)

---

### Step 7: Deploy!

Push your code to the main branch:
```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

GitHub Actions will automatically:
1. Build Docker images
2. Push to GitHub Container Registry
3. SSH into your VPS
4. Pull the images
5. Start the containers

Monitor the deployment:
- GitHub: Go to **Actions** tab to see the workflow running
- VPS: Watch logs with `docker compose -f docker-compose.prod.yml logs -f`

---

### Step 8: Verify Deployment

Check if containers are running on your VPS:
```bash
cd /opt/race-standings
docker compose -f docker-compose.prod.yml ps
```

You should see:
```
NAME                              STATUS    PORTS
race-standings-backend-prod       Up        0.0.0.0:8000->8000/tcp
race-standings-frontend-prod      Up        0.0.0.0:80->80/tcp
```

Test the API:
```bash
curl http://localhost:8000/health
# Should return: {"status":"healthy"}
```

Access from browser:
- Frontend: `http://your-vps-ip`
- Backend: `http://your-vps-ip:8000`
- API Docs: `http://your-vps-ip:8000/docs`

---

## 🔒 Optional: Set Up HTTPS with Let's Encrypt

### Install Certbot

```bash
sudo apt install certbot -y
```

### Stop the frontend container temporarily

```bash
cd /opt/race-standings
docker compose -f docker-compose.prod.yml stop frontend
```

### Get SSL certificate

```bash
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts and provide your email.

### Update nginx configuration

Create custom nginx config:
```bash
nano nginx.prod.conf
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        # Proxy all /api requests to the backend container
        proxy_pass http://backend:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Update docker-compose.prod.yml

Add SSL volumes to frontend service:
```yaml
frontend:
  # ... existing config ...
  ports:
    - "80:80"
    - "443:443"
  volumes:
    - /etc/letsencrypt:/etc/letsencrypt:ro
    - ./nginx.prod.conf:/etc/nginx/conf.d/default.conf:ro
```

### Restart services

```bash
docker compose -f docker-compose.prod.yml up -d
```

### Set up auto-renewal

```bash
sudo crontab -e
```

Add this line:
```
0 12 * * * /usr/bin/certbot renew --quiet && docker compose -f /opt/race-standings/docker-compose.prod.yml restart frontend
```

---

## 🔧 Common Commands

### View logs
```bash
# All logs
docker compose -f docker-compose.prod.yml logs -f

# Backend only
docker compose -f docker-compose.prod.yml logs -f backend

# Frontend only
docker compose -f docker-compose.prod.yml logs -f frontend

# Last 100 lines
docker compose -f docker-compose.prod.yml logs --tail 100
```

### Restart services
```bash
# Restart all
docker compose -f docker-compose.prod.yml restart

# Restart backend only
docker compose -f docker-compose.prod.yml restart backend

# Restart frontend only
docker compose -f docker-compose.prod.yml restart frontend
```

### Update deployment
```bash
# Pull latest images
docker compose -f docker-compose.prod.yml pull

# Recreate containers
docker compose -f docker-compose.prod.yml up -d

# Or do both
docker compose -f docker-compose.prod.yml pull && docker compose -f docker-compose.prod.yml up -d
```

### Stop all services
```bash
docker compose -f docker-compose.prod.yml down
```

### View resource usage
```bash
docker stats
```

### Clean up old images
```bash
docker system prune -a
```

---

## 🐛 Troubleshooting

### Containers won't start
```bash
# Check logs for errors
docker compose -f docker-compose.prod.yml logs

# Check if ports are in use
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :8000

# Verify environment variables
docker compose -f docker-compose.prod.yml config
```

### Can't pull images from GHCR
```bash
# Login to GHCR manually
echo YOUR_GITHUB_TOKEN | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin

# Or use GitHub Personal Access Token
# Generate at: Settings → Developer settings → Personal access tokens
# Needs: read:packages permission
```

### Backend shows CORS errors
- Check `BACKEND_CORS_ORIGINS` in `.env`
- Make sure your frontend domain is included
- Restart backend: `docker compose -f docker-compose.prod.yml restart backend`

### Frontend can't reach backend
- Verify backend is running: `curl http://localhost:8000/health`
- Check nginx proxy configuration
- Verify network: `docker network ls`

### GitHub Actions deployment fails
- Check VPS_HOST is correct IP/domain
- Verify SSH key has no passphrase
- Check VPS_APP_PATH exists on server
- Ensure GitHub Actions has permissions to write packages

---

## 📊 Monitoring and Maintenance

### Set up log rotation
```bash
sudo nano /etc/docker/daemon.json
```

Add:
```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

Restart Docker:
```bash
sudo systemctl restart docker
```

### Database backups (if using PostgreSQL)
```bash
# Backup
docker exec race-standings-db-prod pg_dump -U raceuser race_standings > backup_$(date +%Y%m%d).sql

# Restore
docker exec -i race-standings-db-prod psql -U raceuser race_standings < backup_20260117.sql
```

### Monitor disk space
```bash
df -h
docker system df
```

### Update Docker images regularly
```bash
# Pull latest
docker compose -f docker-compose.prod.yml pull

# Recreate with new images
docker compose -f docker-compose.prod.yml up -d
```

---

## 🔐 Security Checklist

- [ ] Change default SSH port from 22
- [ ] Set up firewall (UFW)
- [ ] Use strong passwords for database
- [ ] Enable HTTPS with SSL certificates
- [ ] Keep Docker and system updated
- [ ] Use environment variables for secrets
- [ ] Set up fail2ban for SSH protection
- [ ] Regular backups
- [ ] Monitor logs for suspicious activity
- [ ] Use non-root user for deployment

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)

---

## 🆘 Getting Help

If you encounter issues:

1. Check the logs: `docker compose -f docker-compose.prod.yml logs`
2. Verify GitHub Actions workflow in the Actions tab
3. Test API endpoints: `http://your-vps-ip:8000/docs`
4. Check firewall rules: `sudo ufw status`
5. Verify DNS settings for your domain

---

**You're all set!** Your app should now be live and automatically deploy when you push to the main branch. 🎉
