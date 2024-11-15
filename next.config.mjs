// next.config.mjs
export default {
    async rewrites() {
        return [
            {
                source: '/editor/:path*',
                destination: 'http://localhost:3001/editor/:path*',
            },
            {
                source: '/_next/:path*',
                destination: 'http://localhost:3001/_next/:path*',
            },
            {
                source: '/:path*',
                destination: 'http://localhost:3001/:path*',
            },
        ];
    },
};
