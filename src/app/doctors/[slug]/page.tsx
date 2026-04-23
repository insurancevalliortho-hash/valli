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
        openGraph: {
            title: `${doctor.name} | Valli Hospital`,
            description: doctor.description.slice(0, 160),
            url: `https://vallihospital.in/doctors/${doctor.slug}`,
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

    return <DoctorClientPage doctor={doctor} />;
}
