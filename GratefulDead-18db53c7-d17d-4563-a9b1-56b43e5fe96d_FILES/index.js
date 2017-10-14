    'use strict';
    var https = require('https');
   
    var lastPlayedByUser = {};
    var podcastAPIURL = "https://archive.org/advancedsearch.php?q=collection%3A";
    var podcastCityAPIURL = "https://archive.org/advancedsearch.php?q=collection%3A";
    var podcastAPIURLNEW = "https://archive.org/advancedsearch.php?q=";
    var MusicUrlList = [];
    var page=1;
    var counter=0;
    var audioURL;
    var year='';
    var typeQuery=false;
    var searchBYTitle=false;
    var PlayAudioByRandomYear=false;
    var PlayAudioByRandomCity=false;
    var PlayAudioByRandom=false;
    var city='';
    var used =true;
    var collection='';
    var title='';
    // var lastyear='';
    var APIURL='';
    exports.handler = function(event, context) {
        var player = new MyAudioPlayer(event, context);
        player.handle();
    };
    
    
    
    Array.prototype.unique = function() {
      return this.filter(function (value, index, self) { 
        return self.indexOf(value) === index;
      });
    }
     
    var MyAudioPlayer = function (event, context) {
        this.event = event;
        this.context = context;
    };
     
    MyAudioPlayer.prototype.handle = function () {
        var requestType = this.event.request.type;
        var userId = this.event.context ? this.event.context.System.user.userId : this.event.session.user.userId;
       console.log(requestType);
       if (requestType === "LaunchRequest") {
            
            this.Welcome();
     
        } else  if (requestType === "IntentRequest") {
            var intent = this.event.request.intent;
            if (intent.name === "PlayAudio") {
                page=0;
                MusicUrlList=[];
                typeQuery=false;
                searchBYTitle=false;
                PlayAudioByRandomYear=false;
                PlayAudioByRandomCity=false;
                PlayAudioByRandom=false;
                counter=0;
                this.play(intent, 0);
            }else if (intent.name === "SearchCollection"){
                this.getCollection(intent);
            }else if (intent.name === "PlayAudioByCity") {
                page=0;
                MusicUrlList=[];
                typeQuery=false;
                searchBYTitle=false;
                PlayAudioByRandomYear=false;
                PlayAudioByRandomCity=false;
                PlayAudioByRandom=false;
                counter=0;
                this.play(intent, 0);
            }else if (intent.name === "PlayAudioByYearCity") {
                page=0;
                MusicUrlList=[];
                typeQuery=false;
                searchBYTitle=false;
                PlayAudioByRandomYear=false;
                PlayAudioByRandomCity=false;
                PlayAudioByRandom=false;
                counter=0;
                this.play(intent, 0);
            }else if (intent.name === "PlayAudioQuery") {
                page=0;
                MusicUrlList=[];
                typeQuery=false;
                searchBYTitle=true;
                PlayAudioByRandomYear=false;
                PlayAudioByRandomCity=false;
                PlayAudioByRandom=false;
                counter=0;
                this.play(intent, 0);
            }else if (intent.name === "PlayAudioByRandomYear") {
                page=0;
                MusicUrlList=[];
                PlayAudioByRandomYear=true;
                PlayAudioByRandomCity=false;
                typeQuery=false;
                searchBYTitle=false;
                PlayAudioByRandom=false;
                counter=0;
                this.play(intent, 0);
            }else if (intent.name === "PlayAudioByRandomCity") {
                page=0;
                MusicUrlList=[];
                PlayAudioByRandomYear=false;
                PlayAudioByRandomCity=true;
                typeQuery=false;
                searchBYTitle=false;
                PlayAudioByRandom=false;
                counter=0;
                this.play(intent, 0);
            }else if (intent.name === "PlayAudioByRandom") {
                page=0;
                MusicUrlList=[];
                PlayAudioByRandomYear=false;
                PlayAudioByRandomCity=false;
                PlayAudioByRandom=true;
                typeQuery=false;
                searchBYTitle=false;
                counter=0;
                this.play(intent, 0);
            }else if (intent.name === "AMAZON.PauseIntent") {
                this.stop();
            }else if (intent.name === "AMAZON.NextIntent") { 
                counter++;
                console.log('Next Counter'+counter);
                if(counter>MusicUrlList.length-1){
                    page++;
                    typeQuery=true;
                }else{
                    typeQuery=false;
                }
                
                this.play(intent, 0);
            }else if (intent.name === "AMAZON.PreviousIntent") { 
                if(counter>0){
                    counter--;
                }else{
                    counter=0;
                }
              // typeQuery=false;
                this.play(intent, 0);
            }else if (intent.name === "AMAZON.ResumeIntent") {
                var lastPlayed = this.loadLastPlayed(userId);
                var offsetInMilliseconds = 0;
                if (lastPlayed !== null) {
                    offsetInMilliseconds = lastPlayed.request.offsetInMilliseconds;
                }
                this.play(intent, offsetInMilliseconds);
            } else if (intent.name === 'AMAZON.StopIntent' || intent.name === 'AMAZON.CancelIntent') {
                this.handleSessionEndRequest();
            }
        } else if (requestType === "AudioPlayer.PlaybackStopped") {
            this.saveLastPlayed(userId, this.event);
            this.context.succeed(true);
        }
        else if (requestType === "AudioPlayer.PlaybackFailed") {
            counter++;
            this.play(requestType, 0);
            counter--;
        }
         else if (requestType === "AudioPlayer.PlaybackNearlyFinished") {
            counter++;
            this.PlayNext(requestType, 0);
            
        } else if (requestType === "System.ExceptionEncountered") {
            console.log('Error');
            console.log( this.event.request.error);
        }
        
    };
    
    MyAudioPlayer.prototype.PlayNext = function (requestType, offsetInMilliseconds) {
         var track=counter+1;
         var prevTrack=counter;
        if(MusicUrlList.length>0){
            if(track>MusicUrlList.length){
                counter=0;
                track=counter+1;
            }
            
            audioURL='https://archive.org/download/'+MusicUrlList[counter]['identifier']+'/'+MusicUrlList[counter]['identifier']+'_vbr.m3u';
            console.log(counter); 
            console.log("Next Url"+audioURL);
            var response = {
                                    version: "1.0",
                                    response: {
                                        shouldEndSession: true,
                                        directives: [
                                            {
                                                type: "AudioPlayer.Play",
                                                playBehavior: "REPLACE_ENQUEUED", 
                                                audioItem: {
                                                    stream: {
                                                        url: audioURL,
                                                        token: counter+1,
                                                        //expectedPreviousToken: prevTrack, 
                                                        offsetInMilliseconds: offsetInMilliseconds
                                                    }
                                                }
                                            }
                                        ]
                                    }
                };
            this.context.succeed(response);
            
        
        }else{
            var cardTitle = 'Unable to understand your request. Please Try again by saying. City and Year. or random';
            var repromptText = 'Waiting for your responce.';
            var speechOutput = "Sorry , Error Occured.Please Try again. Please Try again by saying. City and Year. or random";
            
            var response = {
                    version: '1.0',
                    response: {
                        outputSpeech: {
                            type: 'PlainText',
                            text: speechOutput,
                        },
                        card: {
                            type: 'Simple',
                            title: `${cardTitle}`,
                            content: `${speechOutput}`,
                        },
                        reprompt: {
                            outputSpeech: {
                                type: 'PlainText',
                                text: repromptText,
                            }
                        },
                        shouldEndSession:false,
                    }
            };
          this.context.succeed(response);
        }
        
           
    };
    
    function getAudioPlayList(intent,counter,thisOBJ,offsetInMilliseconds,callback){
        console.log('TypeQuery -----'+typeQuery);
        console.log('Intent -----'+intent.name);
        console.log('MusicUrlList Lenght -----'+MusicUrlList.length);
        console.log('counter -----'+counter);console.log('Year ------- '+year);
        console.log('City ------- '+city);
        if(collection!='' || searchBYTitle){
            var track=counter+1;
            if((MusicUrlList.length>0 && intent.name != 'PlayAudio' && intent.name != 'PlayAudioByRandom'  && intent.name != 'PlayAudioByCity' && intent.name != 'PlayAudioByRandomYear'&& intent.name != 'PlayAudioByRandomCity' && intent.name != 'PlayAudioQuery' && typeQuery==false) ){
                if(track>MusicUrlList.length){
                    counter=0;
                    track=counter+1;
                }
                
                audioURL='https://archive.org/download/'+MusicUrlList[counter]['identifier']+'/'+MusicUrlList[counter]['identifier']+'_vbr.m3u';
                // audioURL='https://archive.org/download/'+MusicUrlList[counter]['identifier']+'/'+MusicUrlList[counter]['identifier']+'.mp3';
                console.log('Music List'+MusicUrlList.length); 
                console.log(audioURL);
                var response = {
                                        version: "1.0",
                                        response: {
                                             outputSpeech: {
                                                type: 'PlainText',
                                                text: "Playing track - "+ MusicUrlList[counter]['title'] +" . Please Wait ...",
                                            },
                                            card: {
                                                type: 'Simple',
                                                title: `${"Playing track number - "+ track}`,
                                                content: `${"Playing track - "+ MusicUrlList[counter]['title'] +" . Please Wait ..."}`,
                                            },
                                            shouldEndSession: true,
                                            directives: [
                                                {
                                                    type: "AudioPlayer.Play",
                                                    playBehavior: "REPLACE_ALL", 
                                                    audioItem: {
                                                        stream: {
                                                            url: audioURL,
                                                            token: counter, 
                                                            expectedPreviousToken: null, 
                                                            offsetInMilliseconds: offsetInMilliseconds
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                    };
                return callback(0,thisOBJ,response);
                
            }else if(intent.name == 'PlayAudio' || intent.name == 'PlayAudioByCity' || intent.name == 'PlayAudioByRandom'  || intent.name =='PlayAudioByRandomYear' || intent.name =='PlayAudioByRandomCity' || intent.name =='PlayAudioByYearCity' || intent.name =='PlayAudioQuery'  || typeQuery ==true){
                    if(searchBYTitle || intent.name =='PlayAudioQuery'){
                         if(intent.name === 'PlayAudioQuery' ){
                            title= intent.slots.TITLE.value;
                        }else{
                            console.log('append'+title);
                        }
                        var APIURL=podcastAPIURLNEW+title+'%20AND(mediatype:audio)&fl[]=creator&fl[]=description&fl[]=downloads&fl[]=identifier&fl[]=mediatype&fl[]=subject&fl[]=title&sort[]=downloads desc&rows=50&page='+page+'&indent=yes&output=json';
                        console.log('API URL - '+APIURL);
                    }else if(PlayAudioByRandomYear || intent.name =='PlayAudioByRandomYear'){
                         if(intent.name === 'PlayAudioByRandomYear' ){
                            city= intent.slots.CITY.value
                        }else{
                            console.log('append'+city);
                        }
                        var APIURL=podcastCityAPIURL+collection+'+AND+coverage%3A'+city+'&fl[]=coverage&fl[]=creator&fl[]=description&fl[]=downloads&fl[]=identifier&fl[]=mediatype&fl[]=subject,year,location&fl[]=title&sort[]=downloads desc&rows=50&page='+page+'&indent=yes&output=json';
                        console.log('API URL - '+APIURL);
                    }else if(PlayAudioByRandom || intent.name =='PlayAudioByRandom'){
                        var APIURL=podcastCityAPIURL+collection+'&fl[]=coverage&fl[]=creator&fl[]=description&fl[]=downloads&fl[]=identifier&fl[]=mediatype&fl[]=subject,year,location&fl[]=title&sort[]=downloads desc&rows=50&page='+page+'&indent=yes&output=json';
                        console.log('API URL - '+APIURL);
                    } else if(PlayAudioByRandomCity || intent.name =='PlayAudioByRandomCity'){
                         if(intent.name === 'PlayAudioByRandomCity' ){
                            year= intent.slots.YEAR.value;
                        }else{
                            console.log('append'+year);
                        }
                        var APIURL=podcastAPIURL+collection+'+AND+year:'+year+'&fl[]=coverage&fl[]=creator&fl[]=description&fl[]=downloads&fl[]=identifier&fl[]=mediatype&fl[]=subject,year,location&fl[]=title&sort[]=downloads desc&rows=50&page='+page+'&indent=yes&output=json';
                        console.log('API URL - '+APIURL);
                    }else{
                        if(used){
                            year='';
                            city='';
                            used=false;
                        }
                        
                        if(intent.name === 'PlayAudioByYearCity' ){
                            year= intent.slots.YEAR.value;
                            city= intent.slots.CITY.value;
                            
                        }else if(intent.name === 'PlayAudio' ){
                          year= intent.slots.YEAR.value;
                          
                          APIURL=podcastAPIURL+collection+'+AND+year:'+year;
                          
                        }else if(intent.name === 'PlayAudioByCity' ){
                            city= intent.slots.CITY.value;
                            APIURL=podcastCityAPIURL+collection+'+AND+coverage%3A'+city;
                       }
                        
                        if(year !='' && city !=''){
                           APIURL=podcastCityAPIURL+collection+'+AND+coverage%3A'+city+'+AND+year%3A'+year;
                             
                        }
                        APIURL=APIURL+'&fl[]=coverage&fl[]=creator&fl[]=description&fl[]=downloads&fl[]=identifier&fl[]=mediatype&fl[]=subject,year,location&fl[]=title&sort[]=downloads desc&rows=50&page='+page+'&indent=yes&output=json';
                    }
                    console.log('API URL - '+APIURL);
                    https.get(APIURL, function (res) {
                    var body = '';
                    res.on('data', function (data) {
                        body += data;
                    });
                    
                    res.on('end', function () {
                        var result = JSON.parse(body);
                        if(result != null && result['response']['docs'].length>0){
                            if((intent.name==='PlayAudioByCity' || intent.name == 'PlayAudio') && (year =='' || city =='')){
                                var YearList=[];
                                var YearString='';
                                var CityList=[];
                                var CityString='';
                                if(intent.name==='PlayAudioByCity' && year==''){
                                     for (var i=0; i< result['response']['docs'].length; i++) {
                                        YearList.push(result['response']['docs'][i]['year']);
                                    }
                                    YearList=YearList.unique();
                                    YearList=YearList.sort();
                                    console.log(YearList);
                                    console.log(YearList[i]);
                                    for (var i=0; i< YearList.length; i++) {
                                        YearString=YearString+YearList[i]+'. ';
                                    }
                                    console.log(YearString);
                                    var cardTitle = 'Please Select Year.';
                                    var repromptText = 'Waiting for your responce.';
                                    var speechOutput = "Ok , Available years for City "+city+" are "+YearString+' Please Select year.';
                                    
                                    var response = {
                                            version: '1.0',
                                            response: {
                                                outputSpeech: {
                                                    type: 'PlainText',
                                                    text: speechOutput,
                                                },
                                                card: {
                                                    type: 'Simple',
                                                    title: `${cardTitle}`,
                                                    content: `${speechOutput}`,
                                                },
                                                reprompt: {
                                                    outputSpeech: {
                                                        type: 'PlainText',
                                                        text: repromptText,
                                                    }
                                                },
                                                shouldEndSession:false,
                                            }
                                    };
                                  return callback(0,thisOBJ,response);
                                }else if(intent.name==='PlayAudio' && city==''){
                                    for (var i=0; i< result['response']['docs'].length; i++) {
                                        CityList.push(result['response']['docs'][i]['coverage']);
                                    }
                                    
                                    CityList=CityList.unique();
                                    CityList=CityList.sort();
                                    for (var i=0; i< CityList.length; i++) {
                                        CityString=CityString+CityList[i]+'. ';
                                    }
                                    
                                    var cardTitle = 'Please Select City.';
                                    var repromptText = 'Waiting for your responce.';
                                    var speechOutput = "Ok , Available cities for year "+year+" are "+CityString+' Please Select city.';
                                    
                                    var response = {
                                            version: '1.0',
                                            response: {
                                                outputSpeech: {
                                                    type: 'PlainText',
                                                    text: speechOutput,
                                                },
                                                card: {
                                                    type: 'Simple',
                                                    title: `${cardTitle}`,
                                                    content: `${speechOutput}`,
                                                },
                                                reprompt: {
                                                    outputSpeech: {
                                                        type: 'PlainText',
                                                        text: repromptText,
                                                    }
                                                },
                                                shouldEndSession:false,
                                            }
                                    };
                                  return callback(0,thisOBJ,response);
                                }
                               
                            }else if ((intent.name =='PlayAudioByYearCity') || (city!='' && year !='')){
                                if(intent.name == 'PlayAudioByYearCity'){
                                    counter=0;
                                    MusicUrlList=[];
                                }
                                track=counter+1;
                                //MusicUrlList=result['response']['docs'];
                                for (var i=0; i< result['response']['docs'].length; i++) {
                                    MusicUrlList.push({identifier:result['response']['docs'][i]['identifier'],title:result['response']['docs'][i]['title']});
                                }
                                used=true;
                                console.log('Music List= '+MusicUrlList.length);
                                audioURL='https://archive.org/download/'+MusicUrlList[counter]['identifier']+'/'+MusicUrlList[counter]['identifier']+'_vbr.m3u';
                                //audioURL='https://archive.org/download/'+MusicUrlList[counter]['identifier']+'/'+MusicUrlList[counter]['identifier']+'.mp3';
                                //audioURL="https://ia801403.us.archive.org/22/items/badpanda049/02.DumboGetsMad-PlumyTale.mp3"
                                console.log(audioURL);
                                var response = {
                                                    version: "1.0",
                                                    response: {
                                                        outputSpeech: {
                                                            type: 'PlainText',
                                                            text: "Playing track - " + MusicUrlList[counter]['title'] +" . Please Wait ...",
                                                        },
                                                        card: {
                                                            type: 'Simple',
                                                            title: `${"Playing track number - "+ track}`,
                                                            content: `${"Playing track number - "+ track+" " + MusicUrlList[counter]['title'] +" . Please Wait ..."}`,
                                                        },
                                                        shouldEndSession: true,
                                                        directives: [
                                                            {
                                                                type: "AudioPlayer.Play",
                                                                playBehavior: "REPLACE_ALL", 
                                                                audioItem: {
                                                                    stream: {
                                                                        url: audioURL,
                                                                        token: counter, 
                                                                        expectedPreviousToken: null, 
                                                                        offsetInMilliseconds: offsetInMilliseconds
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                };
                                
                                return callback(0,thisOBJ,response);
                            }
                            else if (intent.name =='PlayAudioQuery' || searchBYTitle){
                                if(intent.name==='PlayAudioQuery'){
                                    //var i=0;
                                    counter=0;
                                    MusicUrlList=[];
                                    track=counter+1;
                                }
                                //MusicUrlList=result['response']['docs'];
                                for (var i=0; i< result['response']['docs'].length; i++) {
                                    MusicUrlList.push({identifier:result['response']['docs'][i]['identifier'],title:result['response']['docs'][i]['title']});
                                }
                                
                                console.log('Music List= '+MusicUrlList.length);
                                audioURL='https://archive.org/download/'+MusicUrlList[counter]['identifier']+'/'+MusicUrlList[counter]['identifier']+'_vbr.m3u';
                                //audioURL='https://archive.org/download/'+MusicUrlList[counter]['identifier']+'/'+MusicUrlList[counter]['identifier']+'.mp3';
                                //audioURL="https://ia801403.us.archive.org/22/items/badpanda049/02.DumboGetsMad-PlumyTale.mp3"
                                console.log(audioURL);
                                var response = {
                                                    version: "1.0",
                                                    response: {
                                                        outputSpeech: {
                                                            type: 'PlainText',
                                                            text: "Playing track - " + MusicUrlList[counter]['title'] +" . Please Wait ...",
                                                        },
                                                        card: {
                                                            type: 'Simple',
                                                            title: `${"Playing track number - "+track}`,
                                                            content: `${"Playing track number - "+track+" " + MusicUrlList[counter]['title'] +" . Please Wait ..."}`,
                                                        },
                                                        shouldEndSession: true,
                                                        directives: [
                                                            {
                                                                type: "AudioPlayer.Play",
                                                                playBehavior: "REPLACE_ALL", 
                                                                audioItem: {
                                                                    stream: {
                                                                        url: audioURL,
                                                                        token: counter, 
                                                                        expectedPreviousToken: null, 
                                                                        offsetInMilliseconds: offsetInMilliseconds
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                };
                                
                                return callback(0,thisOBJ,response);
                            }
                            else if (intent.name =='PlayAudioByRandomYear' || PlayAudioByRandomYear){
                                if(intent.name==='PlayAudioByRandomYear'){
                                    //var i=0;
                                    counter=0;
                                    MusicUrlList=[];
                                    track=counter+1;
                                }
                                //MusicUrlList=result['response']['docs'];
                                for (var i=0; i< result['response']['docs'].length; i++) {
                                    MusicUrlList.push({identifier:result['response']['docs'][i]['identifier'],title:result['response']['docs'][i]['title']});
                                }
                                
                                console.log('Music List= '+MusicUrlList.length);
                                audioURL='https://archive.org/download/'+MusicUrlList[counter]['identifier']+'/'+MusicUrlList[counter]['identifier']+'_vbr.m3u';
                                //audioURL='https://archive.org/download/'+MusicUrlList[counter]['identifier']+'/'+MusicUrlList[counter]['identifier']+'.mp3';
                                //audioURL="https://ia801403.us.archive.org/22/items/badpanda049/02.DumboGetsMad-PlumyTale.mp3"
                                console.log(audioURL);
                                var response = {
                                                    version: "1.0",
                                                    response: {
                                                        outputSpeech: {
                                                            type: 'PlainText',
                                                            text: "Playing track - " + MusicUrlList[counter]['title'] +" . Please Wait ...",
                                                        },
                                                        card: {
                                                            type: 'Simple',
                                                            title: `${"Playing track number - "+track}`,
                                                            content: `${"Playing track number - "+track+" " + MusicUrlList[counter]['title'] +" . Please Wait ..."}`,
                                                        },
                                                        shouldEndSession: true,
                                                        directives: [
                                                            {
                                                                type: "AudioPlayer.Play",
                                                                playBehavior: "REPLACE_ALL", 
                                                                audioItem: {
                                                                    stream: {
                                                                        url: audioURL,
                                                                        token: counter, 
                                                                        expectedPreviousToken: null, 
                                                                        offsetInMilliseconds: offsetInMilliseconds
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                };
                                
                                return callback(0,thisOBJ,response);
                            }
                            else if (intent.name =='PlayAudioByRandomCity' || PlayAudioByRandomYear){
                                if(intent.name==='PlayAudioByRandomCity'){
                                    //var i=0;
                                    counter=0;
                                    MusicUrlList=[];
                                    track=counter+1;
                                }
                                //MusicUrlList=result['response']['docs'];
                                for (var i=0; i< result['response']['docs'].length; i++) {
                                    MusicUrlList.push({identifier:result['response']['docs'][i]['identifier'],title:result['response']['docs'][i]['title']});
                                }
                                
                                console.log('Music List= '+MusicUrlList.length);
                                audioURL='https://archive.org/download/'+MusicUrlList[counter]['identifier']+'/'+MusicUrlList[counter]['identifier']+'_vbr.m3u';
                                //audioURL='https://archive.org/download/'+MusicUrlList[counter]['identifier']+'/'+MusicUrlList[counter]['identifier']+'.mp3';
                                //audioURL="https://ia801403.us.archive.org/22/items/badpanda049/02.DumboGetsMad-PlumyTale.mp3"
                                console.log(audioURL);
                                var response = {
                                                    version: "1.0",
                                                    response: {
                                                        outputSpeech: {
                                                            type: 'PlainText',
                                                            text: "Playing track - " + MusicUrlList[counter]['title'] +" . Please Wait ...",
                                                        },
                                                        card: {
                                                            type: 'Simple',
                                                            title: `${"Playing track number - "+track}`,
                                                            content: `${"Playing track number - "+track+" " + MusicUrlList[counter]['title'] +" . Please Wait ..."}`,
                                                        },
                                                        shouldEndSession: true,
                                                        directives: [
                                                            {
                                                                type: "AudioPlayer.Play",
                                                                playBehavior: "REPLACE_ALL", 
                                                                audioItem: {
                                                                    stream: {
                                                                        url: audioURL,
                                                                        token: counter, 
                                                                        expectedPreviousToken: null, 
                                                                        offsetInMilliseconds: offsetInMilliseconds
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                };
                                
                                return callback(0,thisOBJ,response);
                            }
                            else if (intent.name =='PlayAudioByRandom' || PlayAudioByRandom){
                                if(intent.name==='PlayAudioByRandom'){
                                    //var i=0;
                                    counter=0;
                                    MusicUrlList=[];
                                    track=counter+1;
                                }
                                //MusicUrlList=result['response']['docs'];
                                for (var i=0; i< result['response']['docs'].length; i++) {
                                    MusicUrlList.push({identifier:result['response']['docs'][i]['identifier'],title:result['response']['docs'][i]['title']});
                                }
                                
                                console.log('Music List= '+MusicUrlList.length);
                                audioURL='https://archive.org/download/'+MusicUrlList[counter]['identifier']+'/'+MusicUrlList[counter]['identifier']+'_vbr.m3u';
                                //audioURL='https://archive.org/download/'+MusicUrlList[counter]['identifier']+'/'+MusicUrlList[counter]['identifier']+'.mp3';
                                //audioURL="https://ia801403.us.archive.org/22/items/badpanda049/02.DumboGetsMad-PlumyTale.mp3"
                                console.log(audioURL);
                                var response = {
                                                    version: "1.0",
                                                    response: {
                                                        outputSpeech: {
                                                            type: 'PlainText',
                                                            text: "Playing track - " + MusicUrlList[counter]['title'] +" . Please Wait ...",
                                                        },
                                                        card: {
                                                            type: 'Simple',
                                                            title: `${"Playing track number - "+track}`,
                                                            content: `${"Playing track number - "+track+" " + MusicUrlList[counter]['title'] +" . Please Wait ..."}`,
                                                        },
                                                        shouldEndSession: true,
                                                        directives: [
                                                            {
                                                                type: "AudioPlayer.Play",
                                                                playBehavior: "REPLACE_ALL", 
                                                                audioItem: {
                                                                    stream: {
                                                                        url: audioURL,
                                                                        token: counter, 
                                                                        expectedPreviousToken: null, 
                                                                        offsetInMilliseconds: offsetInMilliseconds
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                };
                                
                                return callback(0,thisOBJ,response);
                            }
                            
                                            
                        }else{
                            year ='';
                            city='';
                            var cardTitle = 'No Result Found';
                                var repromptText = 'No result found. Please Try again by saying. City and Year. or random';
                                var speechOutput = "Sorry , No result found. Please Try again by saying. City and Year. or random";
                                var response = {
                                    version: '1.0',
                                    response: {
                                                outputSpeech: {
                                                    type: 'PlainText',
                                                    text: speechOutput,
                                                },
                                                card: {
                                                    type: 'Simple',
                                                    title: `${cardTitle}`,
                                                    content: `${speechOutput}`,
                                                },
                                                reprompt: {
                                                    outputSpeech: {
                                                        type: 'PlainText',
                                                        text: repromptText,
                                                    }
                                                },
                                                shouldEndSession:false,
                                            }
                                    };
                                    return callback(0,thisOBJ,response);
                            
                        }
                       
                    });
                }).on('error', function (e) {
                    year='';
                    city='';
                    var cardTitle = 'Unable to understand your request. Please Try again by select. City and Year. or random';
                    var repromptText = 'Waiting for your responce.';
                    var speechOutput = "Sorry , Unable to understand your request. Please Try again by select. City and Year. or random";
                    var response = {
                        version: '1.0',
                        response: {
                                    outputSpeech: {
                                        type: 'PlainText',
                                        text: speechOutput,
                                    },
                                    card: {
                                        type: 'Simple',
                                        title: `${cardTitle}`,
                                        content: `${speechOutput}`,
                                    },
                                    reprompt: {
                                        outputSpeech: {
                                            type: 'PlainText',
                                            text: repromptText,
                                        }
                                    },
                                    shouldEndSession:false,
                                }
                        };
                        return callback(0,thisOBJ,response);
                });
            }else{
                var cardTitle = 'Unable to understand your request. Please Try again by select. City and Year. or random';
                var repromptText = 'Waiting for your responce.';
                var speechOutput = "Sorry, Unable to understand your request. Please Try again by select. City and Year. or random";
                
                var response = {
                        version: '1.0',
                        response: {
                            outputSpeech: {
                                type: 'PlainText',
                                text: speechOutput,
                            },
                            card: {
                                type: 'Simple',
                                title: `${cardTitle}`,
                                content: `${speechOutput}`,
                            },
                            reprompt: {
                                outputSpeech: {
                                    type: 'PlainText',
                                    text: repromptText,
                                }
                            },
                            shouldEndSession:false,
                        }
                };
              return callback(0,thisOBJ,response);
                
            }
        }else{
            var cardTitle = "<speak>Please select a collection by saying.<break time='.5s'/> play Collection name.<break time='.5s'/> Like Play The Ditty Bops.<break time='.5s'/> Or  Play Cowboy Junkies.<break time='.5s'/> Or Play GratefulDead.</speak>";
                var repromptText = 'Please select collection';
                var speechOutput = "<speak>Please select a collection by saying.<break time='.5s'/> play Collection name.<break time='.5s'/> Like Play The Ditty Bops.<break time='.5s'/> Or  Play Cowboy Junkies.<break time='.5s'/> Or Play GratefulDead.</speak>";
                
                var response = {
                        version: '1.0',
                        response: {
                            outputSpeech: {
                                type: 'SSML',
                                ssml: speechOutput,
                            },
                            card: {
                                type: 'Simple',
                                title: `${cardTitle}`,
                                content: `${speechOutput}`,
                            },
                            reprompt: {
                                outputSpeech: {
                                    type: 'SSML',
                                    ssml: repromptText,
                                }
                            },
                            shouldEndSession:false,
                        }
                };
              return callback(0,thisOBJ,response);
        }
    } 
    
    
    MyAudioPlayer.prototype.handleSessionEndRequest = function () {
        var cardTitle = 'Good bye';
        var speechOutput = "<speak>Thank you for trying The Grateful Dead Collection from The Internet Archive .<break time='1s'/> Have a nice day!</speak>";
        var repromptText = "<speak>Thank you for trying The Grateful Dead Collection from The Internet Archive .<break time='1s'/> Have a nice day!</speak>";
        var response = {
            version: '1.0',
            response: {
                        outputSpeech: {
                            type: 'SSML',
                            ssml: speechOutput,
                        },
                        card: {
                            type: 'Simple',
                            title: `${cardTitle}`,
                            content: `${speechOutput}`,
                        },
                        reprompt: {
                            outputSpeech: {
                                type: 'SSML',
                                ssml: repromptText,
                            }
                        },
                        shouldEndSession:true,
                        directives: [
                            {
                                type: "AudioPlayer.Stop"
                            }
                        ]
                    }
            };
            this.context.succeed(response);
    }
    
    MyAudioPlayer.prototype.getCollection=function(intent){
        var CurrentObject=this;
        collection= intent.slots.COLLECTION.value;
        if(collection !='' || collection !=undefined){
            collection=collection.replace(' ','');
            var checkCollectionUrl=podcastAPIURL+collection+'&fl[]=coverage&fl[]=creator&fl[]=description&fl[]=downloads&fl[]=identifier&fl[]=mediatype&fl[]=subject,year,location&fl[]=title&sort[]=downloads desc&rows=50&page='+page+'&indent=yes&output=json';
            console.log("Collection URL : "+checkCollectionUrl);
             https.get(checkCollectionUrl, function (res) {
                var body = '';
                res.on('data', function (data) {
                    body += data;
                });
                
                res.on('end', function () {
                    var result = JSON.parse(body);
                    if(result != null && result['response']['docs'].length>0){
                        var cardTitle = 'Provide City and Year';
                        var repromptText = "<speak>Please select a collection.<break time='.5s'/> Like Los Angeles 1971.</speak>";
                        var speechOutput = "<speak>The Collection "+collection+" has been selected.<break time='.5s'/> Now Please select City and Year or random.<break time='.5s'/> Like Los Angeles 1971 or random.</speak>";
                        var response = {
                            version: '1.0',
                            response: {
                                        outputSpeech: {
                                            type: 'SSML',
                                            ssml: speechOutput,
                                        },
                                        card: {
                                            type: 'Simple',
                                            title: `${cardTitle}`,
                                            content: `${speechOutput}`,
                                        },
                                        reprompt: {
                                            outputSpeech: {
                                                type: 'SSML',
                                                ssml: repromptText,
                                            }
                                        },
                                        shouldEndSession:false,
                                    }
                            };
                            CurrentObject.context.succeed(response);   
                    }else{
                        
                        var cardTitle = 'Collection not exists';
                        var repromptText = "<speak>Collection "+collection+" has no record.<break time='.5s'/> Please Try again by saying.<break time='.5s'/> play Collection name.<break time='.5s'/> Like Play The Ditty Bops.<break time='.5s'/> Or  Play Cowboy Junkies.<break time='.5s'/> Or Play GratefulDead.</speak>";
                        var speechOutput = "<speak>Sorry,<break time='.5s'/> Collection "+collection+" has no record. Please Try again by saying.<break time='.5s'/> play Collection name.<break time='.5s'/> Like Play The Ditty Bops.<break time='.5s'/> Or  Play Cowboy Junkies.<break time='.5s'/> Or Play GratefulDead.</speak>";
                        collection='';
                        var response = {
                            version: '1.0',
                            response: {
                                        outputSpeech: {
                                            type: 'SSML',
                                            ssml: speechOutput,
                                        },
                                        card: {
                                            type: 'Simple',
                                            title: `${cardTitle}`,
                                            content: `${speechOutput}`,
                                        },
                                        reprompt: {
                                            outputSpeech: {
                                                type: 'SSML',
                                                ssml: repromptText,
                                            }
                                        },
                                        shouldEndSession:false,
                                    }
                            };
                            CurrentObject.context.succeed(response);
                        
                    }
                   
                });
            }).on('error', function (e) {
                collection='';
                var cardTitle = "<speak>Unable to understand your request. Please Try again by saying. play Collection name. Like Play The Ditty Bops.<break time='.5s'/> Or  Play Cowboy Junkies.<break time='.5s'/> Or Play GratefulDead.</speak>";
                var repromptText = 'Waiting for your responce.';
                var speechOutput = "<speak>Sorry , Unable to understand your request. Please Try again by saying. play Collection name. Like Play The Ditty Bops.<break time='.5s'/> Or  Play Cowboy Junkies.<break time='.5s'/> Or Play GratefulDead.</speak>";
                var response = {
                    version: '1.0',
                    response: {
                                outputSpeech: {
                                    type: 'SSML',
                                    ssml: speechOutput,
                                },
                                card: {
                                    type: 'Simple',
                                    title: `${cardTitle}`,
                                    content: `${speechOutput}`,
                                },
                                reprompt: {
                                    outputSpeech: {
                                        type: 'SSML',
                                        ssml: repromptText,
                                    }
                                },
                                shouldEndSession:false,
                            }
                    };
                    CurrentObject.context.succeed(response);
            });
        }else{
            var cardTitle = 'Please provide valid collection';
            var repromptText = "<speak>Waiting for your responce.</speak>";
            var speechOutput = "<speak>Please provide a collection name.</speak>";
            var response = {
                version: '1.0',
                response: {
                            outputSpeech: {
                                type: 'SSML',
                                ssml: speechOutput,
                            },
                            card: {
                                type: 'Simple',
                                title: `${cardTitle}`,
                                content: `${speechOutput}`,
                            },
                            reprompt: {
                                outputSpeech: {
                                    type: 'SSML',
                                    ssml: repromptText,
                                }
                            },
                            shouldEndSession:false,
                        }
                };
                CurrentObject.context.succeed(response);
        }
    }
    
    MyAudioPlayer.prototype.Welcome = function () {
        
        var cardTitle = 'Welcome';
        // var repromptText = "<speak>Waiting for your responce.<break time='.5s'/>Please select a collection by saying.<break time='.5s'/> play Collection name.<break time='.5s'/> like Play The Ditty Bops.<break time='.5s'/> Or Play Cowboy Junkies.<break time='.5s'/> Or Play GratefulDead.<break time='.5s'/> Or serach songs by saying search keyword. <break time='.5s'/> Like search peter gabriel</speak>";
        // var speechOutput = "<speak>Welcome To The Internet Archive,<break time='1s'/> Please select a collection by saying.<break time='.5s'/> play Collection name.<break time='.5s'/> like Play The Ditty Bops.<break time='.5s'/> Or  Play Cowboy Junkies.<break time='.5s'/> Or Play GratefulDead.<break time='.5s'/> Or serach songs by saying search keyword. <break time='.5s'/> Like search peter gabriel</speak>";
         var repromptText = "<speak>Waiting for your responce.<break time='.5s'/>Please select a collection by saying.<break time='.5s'/> play Collection name.<break time='.5s'/> like Play The Ditty Bops.<break time='.5s'/> Or Play Cowboy Junkies.<break time='.5s'/> Or Play GratefulDead.</speak>";
        var speechOutput = "<speak>Welcome To The Internet Archive,<break time='1s'/> Please select a collection by saying.<break time='.5s'/> play Collection name.<break time='.5s'/> like Play The Ditty Bops.<break time='.5s'/> Or  Play Cowboy Junkies.<break time='.5s'/> Or Play GratefulDead.</speak>";
        var response = {
            version: '1.0',
            response: {
                        outputSpeech: {
                            type: 'SSML',
                            ssml: speechOutput,
                        },
                        card: {
                            type: 'Simple',
                            title: `${cardTitle}`,
                            content: `${speechOutput}`,
                        },
                        reprompt: {
                            outputSpeech: {
                                type: 'SSML',
                                ssml: repromptText,
                            }
                        },
                        shouldEndSession:false,
                    }
            };
            this.context.succeed(response);
    }
    
    
    MyAudioPlayer.prototype.play = function (intent, offsetInMilliseconds) {
       
        getAudioPlayList(intent,counter,this,offsetInMilliseconds,function(err,Obj,response){
            if(!err){
                Obj.context.succeed(response);
            }else{
              Obj.context.succeed(response);
            }
        })
           
    };
     
    MyAudioPlayer.prototype.stop = function () {
        var response = {
            version: "1.0",
            response: {
                shouldEndSession: true,
                directives: [
                    {
                        type: "AudioPlayer.Stop"
                    }
                ]
            }
        };
        this.context.succeed(response);
    };
     
    MyAudioPlayer.prototype.saveLastPlayed = function (userId, lastPlayed) {
        lastPlayedByUser[userId] = lastPlayed;
    };
     
    MyAudioPlayer.prototype.loadLastPlayed = function (userId) {
        var lastPlayed = null;
        if (userId in lastPlayedByUser) {
            lastPlayed = lastPlayedByUser[userId];
        }
        return lastPlayed;
    };