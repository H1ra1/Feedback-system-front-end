/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    prependData: '@import "@/styles/colors"; @import "@/styles/mixins";',
  }
}

module.exports = nextConfig
