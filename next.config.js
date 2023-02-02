/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    prependData: '@import "@/styles/colors.module"; @import "@/styles/mixins";',
  }
}

module.exports = nextConfig
