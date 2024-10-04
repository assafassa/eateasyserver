FROM ghcr.io/puppeteer/puppeteer:23.5.0

# Configure default locale (important for chrome-headless-shell)
ENV LANG en_US.UTF-8

# Install Google Chrome if needed
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    google-chrome-stable && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory for your app
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of your application files
COPY . .

# Set the default command to run your app
CMD ["node", "app.js"]
