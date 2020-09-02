const DEFAULT_CONFIG = {
  AUTH_BASE_URL: 'https://oauth.dev.axisb.com',
  API_BASE_URL: 'https://fip.api.dev.axisb.com',
};

const APP_CONFIG = {
  AUTH_BASE_URL: process.env.AUTH_BASE_URL || DEFAULT_CONFIG.AUTH_BASE_URL,
  API_BASE_URL: process.env.API_BASE_URL || DEFAULT_CONFIG.API_BASE_URL,
};

export default APP_CONFIG;
