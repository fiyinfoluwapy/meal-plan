/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      // Ensures that the .mjs files are handled correctly
      config.module.rules.push({
        test: /\.m?js$/,
        type: 'javascript/auto',
      });
      return config;
    },
  };
  
  export default nextConfig;
  