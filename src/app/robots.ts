import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/', '/private/', '/*.json$', '/*.js$'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: ['/api/', '/_next/'],
                crawlDelay: 2,
            }
        ],
        sitemap: 'https://vallihospital.in/sitemap.xml',
        host: 'https://vallihospital.in',
    };
}
