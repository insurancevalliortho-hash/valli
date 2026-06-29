import { MetadataRoute } from 'next';
import { doctorsData } from '../data/doctors';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.vallihospital.in';
    
    const homeRoute = [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily' as const,
            priority: 1.0,
        }
    ];

    const specialtyRoutes = [
        '/joint-care-clinic',
        '/knee-replacement',
        '/rheumatology',
        '/sports-medicine-clinic',
        '/foot-and-ankle-clinic',
        '/back-pain-and-spinal-disorders',
        '/paediatric-orthopaedics-deformity-clinic',
        '/failed-surgery-corrections',
        '/sports-injury-clinic',
        '/fracture-clinic',
        '/arthroscopy',
        '/bone-cancer-treatment',
        '/genetic-testing',
        '/sports-training'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    const otherPages = [
        '/doctors',
        '/facilities',
        '/about-us',
        '/contact-us',
        '/specialities',
        '/services',
        '/technology',
        '/blog'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const doctorRoutes = doctorsData.map((doctor) => ({
        url: `${baseUrl}/doctors/${doctor.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const iyakkamRoutes = [
        '/iyakkam',
        '/iyakkam/ai-sports-rehab',
        '/iyakkam/technnovations',
        '/iyakkam/technnovations/register',
        '/iyakkam/technnovations/portal'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    // Dynamically read MDX blog posts
    let blogRoutes: { url: string; lastModified: string; changeFrequency: 'monthly'; priority: number }[] = [];
    try {
        const blogDir = path.join(process.cwd(), 'src/content/blog');
        if (fs.existsSync(blogDir)) {
            const filenames = fs.readdirSync(blogDir);
            blogRoutes = filenames
                .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
                .map((file) => {
                    const slug = file.replace(/\.mdx?$/, '');
                    return {
                        url: `${baseUrl}/blog/${slug}`,
                        lastModified: new Date().toISOString(),
                        changeFrequency: 'monthly' as const,
                        priority: 0.7,
                    };
                });
        }
    } catch (error) {
        console.error('Error generating dynamic blog routes for sitemap:', error);
    }

    return [...homeRoute, ...specialtyRoutes, ...otherPages, ...iyakkamRoutes, ...doctorRoutes, ...blogRoutes];
}
