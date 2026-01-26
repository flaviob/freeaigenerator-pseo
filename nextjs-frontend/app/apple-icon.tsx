import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

// Image generation
export default function AppleIcon() {
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
          borderRadius: '20%',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: 'white',
            display: 'flex',
            marginTop: 8,
          }}
        >
          AI
        </div>

        {/* Top left sparkle */}
        <div
          style={{
            position: 'absolute',
            top: 30,
            left: 30,
            fontSize: 24,
            color: '#fbbf24',
          }}
        >
          ✨
        </div>

        {/* Top right sparkle */}
        <div
          style={{
            position: 'absolute',
            top: 25,
            right: 25,
            fontSize: 18,
            color: '#fef3c7',
          }}
        >
          ✨
        </div>

        {/* Bottom right sparkle */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 35,
            fontSize: 16,
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
