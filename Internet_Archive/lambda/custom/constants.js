"use strict";

module.exports = Object.freeze({

    // App-ID. TODO: set to your own Skill App ID from the developer portal.
    appId: 'amzn1.ask.skill.fc01cf61-ad69-483f-a8ef-c94ff434a459',

    //  DynamoDB Table name
    dynamoDBTableName: 'InternetArchive',
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
    DASHBOT_API_KEY:"DASHBOT_API_KEY_GOES_HERE"
});
