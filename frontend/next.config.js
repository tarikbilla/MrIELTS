// next.config.js

module.exports = {
    reactStrictMode: true,
  
    async headers() {
      const headers = [];
  
      headers.push({
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' blob: data: localhost:3001 data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval'; connect-src *;",
          },
        ],
      });
  
      return headers;
    },
  
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '',
          pathname: '*',
        },
        
      ],
      domains: ['localhost','localhost:3000','*'],
    
    },
  };
  