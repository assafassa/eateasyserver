/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
    cacheDirectory: '/opt/render/.cache/puppeteer',
    chrome: {
      skipDownload: false,
      // Explicitly specify the Chrome executable path
      executablePath: '/opt/render/.cache/puppeteer/chrome/linux-129.0.6668.89/chrome-linux64/chrome', // Update the path as needed
      browserVersion: '129.0.6668.70', // Make sure this matches the installed version
    },
    firefox: {
      skipDownload: false,
    },
};
