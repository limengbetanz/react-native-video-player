import {
  requireNativeComponent,
  NativeModules,
  NativeEventEmitter,
  UIManager,
  Platform,
} from 'react-native';

const LINKING_ERROR =
  `The package '@limengbeta/react-native-video-player' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ios: "- You have run 'pod install'\n", default: ''}) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const RNTVideoPlayerView =
  UIManager.getViewManagerConfig('VideoPlayer') != null
    ? requireNativeComponent('VideoPlayer')
    : () => {
        throw new Error(LINKING_ERROR);
      };

const {VideoPlayerManager, VideoPlayerEventEmitter} = NativeModules;

if (!VideoPlayerManager || !VideoPlayerEventEmitter) {
  throw new Error(LINKING_ERROR);
}

const RNTVideoPlayerEventEmitter = new NativeEventEmitter(
  VideoPlayerEventEmitter,
);

const load = (node: number, url: string) => {
  return new Promise((resolve, reject) => {
    VideoPlayerManager.load(node, url).then(resolve).catch(reject);
  });
};

const play = (node: number) => {
  VideoPlayerManager.play(node);
};

const pause = (node: number) => {
  VideoPlayerManager.pause(node);
};

const RNTVideoPlayerControl = {
  load,
  play,
  pause,
};

export {RNTVideoPlayerView, RNTVideoPlayerControl, RNTVideoPlayerEventEmitter};
