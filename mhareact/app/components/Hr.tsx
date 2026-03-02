'use client';

/** Drop-in replacement for MUI Divider that avoids the zero-styled prerender crash */
export default function Hr() {
  return (
    <hr style={{
      margin: 0,
      border: 'none',
      borderTop: '1px solid rgba(0,0,0,0.12)',
    }} />
  );
}
