const Data = [
    [
        {
            'source': {
                'group': {
                    'id'           : '457689d7-d0c1-45b6-8824-1ba7a02a9c51',
                    'apiurl'       : 'https://bintu.nanocosmos.de',
                    'startQuality' : 'medium-low'
                },
                'startIndex' : 0,
                'options'    : {
                    'adaption': {
                        'rule': 'deviationOfMean2' // enable ABR
                    },
                    'switch': {
                        'method'       : 'server',
                        'pauseOnError' : false,
                        'forcePlay'    : true,
                        'fastStart'    : false,
                        'timeout'      : 10,
                    }
                },
            },
            'playback': {
                'autoplay'           : true,
                'automute'           : true,
                'muted'              : true,
                'latencyControlMode' : 'classic'
            },
            'style': {
                'displayMutedAutoplay' : true,
                'width'                : 'auto',
                'height'               : 'auto'
            },
            'events': {}
        }
    ]
];
export default Data;
