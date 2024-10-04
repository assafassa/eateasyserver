FROM ghcr.io/puppeteer/puppeteer:23.5.0

# Switch to root to install packages
USER root

# Install Google Chrome
RUN apt-get update && \
    apt-get install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

# Switch back to the default user (if necessary)
USER pptruser

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["node", "app.js"]
