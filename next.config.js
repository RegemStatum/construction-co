const nextConfig = {
  output: "export", // SSG – fully static export
  trailingSlash: true,
  images: {
    unoptimized: true, // required for static export; swap for remotePatterns if using Vercel Image Optimization
  },
  compress: true,
};

export default nextConfig;
