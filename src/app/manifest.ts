import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Valli Super Specialty Hospital Salem',
    short_name: 'Valli Hospital',
    description: 'Premier Orthopedic, Spine, Trauma & Multispecialty Hospital in Salem, Tamil Nadu.',
    start_url: '/',
    display: 'standalone',
    background_color: '#001f25',
    theme_color: '#001f25',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
