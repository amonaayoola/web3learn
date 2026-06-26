'use client';
import type { VideoEmbed as VideoEmbedData } from '../lib/types';

interface Props {
  video: VideoEmbedData;
  /** Accent color used for the border / glow. Defaults to violet. */
  color?: string;
}

/**
 * Responsive 16:9 YouTube embed with a violet (or themed) border and a
 * caption showing the video title and speaker. Reusable for any video content.
 */
export default function VideoEmbed({ video, color = '#8B5CF6' }: Props) {
  return (
    <figure style={{ margin: '0 0 12px' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9
          borderRadius: 14,
          overflow: 'hidden',
          border: `1.5px solid ${color}`,
          boxShadow: `0 0 28px ${color}33`,
          background: '#000',
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>
      <figcaption style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: '0.08em',
            color,
            padding: '3px 9px',
            borderRadius: 6,
            background: `${color}14`,
            border: `1px solid ${color}33`,
            flexShrink: 0,
          }}
        >
          ▶ VIDEO
        </span>
        <span style={{ fontSize: 14, lineHeight: 1.4, color: 'var(--text-secondary)' }}>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{video.title}</span>
          {video.speaker && <span style={{ color: 'var(--text-tertiary)' }}> · {video.speaker}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
