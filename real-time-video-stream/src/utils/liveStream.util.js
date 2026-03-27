import NodeMediaServer from "node-media-server";
import { path as ffmpeg } from '@ffmpeg-installer/ffmpeg';

export const runNodeMediaServer = (startTime, appName) => {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            const nodeMediaServerConfig = {
                rtmp: {
                    port: 1935,
                    chunk_size: 60000,
                    gop_cache: true,
                    ping: 30,
                    ping_timeout: 60
                },
                http: {
                    port: 8000,
                    webroot: './public',
                    mediaroot: './media',
                    allow_origin: '*'
                },
                trans: {
                    ffmpeg,
                    tasks: [
                        {
                            app: appName,
                            hls: true,
                            hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
                            hlsKeep: true,
                            // dash: true,
                            // dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
                            // dashKeep: true,
                            rtmp: true,
                            rtmpApp: `${appName}2`
                        }
                    ]
                }
            };
            try {
                const nodeMediaServer = new NodeMediaServer(nodeMediaServerConfig);
                nodeMediaServer.run();
                resolve(nodeMediaServer);
            } catch (error) {
                reject(error);
            }
        }, startTime);
    });
};

export const stopNodeMediaServer = (nodeMediaServer, endTime) => {
    setTimeout(() => {
        try {
            nodeMediaServer.stop();
        } catch (error) {
            
        }
    }, endTime);
}