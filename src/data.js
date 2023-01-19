const streamNames = ['HX26g-NRbx9', 'HX26g-uVn3M', 'HX26g-VbAxm'];
const Data = [
    [
        {
            'source': {
                'defaults': {
                    'service': 'bintu'
                },
                'entries': [
                    {
                        'index'  : 0,
                        'label'  : 'High',
                        'h5live' : {
                            'rtmp': {
                                'streamname': streamNames[0]
                            }
                        }
                    },
                    {
                        'index'  : 1,
                        'label'  : 'Medium',
                        'h5live' : {
                            'rtmp': {
                                'streamname': streamNames[1]
                            }
                        }
                    },
                    {
                        'index'  : 2,
                        'label'  : 'Low',
                        'h5live' : {
                            'rtmp': {
                                'streamname': streamNames[2]
                            }
                        }
                    }
                ],
                'options': {
                    'adaption': {
                        'rule': 'deviationOfMean2'
                    },
                    'switch': {
                        'method'       : 'server',
                        'pauseOnError' : false,
                        'forcePlay'    : true,
                        'fastStart'    : false,
                        'timeout'      : 10
                    }
                },
                'startIndex': 2
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
            'events': {
                'onMute': true
            }
        }
    ]
];
export default Data;
