import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #004d66, #002b36)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 'bold',
            marginBottom: 20,
            letterSpacing: '-0.05em',
            background: 'linear-gradient(to right, #ffffff, #e0e0e0)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Valli
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 'normal',
            textAlign: 'center',
            maxWidth: '80%',
            opacity: 0.9,
          }}
        >
          Salem's Premier Orthopedic & Super Speciality Hospital
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
