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

    return {
        title: `${doctor.name} - ${doctor.department} | Valli Hospital`,
        description: doctor.description.slice(0, 160),
        alternates: {
            canonical: `https://www.vallihospital.in/doctors/${doctor.slug}`,
        },
        openGraph: {
            title: `${doctor.name} | Valli Hospital`,
            description: doctor.description.slice(0, 160),
            url: `https://www.vallihospital.in/doctors/${doctor.slug}`,
            images: [
                {
                    url: doctor.image,
                    width: 800,
                    height: 600,
                    alt: doctor.name,
                },
                ...previousImages,
            ],
            type: "profile",
        },
        twitter: {
            card: "summary_large_image",
            title: `${doctor.name} | Valli Hospital`,
            description: doctor.description.slice(0, 160),
            images: [doctor.image],
        },
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const doctor = doctorsData.find((doc) => doc.slug === slug);

    if (!doctor) {
        notFound();
    }

    const schemas: any[] = [
        {
            "@context": "https://schema.org",
            "@type": "Physician",
            "name": doctor.name,
            "image": `https://www.vallihospital.in${doctor.image}`,
            "description": doctor.shortDescription,
            "medicalSpecialty": doctor.department,
            "alumniOf": doctor.qualifications.split(",").map(q => q.trim()),
            "url": `https://www.vallihospital.in/doctors/${doctor.slug}`,
            "parentOrganization": {
                "@type": "Hospital",
                "name": "Valli Super Speciality Hospital",
                "url": "https://www.vallihospital.in"
            },
            ...(doctor.expertise ? { "knowsAbout": doctor.expertise } : {}),
            ...(doctor.awards ? { "award": doctor.awards } : {}),
            ...(doctor.fellowships ? { "description": `${doctor.description} Fellowships: ${doctor.fellowships.join(', ')}` } : {})
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
