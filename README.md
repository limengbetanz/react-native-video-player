# @limengbeta/react-native-video-player

A NPM package of video player for React Native projects

---

**How to install:** `npm install @limengbeta/react-native-video-player`

---

**Introduction:**

**_RNTVideoPlayerView_**: an UI component for playing video

**_RNTVideoPlayerControl_**: an object for video control. It provides 3 methods:

-   load
-   play
-   pause

**_RNTVideoPlayerEventEmitter_**: an event emitter which sends **_onVideoPlayerError_** error when there is something wrong with playback.

---

**Usage:**

```typescript
import React, { useRef, useEffect, useState } from "react";
import {
    findNodeHandle,
    Button,
    View,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";

import {
    RNTVideoPlayerView,
    RNTVideoPlayerControl,
    RNTVideoPlayerEventEmitter,
} from "@limengbeta/react-native-video-player";

type Props = {};

const VideoPlayerComponent: React.FC<Props> = () => {
    const videoRef = useRef<any>(null);
    const url =
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    useEffect(() => {
        const subscription = RNTVideoPlayerEventEmitter.addListener(
            "onVideoPlayerError",
            (error) => {
                Alert.alert("Error", `${error.code}: ${error.message}`);
            }
        );

        return () => {
            subscription.remove();
        };
    }, []);

    const loadVideo = () => {
        const node = findNodeHandle(videoRef.current);
        RNTVideoPlayerControl.load(node, url)
            .then(() => {})
            .catch((error: any) => {
                Alert.alert("Error", `${error.code}: ${error.message}`);
            });
    };

    const playVideo = () => {
        const node = findNodeHandle(videoRef.current);
        RNTVideoPlayerControl.play(node);
    };

    const pauseVideo = () => {
        const node = findNodeHandle(videoRef.current);
        RNTVideoPlayerControl.pause(node);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <RNTVideoPlayerView ref={videoRef} style={styles.videoPlayer} />
                <View style={styles.controls}>
                    <Button title="Load" onPress={loadVideo} />
                    <Button title="Play" onPress={playVideo} />
                    <Button title="Pause" onPress={pauseVideo} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "flex-start",
    },

    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        paddingTop: 20,
    },

    videoPlayer: {
        marginTop: 20,
        backgroundColor: "black",
        width: 320,
        height: 180,
    },

    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        marginTop: 20,
    },
});

export default VideoPlayerComponent;
```
