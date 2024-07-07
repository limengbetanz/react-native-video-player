//
//  index.js
//  @limengbeta/react-native-video-player
//
//  Created by Terry Li on 07/07/2024.
//

import { NativeModules, NativeEventEmitter } from "react-native";

const { VideoPlayerManager, VideoPlayerEventEmitter } = NativeModules;

const eventEmitter = new NativeEventEmitter(VideoPlayerEventEmitter);

const load = (node, url) => {
    return new Promise((resolve, reject) => {
        VideoPlayerManager.load(node, url).then(resolve).catch(reject);
    });
};

const play = (node) => {
    VideoPlayerManager.play(node);
};

const pause = (node) => {
    VideoPlayerManager.pause(node);
};

export { VideoPlayerManager, load, play, pause, eventEmitter };
