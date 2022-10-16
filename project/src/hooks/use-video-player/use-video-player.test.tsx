import {act, render, renderHook} from '@testing-library/react';
import {useVideoPlayer} from './use-video-player';

describe('Hook: useVideoPlayer', () => {
  it('should return array with 3 elements', () => {
    const {result} = renderHook(
      () => useVideoPlayer()
    );

    const [
      isPlaying,
      handlePlayButton,
      handleFullScreenButton,
      currentProgress,
      filmDuration,
      videoRef
    ] = result.current;

    expect(result.current).toHaveLength(6);
    expect(typeof isPlaying === 'boolean').toBe(true);
    expect(typeof currentProgress === 'number').toBe(true);
    expect(typeof filmDuration === 'string').toBe(true);
    expect(handlePlayButton).toBeInstanceOf(Function);
    expect(handleFullScreenButton).toBeInstanceOf(Function);
    expect(videoRef).toBeInstanceOf(Object);
  });

  it('should be correctly change "isPlaying" when button "play/pause" clicked', () => {
    const {result} = renderHook(
      () => useVideoPlayer()
    );

    const [initialPlayingStatus, , , , , videoRef] = result.current;
    let [, handlePlayButton] = result.current;

    render(
      <video ref={videoRef} data-testid="video"></video>
    );

    const play = jest.spyOn(HTMLVideoElement.prototype, 'play').mockImplementation(jest.fn());
    const pause = jest.spyOn(HTMLVideoElement.prototype, 'pause').mockImplementation(jest.fn());

    act(() => handlePlayButton());

    let [isPlaying] = result.current;

    expect(initialPlayingStatus).toBe(false);
    expect(play).toHaveBeenCalled();
    expect(isPlaying).toBe(true);

    [, handlePlayButton] = result.current;

    act(() => handlePlayButton());

    [isPlaying] = result.current;

    expect(pause).toHaveBeenCalled();
    expect(isPlaying).toBe(false);
  });
});
