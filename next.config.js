/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env:{
    stripe_public_key: `${process.env.STRIKE_PUBLIC_KEY}`
  }
}
