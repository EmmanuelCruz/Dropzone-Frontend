/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  env: {
    backendURL: 'http://localhost:4000/api',
    frontendURL: 'http://localhost:3000/enlaces' 
  }
}

module.exports = nextConfig
