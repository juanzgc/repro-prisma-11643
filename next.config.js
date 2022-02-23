/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains:[
    "dummyimage.com",
    "tailwindui.com",
    "via.placeholder.com",
    "zwqamokcilroqrlensie.supabase.in",
    "s.gravatar.com"
    ],
  },
  formats: ['image/avif', 'image/webp'],
  swcMinify: false
}
