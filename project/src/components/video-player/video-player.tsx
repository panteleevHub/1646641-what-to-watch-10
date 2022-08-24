import {useEffect, useRef} from 'react';

const VIDEO_DELAY_TIME = 1000;

type VideoPlayerProps = {
  width: string,
  height: string,
  poster: string,
  src: string,
}

type UseEffectType = (() => void) | undefined;

function VideoPlayer(props: VideoPlayerProps): JSX.Element {
  const {width, height, poster, src} = props;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect((): UseEffectType => {
    if (videoRef.current === null) {
      return;
    }

    const timeoutId = setTimeout(() => (videoRef.current as HTMLVideoElement).play(), VIDEO_DELAY_TIME);

    return () => clearTimeout(timeoutId);
  });

  return (
    <video
      width={width}
      height={height}
      src={src}
      poster={poster}
      ref={videoRef}
      muted
    />
  );
}

export default VideoPlayer;
