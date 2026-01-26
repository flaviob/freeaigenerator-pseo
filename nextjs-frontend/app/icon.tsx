import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          borderRadius: '50%',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
            display: 'flex',
            marginTop: 2,
          }}
        >
          AI
        </div>
        <div
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            fontSize: 8,
            color: '#fbbf24',
          }}
        >
          ✨
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
