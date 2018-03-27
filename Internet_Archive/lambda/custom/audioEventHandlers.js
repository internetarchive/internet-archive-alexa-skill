'use strict';

var Alexa = require('alexa-sdk');
var constants = require('./constants');
var functions = require('./functions');

// Binding audio handlers to PLAY_MODE,START_MODE,RESUME_DECISION_MODE State since they are expected only in this mode.
var audioEventHandlers = {
    audioEventHandlersPlayMode: Alexa.CreateStateHandler(constants.states.PLAY_MODE, {
        'PlaybackStarted': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            functions.userData[userId][deviceId].playbackFinished = false;
            this.attributes[deviceId] = {};
            for (let k in functions.userData[userId][deviceId]) {
                if (functions.userData[userId][deviceId].hasOwnProperty(k) && k != 'MusicUrlList') {
                    this.attributes[deviceId][k] = functions.userData[userId][deviceId][k];
                }
            }
            if (constants.debug) {
                console.log('Now Playing -- ' + functions.userData[userId][deviceId].audioURL);
                console.log('IdentifierSongsCount -- ' + functions.userData[userId][deviceId].IdentifierSongsCount);
                console.log('IdentifierSongsCountTotal -- ' + functions.userData[userId][deviceId].IdentifierSongsCountTotal);
            }
            this.emit(':saveState', true);
        },
        'PlaybackFinished': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = [];
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            }
            functions.userData[userId][deviceId].playbackFinished = true;
            this.emit(':saveState', true);
            this.context.succeed({
                version: "1.0",
                response: {}
            });
        },
        'PlaybackStopped': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = [];
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            }
            functions.userData[userId][deviceId].lastPlayedByUser = this.event.request;
            this.context.succeed({
                version: "1.0",
                response: {}
            });
        },
        'PlaybackNearlyFinished': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = [];
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            }
            functions.userData[userId][deviceId].offsetInMilliseconds = 0;
            functions.userData[userId][deviceId]['counter']++;
            functions.userData[userId][deviceId]['IdentifierSongsCount']++;
            if (functions.userData[userId][deviceId].IdentifierSongsCountTotal <= functions.userData[userId][deviceId].IdentifierSongsCount) {
                functions.userData[userId][deviceId].IdentifierSongsCount = 0;
                functions.userData[userId][deviceId].page++;
            }
            if (constants.debug) {
                console.log('counter -' + functions.userData[userId][deviceId]['counter']);
                console.log('page -' + functions.userData[userId][deviceId]['page']);
                console.log('IdentifierSongsCount -- ' + functions.userData[userId][deviceId].IdentifierSongsCount);
                console.log('IdentifierSongsCountTotal -- ' + functions.userData[userId][deviceId].IdentifierSongsCountTotal);
            }
            if (functions.userData[userId][deviceId].SeventyEights == true) {
                functions.getAudioPlayListSeventyEights.call(this);
            } else {
                if (functions.userData[userId][deviceId].OneGoPlayAudioStatus) {
                    functions.getOneGoPlayAudio.call(this);
                } else {
                    functions.getAudioPlayList.call(this);
                }

            }

        },
        'PlaybackFailed': function () {
            //  AudioPlayer.PlaybackNearlyFinished Directive received. Logging the error.
            console.log("Playback Failed : %j", this.event.request.error);
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            console.log('Last Song -- ' + functions.userData[userId][deviceId].audioURL);

            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = [];
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            }
            functions.userData[userId][deviceId].offsetInMilliseconds = 0;

            functions.userData[userId][deviceId]['counter']++;
            functions.userData[userId][deviceId]['IdentifierSongsCount']++;

            if (functions.userData[userId][deviceId].IdentifierSongsCountTotal <= functions.userData[userId][deviceId].IdentifierSongsCount) {
                functions.userData[userId][deviceId].IdentifierSongsCount = 0;
                functions.userData[userId][deviceId].page++;
            }
            if (constants.debug) {
                console.log('counter -' + functions.userData[userId][deviceId]['counter']);
                console.log('page -' + functions.userData[userId][deviceId]['page']);
                console.log('IdentifierSongsCount -- ' + functions.userData[userId][deviceId].IdentifierSongsCount);
                console.log('IdentifierSongsCountTotal -- ' + functions.userData[userId][deviceId].IdentifierSongsCountTotal);
            }

            if (functions.userData[userId][deviceId].SeventyEights == true) {
                functions.getAudioPlayListSeventyEights.call(this);

            } else {
                if (functions.userData[userId][deviceId].OneGoPlayAudioStatus) {
                    functions.getOneGoPlayAudio.call(this);


                } else {
                    functions.getAudioPlayList.call(this);

                }

            }

        }
    }),
    audioEventHandlersStartMode: Alexa.CreateStateHandler(constants.states.START_MODE, {
        'PlaybackStarted': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            functions.userData[userId][deviceId].playbackFinished = false;
            this.attributes[deviceId] = {};
            for (let k in functions.userData[userId][deviceId]) {
                if (functions.userData[userId][deviceId].hasOwnProperty(k) && k != 'MusicUrlList') {
                    this.attributes[deviceId][k] = functions.userData[userId][deviceId][k];
                }
            }
            if (constants.debug) {
                console.log('Now Playing -- ' + functions.userData[userId][deviceId].audioURL);
                console.log('IdentifierSongsCount -- ' + functions.userData[userId][deviceId].IdentifierSongsCount);
                console.log('IdentifierSongsCountTotal -- ' + functions.userData[userId][deviceId].IdentifierSongsCountTotal);
            }
            this.emit(':saveState', true);
        },
        'PlaybackFinished': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = [];
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            }
            functions.userData[userId][deviceId].playbackFinished = true;
            this.emit(':saveState', true);
            this.context.succeed({
                version: "1.0",
                response: {}
            });
        },
        'PlaybackStopped': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = [];
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];

            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];

            }
            functions.userData[userId][deviceId].lastPlayedByUser = this.event.request;
            this.context.succeed({
                version: "1.0",
                response: {}
            });
        },
        'PlaybackNearlyFinished': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = [];
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];

            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            }
            functions.userData[userId][deviceId].offsetInMilliseconds = 0;
            functions.userData[userId][deviceId]['counter']++;
            functions.userData[userId][deviceId]['IdentifierSongsCount']++;
            if (functions.userData[userId][deviceId].IdentifierSongsCountTotal <= functions.userData[userId][deviceId].IdentifierSongsCount) {
                functions.userData[userId][deviceId].IdentifierSongsCount = 0;
                functions.userData[userId][deviceId].page++;
            }
            if (constants.debug) {
                console.log('counter -' + functions.userData[userId][deviceId]['counter']);
                console.log('Now Playing -- ' + functions.userData[userId][deviceId].audioURL);
                console.log('IdentifierSongsCount -- ' + functions.userData[userId][deviceId].IdentifierSongsCount);
                console.log('IdentifierSongsCountTotal -- ' + functions.userData[userId][deviceId].IdentifierSongsCountTotal);
            }
            if (functions.userData[userId][deviceId].SeventyEights == true) {
                functions.getAudioPlayListSeventyEights.call(this);
            } else {
                if (functions.userData[userId][deviceId].OneGoPlayAudioStatus) {
                    functions.getOneGoPlayAudio.call(this);
                } else {
                    functions.getAudioPlayList.call(this);
                }
            }
        },
        'PlaybackFailed': function () {
            //  AudioPlayer.PlaybackNearlyFinished Directive received. Logging the error.
            console.log("Playback Failed : %j", this.event.request.error);
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            console.log('Last Song -- ' + functions.userData[userId][deviceId].audioURL);

            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = [];
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            }

            functions.userData[userId][deviceId].offsetInMilliseconds = 0;
            functions.userData[userId][deviceId]['counter']++;
            functions.userData[userId][deviceId]['IdentifierSongsCount']++;
            if (functions.userData[userId][deviceId].IdentifierSongsCountTotal <= functions.userData[userId][deviceId].IdentifierSongsCount) {
                functions.userData[userId][deviceId].IdentifierSongsCount = 0;
                functions.userData[userId][deviceId].page++;
            }
            if (constants.debug) {
                console.log('counter -' + functions.userData[userId][deviceId]['counter']);
                console.log('Now Playing -- ' + functions.userData[userId][deviceId].audioURL);
                console.log('IdentifierSongsCount -- ' + functions.userData[userId][deviceId].IdentifierSongsCount);
                console.log('IdentifierSongsCountTotal -- ' + functions.userData[userId][deviceId].IdentifierSongsCountTotal);
            }
            if (functions.userData[userId][deviceId].SeventyEights == true) {
                functions.getAudioPlayListSeventyEights.call(this);

            } else {
                if (functions.userData[userId][deviceId].OneGoPlayAudioStatus) {
                    functions.getOneGoPlayAudio.call(this);
                } else {
                    functions.getAudioPlayList.call(this);

                }

            }

        }
    }),
    audioEventHandlersResumeMode: Alexa.CreateStateHandler(constants.states.RESUME_DECISION_MODE, {
        'PlaybackStarted': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            functions.userData[userId][deviceId].playbackFinished = false;
            this.attributes[deviceId] = {};
            for (let k in functions.userData[userId][deviceId]) {
                if (functions.userData[userId][deviceId].hasOwnProperty(k) && k != 'MusicUrlList') {
                    this.attributes[deviceId][k] = functions.userData[userId][deviceId][k];
                }
            }
            if (constants.debug) {
                console.log('Now Playing -- ' + functions.userData[userId][deviceId].audioURL);
                console.log('IdentifierSongsCount -- ' + functions.userData[userId][deviceId].IdentifierSongsCount);
                console.log('IdentifierSongsCountTotal -- ' + functions.userData[userId][deviceId].IdentifierSongsCountTotal);
            }
            this.emit(':saveState', true);
        },
        'PlaybackFinished': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = [];
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            }
            functions.userData[userId][deviceId].playbackFinished = true;
            this.emit(':saveState', true);
            this.context.succeed({
                version: "1.0",
                response: {}
            });
        },
        'PlaybackStopped': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = [];
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            }
            functions.userData[userId][deviceId].lastPlayedByUser = this.event.request;
            this.context.succeed({
                version: "1.0",
                response: {}
            });
        },
        'PlaybackNearlyFinished': function () {
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = [];
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            }
            functions.userData[userId][deviceId].offsetInMilliseconds = 0;
            functions.userData[userId][deviceId]['counter']++;
            functions.userData[userId][deviceId]['IdentifierSongsCount']++;
            if (functions.userData[userId][deviceId].IdentifierSongsCountTotal <= functions.userData[userId][deviceId].IdentifierSongsCount) {
                functions.userData[userId][deviceId].IdentifierSongsCount = 0;
                functions.userData[userId][deviceId].page++;
            }
            if (constants.debug) {
                console.log('counter -' + functions.userData[userId][deviceId]['counter']);
                console.log('Now Playing -- ' + functions.userData[userId][deviceId].audioURL);
                console.log('IdentifierSongsCount -- ' + functions.userData[userId][deviceId].IdentifierSongsCount);
                console.log('IdentifierSongsCountTotal -- ' + functions.userData[userId][deviceId].IdentifierSongsCountTotal);
            }
            if (functions.userData[userId][deviceId].SeventyEights == true) {
                functions.getAudioPlayListSeventyEights.call(this);

            } else {
                if (functions.userData[userId][deviceId].OneGoPlayAudioStatus) {
                    functions.getOneGoPlayAudio.call(this);
                } else {
                    functions.getAudioPlayList.call(this);
                }

            }


        },
        'PlaybackFailed': function () {
            //  AudioPlayer.PlaybackNearlyFinished Directive received. Logging the error.
            console.log("Playback Failed : %j", this.event.request.error);
            let userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
            let deviceId = this.event.context.System.device.deviceId;
            console.log('Last Song -- ' + functions.userData[userId][deviceId].audioURL);
            if (functions.userData[userId] == undefined) {
                functions.userData[userId] = [];
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            } else if (functions.userData[userId][deviceId] == undefined) {
                functions.userData[userId][deviceId] = [];
                functions.userData[userId][deviceId] = this.attributes[deviceId];
            }
            functions.userData[userId][deviceId].offsetInMilliseconds = 0;
            functions.userData[userId][deviceId]['counter']++;
            functions.userData[userId][deviceId]['IdentifierSongsCount']++;
            if (functions.userData[userId][deviceId].IdentifierSongsCountTotal <= functions.userData[userId][deviceId].IdentifierSongsCount) {
                functions.userData[userId][deviceId].IdentifierSongsCount = 0;
                functions.userData[userId][deviceId].page++;
            }
            if (constants.debug) {
                console.log('counter -' + functions.userData[userId][deviceId]['counter']);
                console.log('Now Playing -- ' + functions.userData[userId][deviceId].audioURL);
                console.log('IdentifierSongsCount -- ' + functions.userData[userId][deviceId].IdentifierSongsCount);
                console.log('IdentifierSongsCountTotal -- ' + functions.userData[userId][deviceId].IdentifierSongsCountTotal);
            }
            if (functions.userData[userId][deviceId].SeventyEights == true) {
                functions.getAudioPlayListSeventyEights.call(this);

            } else {
                if (functions.userData[userId][deviceId].OneGoPlayAudioStatus) {
                    functions.getOneGoPlayAudio.call(this);
                } else {
                    functions.getAudioPlayList.call(this);
                }

            }

        }
    })
}

module.exports = audioEventHandlers;
