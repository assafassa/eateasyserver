/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
    cacheDirectory: '/opt/render/.cache/puppeteer',
    chrome: {
      skipDownload: false,
      // Explicitly specify the Chrome version Puppeteer should download
      executablePath: 'chrome',
      browserVersion: '129.0.6668.70',
    },
    firefox: {
      skipDownload: false,
    },
  };
  