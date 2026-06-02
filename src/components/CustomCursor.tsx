import { useCursor } from '@/hooks/useCursor';

export default function CustomCursor() {
  const cursorRef = useCursor();

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '8px',
        height: '8px',
        marginLeft: '-4px',
        marginTop: '-4px',
        borderRadius: '50%',
        backgroundColor: '#F5F2ED',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.25s ease, height 0.25s ease, margin 0.25s ease, background-color 0.25s ease',
      }}
    />
  );
}
