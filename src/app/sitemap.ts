import { MetadataRoute } from 'next';
import { doctorsData } from '../data/doctors';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://vallihospital.in';

    // Base routes
    const routes = [
        '',
        '/about-us',
        '/doctors',
        '/specialities',
        '/technology',
        '/book-appointment',
        '/arthroscopy',
        '/back-pain-and-spinal-disorders',
        '/bone-cancer-treatment',
        '/failed-surgery-corrections',
        '/foot-and-ankle-clinic',
        '/fracture-clinic',
        '/genetic-testing',
        '/joint-care-clinic',
        '/paediatric-orthopaedics-deformity-clinic',
        '/sports-injury-clinic',
        '/sports-medicine-clinic',
        '/sports-training',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic doctor routes
    const doctorRoutes = doctorsData.map((doctor) => ({
        url: `${baseUrl}/doctors/${doctor.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...routes, ...doctorRoutes];
}
