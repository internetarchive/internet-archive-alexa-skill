"use strict";

module.exports = Object.freeze({

    // App-ID. TODO: set to your own Skill App ID from the developer portal.
    appId: 'amzn1.ask.skill.6e2850ce-f00f-4870-914e-0b7b5cbceef6',

    //  DynamoDB Table name
    dynamoDBTableName: 'LongFormAudioArchive',
    states: {
        START_MODE: '',
        PLAY_MODE: '_PLAY_MODE',
        RESUME_DECISION_MODE: '_RESUME_DECISION_MODE'
    },
    debug: true,
    host: 'web.archive.org',
    podcastAPIURL: "/advancedsearch.php?q=collection:",
    podcastCityAPIURL: "/advancedsearch.php?q=collection:",
    podcastAPIURLNEW: "/advancedsearch.php?q=",
    SeventyEightsAPIURL: "/advancedsearch.php?q=collection:(georgeblood)+AND+subject:",
    APIURLIdentifier: "/metadata/",
    DASHBOT_API_KEY: "GaYoJFgXfA3OvRCtTdwO3DTJKW45wJE9BqskMfCa"
});
