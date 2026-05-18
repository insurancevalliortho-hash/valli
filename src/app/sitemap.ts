import { MetadataRoute } from 'next';
import { doctorsData } from '../data/doctors';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://vallihospital.in';
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
        '/about-us'
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
    return [...homeRoute, ...specialtyRoutes, ...otherPages, ...doctorRoutes];
}
