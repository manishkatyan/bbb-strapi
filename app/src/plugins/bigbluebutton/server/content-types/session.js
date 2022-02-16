module.exports = {
    info: {
        tableName: 'session',
        singularName: 'session', // kebab-case mandatory
        pluralName: 'sessions', // kebab-case mandatory
        displayName: 'Session',
        description: 'Session',
        kind: 'collectionType',
    },
    options: {
        draftAndPublish: false,
    },
    pluginOptions: {
        'content-manager': {
            visible: true,
        },
        'content-type-builder': {
            visible: true,
        }
    },
    attributes: {
        bbbRecordId: {
            type: 'string',
            min: 1,
            configurable: false,
        },
        isRecorded: {
            type: 'boolean',
            configurable: false,
            default: false

        },
        isRecordingAvailable: {
            type: 'boolean',
            configurable: false,
            default: false
        },
        isAnalyticsAvailabe: {
            "type": "boolean",
            configurable: false,
            "default": false
        },
        class: {
            "type": "relation",
            "relation": "manyToOne",
            "target": "plugin::bigbluebutton.class",
            "inversedBy": "sessions"
        }
    }
};