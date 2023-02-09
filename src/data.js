const Data = [
    [
        {
            'source': {
                'group': {
                    'id'           : '6144a573-d337-4e7c-a7bb-845e08e5f962',
                    'apiurl'       : 'https://bintu-dev-k8s.nanocosmos.de',
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
