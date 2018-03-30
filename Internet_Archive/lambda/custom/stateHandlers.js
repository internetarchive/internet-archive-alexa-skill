'use strict';

var Alexa = require('alexa-sdk');
var functions = require('./functions');
var constants = require('./constants');

var stateHandlers = {
    startModeIntentHandlers: Alexa.CreateStateHandler(constants.states.START_MODE, {
        /*
         *  All Intent Handlers for state : START_MODE
         */
        'LaunchRequest': function () {
            // Initialize Attributes
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            functions.userData[userId][deviceId]['IdentifierSongsCount'] = 0;
            functions.userData[userId][deviceId]['IdentifierSongsCountTotal'] = 0;
            functions.userData[userId][deviceId]['page'] = 1;

            functions.userData[userId][deviceId]['IdentifierCount'] = 0;
            functions.userData[userId][deviceId]['counter'] = 0;
            functions.userData[userId][deviceId]['year'] = null;
            functions.userData[userId][deviceId]['city'] = null;
            functions.userData[userId][deviceId]['typeQuery'] = true;
            functions.userData[userId][deviceId]['searchBYTitle'] = false;
            functions.userData[userId][deviceId]['PlayAudioByRandomYear'] = false;
            functions.userData[userId][deviceId]['PlayAudioByRandomCity'] = false;
            functions.userData[userId][deviceId]['PlayAudioByRandom'] = false;
            functions.userData[userId][deviceId]['CityName'] = 'Los Angeles';
            functions.userData[userId][deviceId]['YearName'] = 'YearName';
            functions.userData[userId][deviceId]['used'] = false;
            functions.userData[userId][deviceId]['collection'] = null;
            functions.userData[userId][deviceId]['collectionQuery'] = null;
            functions.userData[userId][deviceId]['title'] = null;
            functions.userData[userId][deviceId]['APIURL'] = null;
            functions.userData[userId][deviceId]['APIURLIDENTIFIER'] = null;
            functions.userData[userId][deviceId]['topicName'] = null;
            functions.userData[userId][deviceId]['OneGoCollectionRandomPlayAudioStatus'] = false;
            functions.userData[userId][deviceId].lastPlayedByUser = {};

            functions.userData[userId][deviceId]['SeventyEights'] = false;
            functions.userData[userId][deviceId]['OneGoPlayAudioStatus'] = false;
            //  Change state to START_MODE
            this.handler.state = constants.states.START_MODE;
            controller.welcome.call(this);
        },
        'Discovery': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }

            functions.userData[userId][deviceId].SeventyEights = false;
            this.handler.state = constants.states.START_MODE;
            controller.Discovery.call(this);
        },
        'PlayAudio': function () {

            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            controller.play.call(this);
        },
        'SearchCollection': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].lastPlayedByUser = {};
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            controller.getCollection.call(this);
        },
        'PlayAudioByCity': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            controller.play.call(this);
        },
        'PlayAudioByYearCity': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            controller.play.call(this);
        },
        'PlayAudioQuery': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = true;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            controller.play.call(this);
        },
        'PlayAudioByRandomYear': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = true;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            controller.play.call(this);
        },
        'PlayAudioByRandomCity': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = true;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            controller.play.call(this);
        },
        'PlayAudioByRandom': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = true;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            controller.play.call(this);
        },
        'SeventyEights': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = true;
            functions.userData[userId][deviceId]['topicName'] = null;
            functions.userData[userId][deviceId].audioURL = null;
            controller.playSeventyEights.call(this);
        },
        'PlaByTopic': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = true;
            functions.userData[userId][deviceId].audioURL = null;
            controller.playSeventyEights.call(this);
        },
        'OneGoSeventyEights': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].lastPlayedByUser = {};
            functions.userData[userId][deviceId].SeventyEights = true;
            functions.userData[userId][deviceId].audioURL = null;
            controller.playSeventyEights.call(this);
        },
        'OneGoPlayAudio': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].lastPlayedByUser = {};
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId]['OneGoCollectionRandomPlayAudioStatus'] = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = true;
            functions.userData[userId][deviceId].audioURL = null;
            controller.OneGoPlayAudio.call(this);
        },
        'OneGoCollectionRandomPlayAudio': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].lastPlayedByUser = {};
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId]['OneGoCollectionRandomPlayAudioStatus'] = true;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = true;
            functions.userData[userId][deviceId].audioURL = null;
            controller.OneGoPlayAudio.call(this);
        },
        'SongDetail': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
                functions.userData[userId][deviceId].MusicUrlList = [];
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
                functions.userData[userId][deviceId].MusicUrlList = [];
            }
            this.handler.state = constants.states.PLAY_MODE;
            if (functions.userData[userId][deviceId].MusicUrlList.length >= 1) {
                let cardTitle = 'Song Title';
                let cardOutput = "You are listening " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['title'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['coverage'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['year'];
                let speechOutput = "You are listening " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['title'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['coverage'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['year'] + ".";

                this.response.cardRenderer(cardTitle, cardOutput, null);
                this.response.speak(speechOutput);
                this.emit(':responseReady');

            } else {

                let cardTitle = 'Please select collection first.';
                let cardOutput = "No song id Playing now. Please select collection first.";
                let speechOutput = "No song id Playing now. Please select collection first.";
                let repromptText = "No song id Playing now. Please select collection first.";

                this.response.cardRenderer(cardTitle, cardOutput, null);
                this.response.speak(speechOutput).listen(repromptText);
                this.emit(':responseReady');

            }

        },
        'AMAZON.NextIntent': function () {
            controller.playNext.call(this)
        },
        'AMAZON.PreviousIntent': function () {
            controller.playPrev.call(this)
        },
        'AMAZON.PauseIntent': function () {
            this.response.audioPlayerStop();
            this.emit(':responseReady');
        },
        'AMAZON.StopIntent': function () {
            controller.stop.call(this);
        },
        'AMAZON.CancelIntent': function () {
            controller.stop.call(this)
        },
        'AMAZON.ResumeIntent': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId] [deviceId] = {};
                functions.userData[userId][deviceId] = (this.attributes[deviceId] != undefined) ? this.attributes[deviceId] : {};
            }
            if (functions.userData[userId][deviceId].SeventyEights == true) {
                let lastPlayed = loadLastPlayed(userId, deviceId);
                functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
                if (lastPlayed !== null) {
                    functions.userData[userId][deviceId]['offsetInMilliseconds'] = lastPlayed.offsetInMilliseconds;
                }
                controller.playSeventyEights.call(this);
            }
            else {

                let lastPlayed = loadLastPlayed(userId, deviceId);
                functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
                if (lastPlayed !== null) {
                    functions.userData[userId][deviceId]['offsetInMilliseconds'] = lastPlayed.offsetInMilliseconds;
                }
                if (functions.userData[userId][deviceId].OneGoPlayAudioStatus) {
                    controller.OneGoPlayAudio.call(this);
                } else {
                    controller.play.call(this);
                }
            }
        },
        'AMAZON.HelpIntent': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
                functions.userData[userId][deviceId].MusicUrlList = [];
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
                functions.userData[userId][deviceId].MusicUrlList = [];
            }
            // This will called while audio is playing and a user says "ask <invocation_name> for help"
            if (functions.userData[userId][deviceId].MusicUrlList.length >= 1) {
                let response = {
                    version: '1.0',
                    response: {
                        outputSpeech: {
                            type: 'SSML',
                            ssml: "<speak>You are listening " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['title'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['coverage'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['year'] + ".</speak>",
                        },
                        card: {
                            type: 'Simple',
                            title: "Song Title",
                            content: "You are listening " + functions.userData[userId][deviceId].MusicUrlList[counter]['title'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['coverage'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['year'],
                        },
                        reprompt: {
                            outputSpeech: {
                                type: 'SSML',
                                ssml: "<speak>You are listening " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['title'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['coverage'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['year'] + ".</speak>",
                            }
                        },
                        shouldEndSession: true,

                    }
                };
                this.context.succeed(response);
            } else {
                let response = {
                    version: '1.0',
                    response: {
                        outputSpeech: {
                            type: 'SSML',
                            ssml: "<speak>No song id Playing now. Please select collection first.</speak>",
                        },
                        card: {
                            type: 'Simple',
                            title: "Please select collection first.",
                            content: "No song id Playing now. Please select collection first.",
                        },
                        reprompt: {
                            outputSpeech: {
                                type: 'SSML',
                                ssml: "<speak>No song id Playing now. Please select collection first.</speak>",
                            }
                        },
                        shouldEndSession: false,
                    }
                };
                this.context.succeed(response);
            }
        },
        'SessionEndedRequest': function () {
            this.context.succeed();
        },
        'Unhandled': function () {
            let message = 'Sorry, I could not understand. Please say, play the audio, to begin the audio.';
            this.response.speak(message).listen(message);
            this.emit(':responseReady');
        }
    }),
    remoteControllerHandlers: Alexa.CreateStateHandler(constants.states.PLAY_MODE, {
        /*
         *  All Requests are received using a Remote Control. Calling corresponding handlers for each of them.
         */
        'PlayCommandIssued': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            if (functions.userData[userId][deviceId].SeventyEights == true) {
                if (functions.userData[userId][deviceId].IdentifierSongsCountTotal == 0) {
                    let cardTitle = 'Select Topic';
                    let repromptText = "Please Select Topic first.";
                    let cardOutput = "Please Select Topic first.";
                    let speechOutput = "Please Select Topic first.";
                    this.response.cardRenderer(cardTitle, cardOutput, null);
                    this.response.speak(speechOutput).listen(repromptText);
                    this.emit(':responseReady');

                } else {

                    if (functions.userData[userId][deviceId].counter > 0) {
                        functions.userData[userId][deviceId].counter--;
                    }
                    functions.userData[userId][deviceId].IdentifierSongsCount--;
                    if (functions.userData[userId][deviceId].IdentifierSongsCount == -1 && functions.userData[userId][deviceId].page > 0) {
                        functions.userData[userId][deviceId].IdentifierSongsCount = 0;
                        functions.userData[userId][deviceId].page--;
                    } else if (functions.userData[userId][deviceId].IdentifierSongsCount == -1 && functions.userData[userId][deviceId].page == 0) {
                        functions.userData[userId][deviceId].IdentifierSongsCount = 0;
                        functions.userData[userId][deviceId].page = 0;
                    }

                    controller.playSeventyEights.call(this);
                }
            } else {
                if (functions.userData[userId][deviceId].IdentifierSongsCountTotal == 0) {
                    let cardTitle = 'Select City and Yea';
                    let repromptText = "Please Select City and year first.";
                    let cardOutput = "Please Select City and year first.";
                    let speechOutput = "Please Select City and year first.";
                    this.response.cardRenderer(cardTitle, cardOutput, null);
                    this.response.speak(speechOutput).listen(repromptText);
                    this.emit(':responseReady');
                } else {
                    if (functions.userData[userId][deviceId].counter > 0) {
                        functions.userData[userId][deviceId].counter--;
                    }
                    functions.userData[userId][deviceId].IdentifierSongsCount--;
                    if (functions.userData[userId][deviceId].IdentifierSongsCount == -1 && functions.userData[userId][deviceId].page > 0) {
                        functions.userData[userId][deviceId].IdentifierSongsCount = 0;
                        functions.userData[userId][deviceId].page--;
                    } else if (functions.userData[userId][deviceId].IdentifierSongsCount == -1 && functions.userData[userId][deviceId].page == 0) {
                        functions.userData[userId][deviceId].IdentifierSongsCount = 0;
                        functions.userData[userId][deviceId].page = 0;
                    }
                    if (functions.userData[userId][deviceId].OneGoPlayAudioStatus) {

                        controller.OneGoPlayAudio.call(this);
                    } else {
                        controller.play.call(this);
                    }

                }
            }
        },
        'PauseCommandIssued': function () {
            controller.stop.call(this)
        },
        'NextCommandIssued': function () {
            controller.playNext.call(this)
        },
        'PreviousCommandIssued': function () {
            controller.playPrev.call(this)
        }
    }),
    playModeIntentHandlers: Alexa.CreateStateHandler(constants.states.PLAY_MODE, {
        /*
         *  All Intent Handlers for state : PLAY_MODE
         */
        'LaunchRequest': function () {
            // Initialize Attributes
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;

            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
            }

            if (functions.userData[userId][deviceId] == undefined) {
                controller.welcome.call(this);
            } else if (!functions.userData[userId][deviceId].playbackFinished && functions.userData[userId][deviceId].MusicUrlList != undefined) {

                this.handler.state = constants.states.RESUME_DECISION_MODE;
                let message = 'Welcome back. You were listening to ' + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['title'] +
                    ' Would you like to resume?';
                let reprompt = 'You can say yes to resume or no to play from the top.';
                let cardTitle = 'Rest or Resume';
                let cradOutput = 'Welcome back. You were listening to ' + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['title'] +
                    ' Would you like to resume?';
                this.response.cardRenderer(cardTitle, cradOutput, null);
                this.response.speak(message).listen(reprompt);
                this.emit(':responseReady');
            } else {
                controller.welcome.call(this);
            }
        },
        'Discovery': function () {
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].SeventyEights = false;
            controller.Discovery.call(this);
        },
        'PlayAudio': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;

            controller.play.call(this);
        },
        'SearchCollection': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].lastPlayedByUser = {};
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            controller.getCollection.call(this);
        },
        'PlayAudioByCity': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.play.call(this);
        },
        'PlayAudioByYearCity': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.play.call(this);
        },
        'PlayAudioQuery': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = true;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.play.call(this);
        },
        'PlayAudioByRandomYear': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = true;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = true;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.play.call(this);
        },
        'PlayAudioByRandomCity': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = true;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = true;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.play.call(this);
        },
        'PlayAudioByRandom': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = true;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            controller.play.call(this);
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
        },
        'SeventyEights': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = true;
            functions.userData[userId][deviceId]['topicName'] = null;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.playSeventyEights.call(this);
        },
        'PlaByTopic': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = true;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = true;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.playSeventyEights.call(this);
        },
        'OneGoSeventyEights': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].lastPlayedByUser = {};
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = true;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = true;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.playSeventyEights.call(this);
        },
        'OneGoPlayAudio': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].lastPlayedByUser = {};
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId]['OneGoCollectionRandomPlayAudioStatus'] = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = true;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.OneGoPlayAudio.call(this);
        },
        'OneGoCollectionRandomPlayAudio': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].lastPlayedByUser = {};
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId]['OneGoCollectionRandomPlayAudioStatus'] = true;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = true;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.OneGoPlayAudio.call(this);
        },
        'SongDetail': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
                functions.userData[userId][deviceId].MusicUrlList = [];
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
                functions.userData[userId][deviceId].MusicUrlList = [];
            }
            this.handler.state = constants.states.PLAY_MODE;
            if (functions.userData[userId][deviceId].MusicUrlList.length >= 1) {
                let cardTitle = 'Song Title';
                let cardOutput = "You are listening " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['title'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['coverage'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['year'];
                let speechOutput = "You are listening " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['title'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['coverage'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['year'] + ".";

                this.response.cardRenderer(cardTitle, cardOutput, null);
                this.response.speak(speechOutput);
                this.emit(':responseReady');

            } else {

                let cardTitle = 'Please select collection first.';
                let cardOutput = "No song id Playing now. Please select collection first.";
                let speechOutput = "No song id Playing now. Please select collection first.";
                let repromptText = "No song id Playing now. Please select collection first.";

                this.response.cardRenderer(cardTitle, cardOutput, null);
                this.response.speak(speechOutput).listen(repromptText);
                this.emit(':responseReady');

            }
        },
        'AMAZON.NextIntent': function () {
            controller.playNext.call(this)
        },
        'AMAZON.PreviousIntent': function () {
            controller.playPrev.call(this)
        },
        'AMAZON.PauseIntent': function () {
            this.response.audioPlayerStop();
            this.emit(':responseReady');
        },
        'AMAZON.StopIntent': function () {
            controller.stop.call(this)
        },
        'AMAZON.CancelIntent': function () {
            controller.stop.call(this)
        },
        'AMAZON.ResumeIntent': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId] [deviceId] = {};
                functions.userData[userId][deviceId] = (this.attributes[deviceId] != undefined) ? this.attributes[deviceId] : {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId] [deviceId] = {};
                functions.userData[userId][deviceId] = (this.attributes[deviceId] != undefined) ? this.attributes[deviceId] : {};
            }
            if (functions.userData[userId][deviceId].SeventyEights == true) {
                let lastPlayed = loadLastPlayed(userId, deviceId);
                functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
                if (lastPlayed !== null) {
                    functions.userData[userId][deviceId]['offsetInMilliseconds'] = lastPlayed.offsetInMilliseconds;
                }
                controller.playSeventyEights.call(this);
            }
            else {

                let lastPlayed = loadLastPlayed(userId, deviceId);
                functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
                if (lastPlayed !== null) {
                    functions.userData[userId][deviceId]['offsetInMilliseconds'] = lastPlayed.offsetInMilliseconds;
                }
                if (functions.userData[userId][deviceId].OneGoPlayAudioStatus) {
                    controller.OneGoPlayAudio.call(this);
                } else {
                    controller.play.call(this);
                }
            }
        },
        'AMAZON.HelpIntent': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
                functions.userData[userId][deviceId].MusicUrlList = [];
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
                functions.userData[userId][deviceId].MusicUrlList = [];
            }
            // This will called while audio is playing and a user says "ask <invocation_name> for help"
            if (functions.userData[userId][deviceId].MusicUrlList.length >= 1) {
                let response = {
                    version: '1.0',
                    response: {
                        outputSpeech: {
                            type: 'SSML',
                            ssml: "<speak>You are listening " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['title'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['coverage'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['year'] + ".</speak>",
                        },
                        card: {
                            type: 'Simple',
                            title: "Song Title",
                            content: "You are listening " + functions.userData[userId][deviceId].MusicUrlList[counter]['title'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['coverage'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['year'],
                        },
                        reprompt: {
                            outputSpeech: {
                                type: 'SSML',
                                ssml: "<speak>You are listening " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['title'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['coverage'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['year'] + ".</speak>",
                            }
                        },
                        shouldEndSession: true,

                    }
                };
                this.context.succeed(response);
            } else {
                let response = {
                    version: '1.0',
                    response: {
                        outputSpeech: {
                            type: 'SSML',
                            ssml: "<speak>No song id Playing now. Please select collection first.</speak>",
                        },
                        card: {
                            type: 'Simple',
                            title: "Please select collection first.",
                            content: "No song id Playing now. Please select collection first.",
                        },
                        reprompt: {
                            outputSpeech: {
                                type: 'SSML',
                                ssml: "<speak>No song id Playing now. Please select collection first.</speak>",
                            }
                        },
                        shouldEndSession: false,
                    }
                };
                this.context.succeed(response);
            }
        },
        'SessionEndedRequest': function () {
            this.context.succeed();
        },
        'Unhandled': function () {
            let message = 'Sorry, I could not understand. You can say, Next or Previous to navigate through the playlist.';
            this.response.speak(message).listen(message);
            this.emit(':responseReady');
        }
    }),
    resumeDecisionModeIntentHandlers: Alexa.CreateStateHandler(constants.states.RESUME_DECISION_MODE, {
        /*
         *  All Intent Handlers for state : RESUME_DECISION_MODE
         */

        'LaunchRequest': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
            }
            if (functions.userData[userId][deviceId] == undefined) {
                controller.welcome.call(this);
            } else if (!functions.userData[userId][deviceId].playbackFinished && functions.userData[userId][deviceId].MusicUrlList != undefined) {

                let message = 'Welcome back. You were listening to ' + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['title'] +
                    ' Would you like to resume?';
                let reprompt = 'You can say yes to resume or no to play from the top.';
                let cardTitle = 'Rest or Resume';
                let cradOutput = 'Welcome back. You were listening to ' + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['title'] +
                    ' Would you like to resume?';

                this.response.cardRenderer(cardTitle, cradOutput, null);
                this.response.speak(message).listen(reprompt);
                this.emit(':responseReady');
            } else {
                controller.welcome.call(this);
            }
        },
        'Discovery': function () {
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].SeventyEights = false;
            controller.Discovery.call(this);
        },
        'PlayAudio': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;

            controller.play.call(this);
        },
        'SearchCollection': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].lastPlayedByUser = {};
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            controller.getCollection.call(this);
        },
        'PlayAudioByCity': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.play.call(this);
        },
        'PlayAudioByYearCity': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.play.call(this);
        },
        'PlayAudioQuery': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = true;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.play.call(this);
        },
        'PlayAudioByRandomYear': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = true;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = true;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.play.call(this);
        },
        'PlayAudioByRandomCity': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = true;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = true;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.play.call(this);
        },
        'PlayAudioByRandom': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = true;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].audioURL = null;
            controller.play.call(this);
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
        },
        'SeventyEights': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = true;
            functions.userData[userId][deviceId]['topicName'] = null;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.playSeventyEights.call(this);
        },
        'PlaByTopic': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = true;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = true;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.playSeventyEights.call(this);
        },
        'OneGoSeventyEights': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].lastPlayedByUser = {};
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = true;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = true;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.playSeventyEights.call(this);
        },
        'OneGoPlayAudio': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].lastPlayedByUser = {};
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId]['OneGoCollectionRandomPlayAudioStatus'] = false;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = true;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.OneGoPlayAudio.call(this);
        },
        'OneGoCollectionRandomPlayAudio': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].lastPlayedByUser = {};
            functions.userData[userId][deviceId].page = 0;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId]['OneGoCollectionRandomPlayAudioStatus'] = true;
            functions.userData[userId][deviceId].counter = 0;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = true;
            functions.userData[userId][deviceId].audioURL = null;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            controller.OneGoPlayAudio.call(this);
        },
        'SongDetail': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
                functions.userData[userId][deviceId].MusicUrlList = [];
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
                functions.userData[userId][deviceId].MusicUrlList = [];
            }
            this.handler.state = constants.states.PLAY_MODE;
            if (functions.userData[userId][deviceId].MusicUrlList.length >= 1) {
                let cardTitle = 'Song Title';
                let cardOutput = "You are listening " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['title'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['coverage'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['year'];
                let speechOutput = "You are listening " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['title'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['coverage'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['year'] + ".";
                this.response.cardRenderer(cardTitle, cardOutput, null);
                this.response.speak(speechOutput);
                this.emit(':responseReady');
            } else {
                let cardTitle = 'Please select collection first.';
                let cardOutput = "No song id Playing now. Please select collection first.";
                let speechOutput = "No song id Playing now. Please select collection first.";
                let repromptText = "No song id Playing now. Please select collection first.";
                this.response.cardRenderer(cardTitle, cardOutput, null);
                this.response.speak(speechOutput).listen(repromptText);
                this.emit(':responseReady');
            }
        },
        'AMAZON.NextIntent': function () {
            controller.playNext.call(this)
        },
        'AMAZON.PreviousIntent': function () {
            controller.playPrev.call(this)
        },
        'AMAZON.PauseIntent': function () {
            this.response.audioPlayerStop();
            this.emit(':responseReady');
        },
        'AMAZON.YesIntent': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            if (functions.userData[userId][deviceId].SeventyEights == true) {
                if (functions.userData[userId][deviceId].counter < 0) {
                    functions.userData[userId][deviceId].counter = 0;
                }
                controller.playSeventyEights.call(this);
            }
            else {
                if (functions.userData[userId][deviceId].counter < 0) {
                    functions.userData[userId][deviceId].counter = 0;
                }
                if (functions.userData[userId][deviceId].OneGoPlayAudioStatus) {
                    controller.OneGoPlayAudio.call(this);
                } else {
                    controller.play.call(this);
                }
            }
        },
        'AMAZON.NoIntent': function () {
            this.handler.state = constants.states.PLAY_MODE;
            controller.reset.call(this)
        },
        'AMAZON.HelpIntent': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
                functions.userData[userId][deviceId].MusicUrlList = [];
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
                functions.userData[userId][deviceId].MusicUrlList = [];
            }
            // This will called while audio is playing and a user says "ask <invocation_name> for help"
            if (functions.userData[userId][deviceId].MusicUrlList.length >= 1) {
                let response = {
                    version: '1.0',
                    response: {
                        outputSpeech: {
                            type: 'SSML',
                            ssml: "<speak>You are listening " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['title'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['coverage'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['year'] + ".</speak>",
                        },
                        card: {
                            type: 'Simple',
                            title: "Song Title",
                            content: "You are listening " + functions.userData[userId][deviceId].MusicUrlList[counter]['title'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['coverage'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['year'],
                        },
                        reprompt: {
                            outputSpeech: {
                                type: 'SSML',
                                ssml: "<speak>You are listening " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['title'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['coverage'] + ", " + functions.userData[userId][deviceId].MusicUrlList[functions.userData[userId][deviceId].IdentifierSongsCount]['year'] + ".</speak>",
                            }
                        },
                        shouldEndSession: true,

                    }
                };
                this.context.succeed(response);
            } else {
                let response = {
                    version: '1.0',
                    response: {
                        outputSpeech: {
                            type: 'SSML',
                            ssml: "<speak>No song id Playing now. Please select collection first.</speak>",
                        },
                        card: {
                            type: 'Simple',
                            title: "Please select collection first.",
                            content: "No song id Playing now. Please select collection first.",
                        },
                        reprompt: {
                            outputSpeech: {
                                type: 'SSML',
                                ssml: "<speak>No song id Playing now. Please select collection first.</speak>",
                            }
                        },
                        shouldEndSession: false,
                    }
                };
                this.context.succeed(response);
            }
        },
        'AMAZON.StopIntent': function () {

            controller.stop.call(this)
        },
        'AMAZON.CancelIntent': function () {
            controller.stop.call(this)
        },
        'SessionEndedRequest': function () {
            this.context.succeed();
        },
        'Unhandled': function () {
            let message = 'Sorry, this is not a valid command. Please say help to hear what you can say.';
            this.response.speak(message).listen(message);
            this.emit(':responseReady');
        }
    })
};

module.exports = stateHandlers;

let controller = function () {
    return {
        welcome: function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;

            if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].lastPlayedByUser = {};
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].page = 1;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            functions.userData[userId][deviceId].counter = 0; //do not loop on the list of podcast
            functions.userData[userId][deviceId]['year'] = null;
            functions.userData[userId][deviceId]['city'] = null;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId]['CityName'] = 'Los Angeles';
            functions.userData[userId][deviceId]['YearName'] = '1971';
            functions.userData[userId][deviceId]['used'] = true;
            functions.userData[userId][deviceId]['collection'] = null;
            functions.userData[userId][deviceId]['collectionQuery'] = null;
            functions.userData[userId][deviceId]['title'] = null;
            functions.userData[userId][deviceId]['title'] = null;
            functions.userData[userId][deviceId]['APIURL'] = null;
            functions.userData[userId][deviceId]['APIURLIDENTIFIER'] = null;
            functions.userData[userId][deviceId]['topicName'] = null;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId]['OneGoCollectionRandomPlayAudioStatus'] = false;
            functions.userData[userId][deviceId].audioURL = null;
            let cardTitle = 'Welcome';
            let repromptText = "Waiting for your responce.<break time='.5s'/> What artist would you like to listen to? <break time='.5s'/>  For example, The Grateful Dead, The Phil Lesh and Friends or The Disco Biscuits?";
            let cardOutput = "Welcome to music at the Internet Archive. What artist would you like to listen to? For example, The Grateful Dead, The Phil Lesh and Friends or The Disco Biscuits?";
            let speechOutput = " <audio src='https://s3.amazonaws.com/gratefulerrorlogs/CrowdNoise.mp3' /> Welcome to music at the Internet Archive.<break time='.5s'/> What artist would you like to listen to? <break time='.5s'/>  For example, The Grateful Dead, The Phil Lesh and Friends or The Disco Biscuits?";
            this.response.cardRenderer(cardTitle, cardOutput, null);
            this.response.speak(speechOutput).listen(repromptText);
            this.emit(':responseReady');
        },
        Discovery: function () {
            functions.DiscoveryLib.call(this);
        },
        play: function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;

            this.handler.state = constants.states.PLAY_MODE;
            if (functions.userData[userId][deviceId].playbackFinished) {
                functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
                functions.userData[userId][deviceId].playbackFinished = false;
            }
            functions.getAudioPlayList.call(this);
        },
        OneGoPlayAudio: function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            this.handler.state = constants.states.PLAY_MODE;
            if (functions.userData[userId][deviceId].playbackFinished) {
                functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
                functions.userData[userId][deviceId].playbackFinished = false;
            }
            functions.getOneGoPlayAudio.call(this);
        },
        playSeventyEights: function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            this.handler.state = constants.states.PLAY_MODE;
            if (functions.userData[userId][deviceId].playbackFinished) {
                functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
                functions.userData[userId][deviceId].playbackFinished = false;
            }
            functions.getAudioPlayListSeventyEights.call(this);
        },
        PlaByTopic: function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            this.handler.state = constants.states.PLAY_MODE;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId][deviceId].playbackFinished) {
                functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
                functions.userData[userId][deviceId].playbackFinished = false;
            }
            functions.getAudioPlayListSeventyEights.call(this);
        },
        getCollection: function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;


            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId]['city'] = null;
            functions.userData[userId][deviceId]['year'] = null;
            functions.getCollectionLib.call(this);
        },
        stop: function () {
            let cardTitle = 'Good bye';
            let speechOutput = "Thanks for rocking with the internet archive’s live music collection!";
            let cardOutput = "Thanks for rocking with the internet archive’s live music collection!";
            this.response.cardRenderer(cardTitle, cardOutput, null);
            this.response.speak(speechOutput);
            this.emit(':responseReady');
        },
        playNext: function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            this.handler.state = constants.states.PLAY_MODE;
            if (functions.userData[userId][deviceId].SeventyEights == true) {
                if (functions.userData[userId][deviceId].IdentifierSongsCountTotal == 0) {
                    let cardTitle = 'Select Topic';
                    let repromptText = "Please Select Topic first.";
                    let cardOutput = "Please Select Topic first.";
                    let speechOutput = "Please Select Topic first.";
                    this.response.cardRenderer(cardTitle, cardOutput, null);
                    this.response.speak(speechOutput).listen(repromptText);
                    this.emit(':responseReady');
                }
                else {
                    functions.userData[userId][deviceId].counter++;
                    functions.userData[userId][deviceId].IdentifierSongsCount++;

                    if (functions.userData[userId][deviceId].IdentifierSongsCountTotal == functions.userData[userId][deviceId].IdentifierSongsCount) {
                        functions.userData[userId][deviceId].IdentifierSongsCount = 0;
                        functions.userData[userId][deviceId].page++;
                    }
                    controller.playSeventyEights.call(this);
                }
            } else {
                if (functions.userData[userId][deviceId].IdentifierSongsCountTotal == 0) {
                    let cardTitle = 'Select City and Year';
                    let repromptText = "Please Select City and year first.";
                    let cardOutput = "Please Select City and year first.";
                    let speechOutput = "Please Select City and year first.";
                    this.response.cardRenderer(cardTitle, cardOutput, null);
                    this.response.speak(speechOutput).listen(repromptText);
                    this.emit(':responseReady');
                } else {
                    functions.userData[userId][deviceId].counter++;
                    functions.userData[userId][deviceId].IdentifierSongsCount++;

                    if (functions.userData[userId][deviceId].IdentifierSongsCountTotal == functions.userData[userId][deviceId].IdentifierSongsCount) {
                        functions.userData[userId][deviceId].IdentifierSongsCount = 0;
                        functions.userData[userId][deviceId].page++;
                    }
                    if (functions.userData[userId][deviceId].OneGoPlayAudioStatus) {

                        controller.OneGoPlayAudio.call(this);
                    } else {
                        controller.play.call(this);
                    }

                }
            }
        },
        playPrev: function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            this.handler.state = constants.states.PLAY_MODE;
            if (functions.userData[userId][deviceId].SeventyEights == true) {
                if (functions.userData[userId][deviceId].IdentifierSongsCountTotal == 0) {
                    let cardTitle = 'Select Topic';
                    let repromptText = "Please Select Topic first.";
                    let cardOutput = "Please Select Topic first.";
                    let speechOutput = "Please Select Topic first.";
                    this.response.cardRenderer(cardTitle, cardOutput, null);
                    this.response.speak(speechOutput).listen(repromptText);
                    this.emit(':responseReady');
                }
                else {
                    if (functions.userData[userId][deviceId].counter > 0) {
                        functions.userData[userId][deviceId].counter--;
                    }
                    functions.userData[userId][deviceId].IdentifierSongsCount--;
                    if (functions.userData[userId][deviceId].IdentifierSongsCount == -1 && functions.userData[userId][deviceId].page > 0) {
                        functions.userData[userId][deviceId].IdentifierSongsCount = 0;
                        functions.userData[userId][deviceId].page--;
                    } else if (functions.userData[userId][deviceId].IdentifierSongsCount == -1 && functions.userData[userId][deviceId].page == 0) {
                        functions.userData[userId][deviceId].IdentifierSongsCount = 0;
                        functions.userData[userId][deviceId].page = 0;
                    }
                    controller.playSeventyEights.call(this);
                }
            } else {
                if (functions.userData[userId][deviceId].IdentifierSongsCountTotal == 0) {
                    let cardTitle = 'Select City and Year';
                    let repromptText = "Please Select City and year first.";
                    let cardOutput = "Please Select City and year first.";
                    let speechOutput = "Please Select City and year first.";
                    this.response.cardRenderer(cardTitle, cardOutput, null);
                    this.response.speak(speechOutput).listen(repromptText);
                    this.emit(':responseReady');
                } else {
                    if (functions.userData[userId][deviceId].counter > 0) {
                        functions.userData[userId][deviceId].counter--;
                    }
                    functions.userData[userId][deviceId].IdentifierSongsCount--;
                    if (functions.userData[userId][deviceId].IdentifierSongsCount == -1 && functions.userData[userId][deviceId].page > 0) {
                        functions.userData[userId][deviceId].IdentifierSongsCount = 0;
                        functions.userData[userId][deviceId].page--;
                    } else if (functions.userData[userId][deviceId].IdentifierSongsCount == -1 && functions.userData[userId][deviceId].page == 0) {
                        functions.userData[userId][deviceId].IdentifierSongsCount = 0;
                        functions.userData[userId][deviceId].page = 0;
                    }
                    if (functions.userData[userId][deviceId].OneGoPlayAudioStatus) {

                        controller.OneGoPlayAudio.call(this);
                    } else {
                        controller.play.call(this);
                    }

                }
            }
        },
        reset: function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = {};
                functions.userData[userId][deviceId] = {};
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = {};
            }
            functions.userData[userId][deviceId].lastPlayedByUser = {};
            functions.userData[userId][deviceId].IdentifierSongsCount = 0;
            functions.userData[userId][deviceId].IdentifierSongsCountTotal = 0;
            functions.userData[userId][deviceId].page = 1;

            functions.userData[userId][deviceId].IdentifierCount = 0;
            functions.userData[userId][deviceId]['offsetInMilliseconds'] = 0;
            functions.userData[userId][deviceId].counter = 0; //do not loop on the list of podcast
            functions.userData[userId][deviceId]['year'] = null;
            functions.userData[userId][deviceId]['city'] = null;
            functions.userData[userId][deviceId].typeQuery = true;
            functions.userData[userId][deviceId].searchBYTitle = false;
            functions.userData[userId][deviceId].PlayAudioByRandomYear = false;
            functions.userData[userId][deviceId].PlayAudioByRandomCity = false;
            functions.userData[userId][deviceId].PlayAudioByRandom = false;
            functions.userData[userId][deviceId]['CityName'] = 'Los Angeles';
            functions.userData[userId][deviceId]['YearName'] = '1971';
            functions.userData[userId][deviceId]['used'] = true;
            functions.userData[userId][deviceId]['collection'] = null;
            functions.userData[userId][deviceId]['collectionQuery'] = null;
            functions.userData[userId][deviceId]['title'] = null;
            functions.userData[userId][deviceId]['title'] = null;
            functions.userData[userId][deviceId]['APIURL'] = null;
            functions.userData[userId][deviceId]['APIURLIDENTIFIER'] = null;
            functions.userData[userId][deviceId]['topicName'] = null;
            functions.userData[userId][deviceId].SeventyEights = false;
            functions.userData[userId][deviceId].OneGoPlayAudioStatus = false;
            functions.userData[userId][deviceId]['OneGoCollectionRandomPlayAudioStatus'] = false;
            functions.userData[userId][deviceId].audioURL = null;
            let cardTitle = 'Reset All';
            let repromptText = "Waiting for your responce.<break time='.5s'/> What artist would you like to listen to? <break time='.5s'/>  For example, The Grateful Dead, The Phil Lesh and Friends or The Disco Biscuits?";
            let cardOutput = "What artist would you like to listen to? For example, The Grateful Dead, The Phil Lesh and Friends or The Disco Biscuits?";
            let speechOutput = " What artist would you like to listen to? <break time='.5s'/>  For example, The Grateful Dead, The Phil Lesh and Friends or The Disco Biscuits?";
            this.response.cardRenderer(cardTitle, cardOutput, null);
            this.response.speak(speechOutput).listen(repromptText);
            this.emit(':responseReady');
        }
    }
}();

function loadLastPlayed(userId, deviceId) {

    return functions.userData[userId][deviceId].lastPlayedByUser;
};