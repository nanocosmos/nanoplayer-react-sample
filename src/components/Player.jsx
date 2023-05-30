import React, { useEffect } from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import RotateLeftSharpIcon from '@mui/icons-material/RotateLeftSharp';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import { ToastContainer, toast } from 'react-toastify';
import Snippet from './Snippet';
import Data from '../data';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import {
    Container,
    Wrapper,
    Info,
    InfoLeft,
    InfoRight,
    Title,
    TitleSpan,
    VideoWrapper,
    WrapVideo,
    Video,
    QualityWrapper,
    Quality,
    Stat,
    ControlWrapper,
    ControlLeft,
    ControlRight,
    Button,
    Input,
    CodeWrapper,
    Code,
    Log,
    Featured,
    FeaturedItem,
    FeaturedTitle,
    FeaturedName,
    Hr,
    SwitchControl,
    StreamItem,
    Version,
    Statistics,
    StatLeft,
    StatRight,
    ToggleBotton,
    Entries,
    EntTitle,
    LabelSwitch,
    Slide,
    EntRadio,
    LatencyTitle,
    LatLabel,
    LatRadio
} from './style';

function Player() {
    let player;
    const buffering = {
        'start' : 0,
        'end'   : 0
    };
    let defaultConfig;
    let config = Data[0][0];

    config.events.onMute = function onMute(e) {
        document.getElementById('unmute').style.display = '';
        document.getElementById('mute').style.display = 'none';
        const data = JSON.stringify(e.data);
        log(` onMute:${data} \n \n`);
    };
    config.events.onUnmute = function onUnmute(e) {
        document.getElementById('unmute').style.display = 'none';
        document.getElementById('mute').style.display = '';
        const data = JSON.stringify(e.data);
        log(` onUnmute:${data} \n \n`);
    };
    config.events.onVolumeChange = function onVolumeChange(event) {
        console.log(`Volume: ${event.data.volume}`);
        const data = JSON.stringify(event.data);
        log(` onVolumeChange:${data} \n \n`);
    };
    config.events.onDestroy = function onDestroy(e) {
        document.getElementById('status').innerText = 'destroy';
        const data = JSON.stringify(e.data);
        log(` onDestroy:${data} \n \n`);
    };
    config.events.onReady = function onReady(e) {
        document.getElementById('status').innerText = 'ready';
        config = e.data.config;
        const { source } = config;
        updateStreamQualityWrapper(source.entries[+source.startIndex]);
        const data = JSON.stringify(e.data);
        log(` onReady:${data} \n \n`);
    };
    config.events.onSwitchStreamInit = function onSwitchStreamInit(e) {
        handleSwitchStreamInit(e);
        if (e.data.rule !== 'none') {
            document.getElementById('automatic').checked = true;
        }
        const data = JSON.stringify(e.data);
        log(` onSwitchStreamInit:${data} \n \n`);
    };
    config.events.onStreamInfoUpdate = function onStreamInfoUpdate(e) {
        const data = JSON.stringify(e.data);
        log(` onStreamInfoUpdate:${data} \n \n`);
    };

    config.events.onStreamInfo = function onStreamInfo(event) {
        const data = JSON.stringify(event.data.streamInfo);
        log(` onStreamInfo:${data} \n \n`);
    };
    config.events.onSwitchStreamSuccess = function onSwitchStreamSuccess(event) {
        const data = JSON.stringify(event.data);
        log(` onSwitchStreamSuccess:${data} \n \n`);
        if (event.data.rule !== 'none') {
            document.getElementById('automatic').checked = true;
        }
    };
    config.events.onServerInfo = function onServerInfo(event) {
        const data = JSON.stringify(event.data.serverInfo);
        log(` onServerInfo:${data} \n \n`);
    };
    config.events.onPlay = function onPlay(e) {
        document.getElementById('status').innerText = 'playing';
        document.getElementById('pause').style.display = '';
        document.getElementById('play').style.display = 'none';
        const data = JSON.stringify(e.data);
        log(` onPlay:${data} \n \n`);
    };
    config.events.onPause = function onPause(e) {
        const reason = e.data.reason !== 'normal' ? ' ($reason$)'.replace('$reason$', e.data.reason) : '';
        document.getElementById('status').innerText = `paused${reason}`;
        document.getElementById('pause').style.display = 'none';
        document.getElementById('play').style.display = '';
        const data = JSON.stringify(e.data);
        log(` onPause:${data} \n \n`);
    };
    config.events.onLoading = function onLoading(e) {
        document.getElementById('status').innerText = 'loading';
        document.getElementById('play').style.display = 'none';
        document.getElementById('pause').style.display = '';
        const data = JSON.stringify(e.data);
        log(` onLoading:${data} \n \n`);
    };
    config.events.onStartBuffering = function onStartBuffering(e) {
        buffering.start = new Date();
        setTimeout(() => {
            if (buffering.start) {
                document.getElementById('status').innerText = 'buffering';
            }
        }, 2000);
        const data = JSON.stringify(e.data);
        log(` onStartBuffering:${data} \n \n`);
    };
    config.events.onStopBuffering = function onStopBuffering(e) {
        buffering.stop = new Date();
        if (buffering.start) {
            const duration = Math.abs(buffering.stop - buffering.start);
            if (duration > 1000) {
                toast(`buffering ${duration}ms`);
            }
            buffering.stop = 0;
            buffering.start = 0;
        }
        document.getElementById('status').innerText = 'playing';
        const data = JSON.stringify(e.data);
        log(` onStopBuffering:${data} \n \n`);
    };

    config.events.onStats = function onStats(event) {
        const playLatency = event.data.stats.buffer.delay.avg.toFixed(2);
        document.getElementById('statplayLatency').textContent = `${`
                    ${playLatency}/${event.data.stats.buffer.delay.min.toFixed(2)}/
                    ${event.data.stats.buffer.delay.max.toFixed(2)}/
                    ${event.data.stats.buffer.delay.deviation.toFixed(2)}
                `}`;
        document.getElementById('playLatency').textContent = `${event.data.stats.buffer.delay.avg.toFixed(2)}s`;

        document.getElementById('statcurrentTime').innerHTML = event.data.stats.currentTime.toFixed(2);

        document.getElementById('statplayTime').innerHTML = `${`
                    ${event.data.stats.playout.start.toFixed(2)}/
                    ${event.data.stats.playout.end.toFixed(2)}
                `}`;

        document.getElementById('statbufferTime').innerHTML = `${`
                    ${event.data.stats.buffer.start.toFixed(2)}/
                    ${event.data.stats.buffer.end.toFixed(2)}
                `}`;

        if (event.data.stats.bitrate) {
            document.getElementById('statbitrate').innerHTML = `${`
                    ${Math.round(event.data.stats.bitrate.avg / 1000)} kBps`}/
                    ${`${Math.round(event.data.stats.bitrate.min / 1000)} kBps`}/
                    ${`${Math.round(event.data.stats.bitrate.max / 1000)} kBps`}/
                    ${`${Math.round(event.data.stats.bitrate.deviation / 1000)} kBps
                    `}`;
            document.getElementById('bitrate').innerHTML = `${`
                    ${Math.round(event.data.stats.bitrate.avg / 1000)} kBps`}`;
        }

        if (event.data.stats.framerate) {
            document.getElementById('statframerate').innerHTML = `${`
                    ${event.data.stats.framerate.current}/
                    ${`${Math.round(event.data.stats.framerate.avg)} fps`}/
                    ${`${Math.round(event.data.stats.framerate.min)} fps`}/
                    ${`${Math.round(event.data.stats.framerate.max)} fps`}/
                    ${`${Math.round(event.data.stats.framerate.deviation)} fps`}
                    `}`;
            document.getElementById('framerate').innerHTML = `${`${Math.round(event.data.stats.framerate.avg)} fps`}`;
        }

        if (
            event.data.stats.adaptive &&
            (event.data.stats.adaptive.deviationOfMean || event.data.stats.adaptive.deviationOfMean2) &&
            document.getElementById('adaptiveBufferTimeDelayDeviation')
        ) {
            document.getElementById('adaptiveBufferTimeDelayDeviation').textContent = event.data.stats.adaptive
                .deviationOfMean
                ? event.data.stats.adaptive.deviationOfMean.buffer.delay.deviation.toFixed(2)
                : event.data.stats.adaptive.deviationOfMean2.buffer.delay.deviation.toFixed(2);
        }
    };

    function initPlayer() {
        player = new window.NanoPlayer('playerDiv');
        const playerVersion = player.version;
        document.getElementById('demo-version').innerText = `Version ${playerVersion}`;
        player.on('StreamInfo', (e) => {
            const { streamname } = e.data.streamInfo.rtmp;
            console.log(streamname);
            updateStreamQualityWrapper(e.data.streamInfo);
        });
        defaultConfig = deepCopy(config);
        startPlayer();
    }

    function pause() {
        if (!player) {
            return;
        }
        try {
            player.pause();
        }
        catch (error) {
            console.log(error);
        }
    }

    function play() {
        if (!player) {
            return;
        }
        try {
            player.play();
        }
        catch (error) {
            console.log(error);
        }
    }

    function unMute() {
        if (!player) {
            return;
        }
        try {
            player.unmute();
        }
        catch (error) {
            console.log(error);
        }
    }

    function mute() {
        if (!player) {
            return;
        }
        try {
            player.mute();
        }
        catch (error) {
            console.log(error);
        }
    }

    function fullScreen() {
        if (!player) {
            return;
        }
        player
            .requestFullscreen()
            .then(() => {
                console.log('requestFullscreen resolved');
            })
            .catch((err) => {
                console.log(`requestFullscreen rejected: ${err.reason}`);
            });
    }

    function setVolume(e, value) {
        if (!player) {
            return;
        }
        if (value < 0) {
            value = 0;
        }
        else if (value > 100) {
            value = 100;
        }
        const volume = value / 100;
        player.setVolume(volume);
    }

    function setRule(useAdaption) {
        const adaption = {
            'rule': 'none'
        };
        if (useAdaption === 'deviationOfMean') {
            adaption.rule = 'deviationOfMean';
        }
        if (useAdaption === 'deviationOfMean2') {
            adaption.rule = 'deviationOfMean2';
        }
        player.setAdaption(adaption);
    }

    function getCurrentQualityIndex(streamname) {
        let currentQualityIndex = 0;
        if (config.source.entries) {
            const { entries } = config.source;
            for (let i = 0; i < entries.length; i++) {
                if (entries[i].h5live.rtmp.streamname === streamname) {
                    currentQualityIndex = i;
                    break;
                }
            }
        }
        return currentQualityIndex;
    }

    function handleSwitchStreamInit(e) {
        const { rule } = e.data.rule;
        if (rule !== 'none') {
            document.querySelector('#automatic').checked = false;
        }
        else {
            document.querySelector('#automatic').checked = true;
        }
    }

    function ruleSwitch() {
        const cb = document.querySelector('#automatic');
        const rules = config.source.options.adaption.rule;
        if (cb.checked === true) {
            if(rules !== 'none') {
                setRule(rules);
            }
        }
        else {
            setRule('none');
        }
    }

    function removeAllChildNodes(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function deepCopy(obj) {
        const { toString } = Object.prototype;
        let rv;
        switch (typeof obj) {
            case 'object':
                if (obj === null) {
                    // null => null
                    rv = null;
                }
                else {
                    switch (toString.call(obj)) {
                        case '[object Array]':
                            // It's an array, create a new array with
                            // deep copies of the entries
                            rv = obj.map(deepCopy);
                            break;
                        case '[object Date]':
                            // Clone the date
                            rv = new Date(obj);
                            break;
                        case '[object RegExp]':
                            // Clone the RegExp
                            rv = new RegExp(obj);
                            break;
                        // ...probably a few others
                        default:
                            // Some other kind of object, deep-copy its
                            // properties into a new object
                            rv = Object.keys(obj).reduce((prev, key) => {
                                prev[key] = deepCopy(obj[key]);
                                return prev;
                            }, {});
                            break;
                    }
                }
                break;
            default:
                // It's a primitive, copy via assignment
                rv = obj;
                break;
        }
        return rv;
    }

    function updateStreamQualityWrapper(streamInfo) {
        if (config.source.entries) {
            const streams = config.source.entries;
            const qualitiesWrapper = document.getElementById('qualitiesWrapper');
            let currentStreamname;
            if(streamInfo.h5live) {
                currentStreamname = streamInfo.h5live.rtmp.streamname;
            }
            else{
                currentStreamname = streamInfo.rtmp.streamname;
            }
            const currentQualityIndex = getCurrentQualityIndex(currentStreamname);

            removeAllChildNodes(qualitiesWrapper);
            qualitiesWrapper.classList.add('Quality1');

            for (let i = 0; i < streams.length; i++) {
                const qualityWrapper = document.createElement('span');
                const Input1 = document.createElement('input');
                Input1.setAttribute('type', 'radio');
                Input1.setAttribute('name', 'group1');
                Input1.style.cursor = 'pointer';
                Input1.classList.add('inputStyle');
                qualityWrapper.classList.add('qualityWrapper');
                qualityWrapper.appendChild(Input1);

                if (i === currentQualityIndex) {
                    Input1.setAttribute('checked', true);
                    document.getElementById('streamName').innerHTML = streams[i].h5live.rtmp.streamname;
                    // add streamname
                    const labelStreamname = document.createElement('span');
                    if(streams[i].label !== '' && streams[i].label !== undefined) {
                        labelStreamname.innerHTML = streams[i].label;
                    }
                    else{
                        labelStreamname.innerHTML = streams[i].h5live.rtmp.streamname;
                    }
                    labelStreamname.classList.add('StreamList');
                    labelStreamname.classList.add('StreamListactive');
                    qualityWrapper.appendChild(labelStreamname);

                    // add resolution
                    if (streamInfo.videoInfo) {
                        const resolution =
                                    streamInfo.videoInfo.width && streamInfo.videoInfo.height
                                        ? `${streamInfo.videoInfo.width}x${streamInfo.videoInfo.height}`
                                        : 'N/A';
                        document.getElementById('resolution').innerHTML = resolution;
                    }
                }
                else {
                    const labelStreamname = document.createElement('span');
                    if(streams[i].label !== '' && streams[i].label !== undefined) {
                        labelStreamname.innerHTML = streams[i].label;
                    }
                    else{
                        labelStreamname.innerHTML = streams[i].h5live.rtmp.streamname;
                    }
                    labelStreamname.classList.add('StreamList');
                    qualityWrapper.appendChild(labelStreamname);
                }
                qualityWrapper.addEventListener(
                    'click',
                    ((index) => {
                        if (player) {
                            player.switchStream(index).then(
                                (_config) => {
                                    console.log('switchStream initialized', _config);
                                },
                                (_err) => {
                                    console.log(`switchStream aborted with error ${_err.code}: ${_err.message}`);
                                }
                            );
                        }
                    }).bind(null, i)
                );
                qualitiesWrapper.appendChild(qualityWrapper);
            }
        }
    }

    function startPlayer(_config) {
        if (!player) {
            return;
        }
        if (_config) {
            config = _config;
        }
        player.setup(config).then(
            (conf) => {
                setVolume(null, document.getElementById('faderVolume').value);
                const latency = document.querySelector(`input[value="${conf.playback.latencyControlMode}"]`);
                latency.setAttribute('checked', true);
                try {
                    conf = JSON.stringify(conf);
                }
                catch (err) {}
                toast('setup ok');
                console.log(`setup ok: ${conf}`);
            },
            (error) => {
                if (error.message) {
                    error = error.message;
                }
                else {
                    try {
                        let err = JSON.stringify(error);
                        if (err === '{}') {
                            err = error.message;
                        }
                        error = err;
                    }
                    catch (err) {}
                }
                console.log(`Setup Error: ${error}`);
            }
        );
    }

    function onLatencyControlMode(value) {
        config.playback.latencyControlMode = value;
        startPlayer();
    }

    function toggle() {
        const x = document.getElementById('toggle');
        if (x.style.display === 'none') {
            x.style.display = 'block';
            document.getElementById('toggleButton').innerText = 'Hide More Statistics';
        }
        else {
            x.style.display = 'none';
            document.getElementById('toggleButton').innerText = 'Show More Statistics';
        }
    }

    function log(event) {
        const currentTime = new Date().toLocaleTimeString();
        const text = currentTime + event;
        const newNode = document.createElement('span');
        const textNode = document.createTextNode(text);
        newNode.appendChild(textNode);
        const list = document.getElementById('log');
        list.insertBefore(newNode, list.children[0]);
    }

    useEffect(() => {
        initPlayer();
    }, []);

    return (
        <Container>
            <Wrapper>
                <Info>
                    <InfoLeft>
                        <Title>nanoStream H5Live Player</Title>
                        <TitleSpan>Interactive Live Streaming</TitleSpan>
                    </InfoLeft>
                    <InfoRight />
                </Info>
                <VideoWrapper>
                    <WrapVideo>
                        <Video id="playerDiv" />
                        <ControlWrapper>
                            <ControlLeft>
                                <Button onClick={play} id="play" margin="0.7em">
                                    <PlayArrowIcon />
                                </Button>
                                <Button onClick={pause} id="pause" margin="0.7em">
                                    <PauseIcon />
                                </Button>
                                <Button onClick={unMute} id="unmute" margin="0.7em" style={{ 'display': '' }}>
                                    <VolumeOffIcon />
                                </Button>
                                <Button onClick={mute} id="mute" margin="0.7em" style={{ 'display': 'none' }}>
                                    <VolumeUpIcon />
                                </Button>
                                <Input
                                    onInput={(e) => setVolume(null, e.target.value)}
                                    onChange={(e) => setVolume(null, e.target.value)}
                                    type="range"
                                    min="0"
                                    max="100"
                                    id="faderVolume"
                                />
                            </ControlLeft>
                            <ControlRight>
                                <Button margin="0.7em" onClick={() => startPlayer(defaultConfig)}>
                                    <RotateLeftSharpIcon />
                                </Button>
                                <Button onClick={fullScreen}>
                                    <FullscreenIcon />
                                </Button>
                            </ControlRight>
                        </ControlWrapper>
                        <Version id="demo-version" />
                    </WrapVideo>
                    <QualityWrapper>
                        <Stat>
                            <Featured>
                                <FeaturedItem>
                                    <VideoSettingsIcon />
                                    <FeaturedName id="status">Playing</FeaturedName>
                                    <Hr />
                                    <FeaturedTitle>Player State</FeaturedTitle>
                                </FeaturedItem>
                                <FeaturedItem>
                                    <CenterFocusWeakIcon />
                                    <FeaturedName id="streamName">Stream-XYZ</FeaturedName>
                                    <Hr />
                                    <FeaturedTitle>Current Stream</FeaturedTitle>
                                </FeaturedItem>
                                <FeaturedItem>
                                    <AspectRatioIcon />
                                    <FeaturedName id="resolution">000x000</FeaturedName>
                                    <Hr />
                                    <FeaturedTitle>Resolution</FeaturedTitle>
                                </FeaturedItem>
                                <FeaturedItem>
                                    <NetworkCheckIcon />
                                    <FeaturedName id="playLatency">0.00s</FeaturedName>
                                    <Hr />
                                    <FeaturedTitle>Play Latency</FeaturedTitle>
                                </FeaturedItem>
                                <FeaturedItem>
                                    <AutoAwesomeMotionIcon />
                                    <FeaturedName id="framerate">0.00fps</FeaturedName>
                                    <Hr />
                                    <FeaturedTitle>Framerate</FeaturedTitle>
                                </FeaturedItem>
                                <FeaturedItem>
                                    <GraphicEqIcon />
                                    <FeaturedName id="bitrate">0.000kbps</FeaturedName>
                                    <Hr />
                                    <FeaturedTitle>Bitrate</FeaturedTitle>
                                </FeaturedItem>
                            </Featured>
                        </Stat>

                        <Quality>
                            <Entries>
                                <EntTitle>Auto Quality</EntTitle>
                                <LabelSwitch>
                                    <EntRadio
                                        type="checkbox"
                                        name="variationType"
                                        value=""
                                        id="automatic"
                                        onClick={ruleSwitch}
                                    />
                                    <Slide />
                                </LabelSwitch>
                            </Entries>
                        </Quality>

                        <Hr />
                        <h2 style={{ 'marginLeft': '10px', 'fontSize': '15px' }}>Switch Stream</h2>
                        <Quality margin="5px">
                            <div id="qualitiesWrapper" />
                        </Quality>

                        <Hr />
                        <h2 style={{ 'marginLeft': '10px', 'fontSize': '15px' }}>Latency Control Mode</h2>
                        <SwitchControl margin="5px">
                            <Entries>
                                <LatLabel>
                                    <LatRadio
                                        type="radio"
                                        name="latencyControl"
                                        id="latencyControl"
                                        value="classic"
                                        onChange={(e) => onLatencyControlMode(e.target.value)}
                                    />
                                </LatLabel>
                                <LatencyTitle>classic</LatencyTitle>
                            </Entries>
                            <Entries>
                                <LatLabel>
                                    <LatRadio
                                        type="radio"
                                        value="balancedadaptive"
                                        id="latencyControl"
                                        name="latencyControl"
                                        onChange={(e) => onLatencyControlMode(e.target.value)}
                                    />
                                </LatLabel>
                                <LatencyTitle>balancedadaptive</LatencyTitle>
                            </Entries>
                            <Entries>
                                <LatLabel>
                                    <LatRadio
                                        type="radio"
                                        value="fastadaptive"
                                        id="latencyControl"
                                        name="latencyControl"
                                        onChange={(e) => onLatencyControlMode(e.target.value)}
                                    />
                                </LatLabel>
                                <LatencyTitle>fastadaptive</LatencyTitle>
                            </Entries>
                        </SwitchControl>
                        <Hr />
                        <Stat margin="5px">
                            <ToggleBotton onClick={toggle} style={{ 'fontSize': '11px' }} id="toggleButton">
                                Show More Statistics
                            </ToggleBotton>
                            <StreamItem id="toggle" style={{ 'display': 'none' }}>
                                <Statistics>
                                    <StatLeft>play latency(avg/min/max/dev)</StatLeft>
                                    <StatRight id="statplayLatency">0.0</StatRight>
                                </Statistics>
                                <Statistics>
                                    <StatLeft>current time</StatLeft>
                                    <StatRight id="statcurrentTime">0.0</StatRight>
                                </Statistics>
                                <Statistics>
                                    <StatLeft>play time(start/end)</StatLeft>
                                    <StatRight id="statplayTime">0.0/0.0</StatRight>
                                </Statistics>
                                <Statistics>
                                    <StatLeft>buffer time(start/end)</StatLeft>
                                    <StatRight id="statbufferTime">0.0/0.0</StatRight>
                                </Statistics>
                                <Statistics>
                                    <StatLeft>bitrate(avg/min/max/dev)</StatLeft>
                                    <StatRight id="statbitrate">0.0/0.0/0.0/0.0</StatRight>
                                </Statistics>
                                <Statistics>
                                    <StatLeft>framerate(current/avg/min/max/dev)</StatLeft>
                                    <StatRight id="statframerate">0.0/0.0/0.0/0.0</StatRight>
                                </Statistics>
                                <Statistics>
                                    <StatLeft>deviationOfMean(dev)</StatLeft>
                                    <StatRight id="adaptiveBufferTimeDelayDeviation">0.0</StatRight>
                                </Statistics>
                            </StreamItem>
                        </Stat>
                    </QualityWrapper>
                </VideoWrapper>
                <CodeWrapper>
                    <Code>
                        <Snippet />
                    </Code>
                    <Log id='log'>
                        <Hr style={{ 'border': '1px dotted #ebebeb' }} />
                    </Log>
                </CodeWrapper>
            </Wrapper>
            <ToastContainer />
        </Container>
    );
}

export default Player;
