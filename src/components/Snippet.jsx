const Snippet = () => {
    let line = `
    <div id="playerDiv"></div>
    <script src="https://demo.nanocosmos.de/nanoplayer/api/release/nanoplayer.4.min.js"></script>
    <script>
    let player;
    const streamNames = ['HX26g-NRbx9', 'HX26g-uVn3M', 'HX26g-VbAxm'];
    let config = {
        "source": {
            "defaults": {
                "service": "bintu"
            },
            "entries": [
                {
                    "index": 0,
                    "label": "stream 1",
                    "h5live": {
                        "rtmp": {
                            "streamname": streamNames[0]
                        }
                    }
                },
                {
                    "index": 1,
                    "label": "stream 2",
                    "h5live": {
                        "rtmp": {
                            "streamname": streamNames[1]
                        }
                    }
                },
                {
                    "index": 2,
                    "label": "stream 3",
                    "h5live": {
                        "rtmp": {
                            "streamname": streamNames[2]
                        }
                    }
                }
            ],
            "options": {
                "adaption": {
                    "rule": "deviationOfMean2"
                }
            },
            "startIndex": 2
        },
        "playback": {
            "autoplay": true,
            "automute": true,
            "muted": true,
            "latencyControlMode": "classic"
        },
        "style": {
            "displayMutedAutoplay": true,
            "width": "auto",
            "height": "auto"
        }
    };
    `;
    line += 'document.addEventListener(\'DOMContentLoaded\', function () {\r\n';
    line += '    player = new NanoPlayer(\'playerDiv\');\r\n';
    line += '    player.setup(config).then(\r\n';
    line += '        function (config) {\r\n';
    line += '            console.log(\'setup success\');\r\n';
    line += '        },\r\n';
    line += '        (error) => {\r\n';
    line += '            alert(error.message);\r\n';
    line += '        }\r\n';
    line += '    );\r\n';
    line += '});\r\n';
    line += '</script>';
    return line;
};

export default Snippet;
