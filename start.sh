#!/bin/bash

# Tips4SDRs Website Startup Script
# Ensures the website loads properly by checking dependencies and environment

# Text styling
BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print banner
echo -e "${BOLD}╔════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║        Tips4SDRs Website Launcher          ║${NC}"
echo -e "${BOLD}╚════════════════════════════════════════════╝${NC}"

# Working directory
cd "$(dirname "$0")"
echo -e "${GREEN}► Working directory:${NC} $(pwd)"

# Check Node version
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed!${NC}"
    exit 1
else
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓ Node.js version:${NC} $NODE_VERSION"
fi

# Check npm version
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed!${NC}"
    exit 1
else
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓ npm version:${NC} $NPM_VERSION"
fi

# Check for package.json
if [ ! -f "package.json" ]; then
    echo -e "${RED}✗ package.json not found!${NC}"
    exit 1
else
    echo -e "${GREEN}✓ package.json found${NC}"
fi

# Check for node_modules
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠ node_modules not found, installing dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}✗ Failed to install dependencies!${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ node_modules found${NC}"
fi

# Check for .next directory, if not present, run build
if [ ! -d ".next" ]; then
    echo -e "${YELLOW}⚠ .next directory not found, building project...${NC}"
    npm run build
    if [ $? -ne 0 ]; then
        echo -e "${RED}✗ Failed to build project!${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ .next directory found${NC}"
fi

# Check for important image assets
IMAGES_DIR="public/images"
if [ ! -d "$IMAGES_DIR" ]; then
    echo -e "${RED}✗ Images directory not found!${NC}"
    exit 1
else
    echo -e "${GREEN}✓ Verifying image assets...${NC}"
    # Check specific hero image
    HERO_IMAGE_PATH="$IMAGES_DIR/Hero2Updated.png" 
    if [ ! -f "$HERO_IMAGE_PATH" ]; then
        echo -e "${YELLOW}⚠ Warning: Hero image not found at $HERO_IMAGE_PATH${NC}"
        echo -e "${YELLOW}⚠ Some images may not display correctly${NC}"
    else
        # Check if image file is valid/not corrupted by checking file size
        IMAGE_SIZE=$(stat -f%z "$HERO_IMAGE_PATH")
        if [ "$IMAGE_SIZE" -lt 1000 ]; then
            echo -e "${YELLOW}⚠ Warning: Hero image appears to be too small (${IMAGE_SIZE} bytes)${NC}"
            echo -e "${YELLOW}⚠ It may be corrupted or incomplete${NC}"
        else
            echo -e "${GREEN}✓ Hero image verified (${IMAGE_SIZE} bytes)${NC}"
        fi
    fi
fi

# Check for LinkedIn reaction images
REACTION_DIR="$IMAGES_DIR/linkedinReactions"
if [ ! -d "$REACTION_DIR" ]; then
    echo -e "${YELLOW}⚠ LinkedIn reaction images directory not found!${NC}"
    echo -e "${YELLOW}⚠ Reaction images may not display correctly${NC}"
else
    REACTION_COUNT=$(ls -1 "$REACTION_DIR" | wc -l | xargs)
    echo -e "${GREEN}✓ Found $REACTION_COUNT LinkedIn reaction images${NC}"
fi

# Determine port
PORT=3000
# Check if port 3000 is in use
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    PORT=3001
    echo -e "${YELLOW}⚠ Port 3000 is in use, will attempt to use port 3001${NC}"
    # Check if port 3001 is also in use
    if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
        PORT=0 # Let Next.js find an available port
        echo -e "${YELLOW}⚠ Port 3001 is also in use, will use an available port${NC}"
    fi
fi

# Print success
echo -e "\n${GREEN}${BOLD}✓ All checks passed! Starting the website...${NC}\n"

# Start the website
if [ $PORT -eq 0 ]; then
    echo -e "${YELLOW}⚠ Starting on the next available port...${NC}"
    npm run dev &
else
    echo -e "${GREEN}► Starting server on http://localhost:$PORT${NC}"
    PORT=$PORT npm run dev &
fi

SERVER_PID=$!

# Wait a bit for the server to start
sleep 3

# Check if server is still running
if ! ps -p $SERVER_PID > /dev/null; then
    echo -e "${RED}✗ Server failed to start!${NC}"
    exit 1
fi

echo -e "${GREEN}► Server is running with PID: $SERVER_PID${NC}"

# Determine actual port used by scanning the output
if [ $PORT -eq 0 ]; then
    # Try to extract port from process output
    sleep 2
    PORT=$(lsof -Pan -p $SERVER_PID -i | grep LISTEN | awk '{print $9}' | sed 's/.*://')
    if [ -z "$PORT" ]; then
        echo -e "${YELLOW}⚠ Could not determine port, please check running processes${NC}"
    else
        echo -e "${GREEN}► Server is running on port: $PORT${NC}"
    fi
fi

# Open browser after a delay
sleep 2
echo -e "${GREEN}► Opening browser...${NC}"

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open "http://localhost:${PORT:-3000}"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open "http://localhost:${PORT:-3000}"
else
    # Windows or other
    echo -e "${YELLOW}⚠ Please open http://localhost:${PORT:-3000} in your browser${NC}"
fi

echo -e "\n${GREEN}${BOLD}✓ Tips4SDRs website is now running!${NC}"
echo -e "${YELLOW}► Press Ctrl+C to stop the server${NC}\n"

# Wait for server to exit
wait $SERVER_PID
