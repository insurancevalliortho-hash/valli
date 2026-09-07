import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { doctorsData } from '../../../data/doctors';
import DoctorClientPage from './ClientPage';

export async function generateStaticParams() {
    return doctorsData.map((doctor) => ({
        slug: doctor.slug,
    }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = (await params).slug;
    const doctor = doctorsData.find((doc) => doc.slug === slug);

    if (!doctor) {
        return {
            title: 'Doctor Not Found',
        };
    }

    const previousImages = (await parent).openGraph?.images || [];
    const fullImageUrl = doctor.image.startsWith('http') ? doctor.image : `https://www.vallihospital.in${doctor.image}`;

    return {
        title: `${doctor.name} - ${doctor.shortDescription} in Salem | Valli Hospital`,
        description: `${doctor.name} (${doctor.qualifications}), ${doctor.department} at Valli Super Specialty Hospital Salem. ${doctor.description.slice(0, 140)}...`,
        keywords: [
            doctor.name,
            `${doctor.name} Salem`,
            `${doctor.department} Salem`,
            "orthopedic doctor in Salem",
            "best doctor in Salem",
            "Valli hospital specialist",
            doctor.qualifications
        ],
        alternates: {
            canonical: `https://www.vallihospital.in/doctors/${doctor.slug}`,
        },
        openGraph: {
            title: `${doctor.name} | Top Specialist in Salem | Valli Hospital`,
            description: doctor.shortDescription,
            url: `https://www.vallihospital.in/doctors/${doctor.slug}`,
            images: [
                {
                    url: fullImageUrl,
                    width: 800,
                    height: 600,
                    alt: `${doctor.name} - ${doctor.department}`,
                },
                ...previousImages,
            ],
            type: "profile",
        },
        twitter: {
            card: "summary_large_image",
            title: `${doctor.name} | Valli Hospital Salem`,
            description: doctor.shortDescription,
            images: [fullImageUrl],
        },
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const doctor = doctorsData.find((doc) => doc.slug === slug);

    if (!doctor) {
        notFound();
    }

    const fullImageUrl = doctor.image.startsWith('http') ? doctor.image : `https://www.vallihospital.in${doctor.image}`;

    const schemas: any[] = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.vallihospital.in/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Doctors",
                    "item": "https://www.vallihospital.in/doctors"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": doctor.name,
                    "item": `https://www.vallihospital.in/doctors/${doctor.slug}`
                }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "Physician",
            "name": doctor.name,
            "image": fullImageUrl,
            "description": doctor.description,
            "medicalSpecialty": doctor.department,
            "alumniOf": doctor.qualifications.split(",").map(q => q.trim()),
            "url": `https://www.vallihospital.in/doctors/${doctor.slug}`,
            "worksFor": {
                "@type": "Hospital",
                "name": "Valli Super Specialty Hospital",
                "url": "https://www.vallihospital.in",
                "telephone": "+91-9003417111",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Meyyanoor Road",
                    "addressLocality": "Salem",
                    "addressRegion": "Tamil Nadu",
                    "postalCode": "636004",
                    "addressCountry": "IN"
                }
            },
            ...(doctor.expertise ? { "knowsAbout": doctor.expertise } : {}),
            ...(doctor.awards ? { "award": doctor.awards } : {}),
            ...(doctor.fellowships ? { "honorificSuffix": doctor.fellowships.join(', ') } : {})
        }
    ];

    if (doctor.faqs && doctor.faqs.length > 0) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": doctor.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        });
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />
            <DoctorClientPage doctor={doctor} />
        </>
    );
}

