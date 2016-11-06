/**
 * Created by tedshaffer on 11/5/16.
 */
const https = require('https');

function getAthleteData(state = null) {

    let athleteData = {};

    if (state) {
        const athlete = state.selectedAthlete;
        if (athlete) {
            athleteData.athlete = {};
            athleteData.athlete.id = athlete.stravaAthleteId;
            athleteData.athlete.firstname = athlete.firstname;
            athleteData.athlete.lastname = athlete.lastname;
            athleteData.athlete.email = athlete.email;
            athleteData.accessToken = athlete.accessToken;
            return athleteData;
        }
    }

    return null;
}


function fetchStravaData(endPoint, state) {

    return new Promise(function (resolve, reject) {

        const athleteData = getAthleteData(state);

        var options = {
            host: 'www.strava.com',
            path: '/api/v3/' + endPoint,
            port: 443,
            headers: {
                'Authorization': 'Bearer ' + athleteData.accessToken
            }
        };

        var str = "";

        https.get(options, function (res) {
            res.on('data', function (d) {
                str += d;
            });
            res.on('end', function () {
                var data = JSON.parse(str);
                resolve(data);
            });

        }).on('error', function (err) {
            console.log('Caught exception: ' + err);
            reject(err);
        });
    });
}


export function fetchNearbySegments(swLat, swLng, neLat, neLng, getState) {
    return new Promise((resolve, reject) => {

        const url = "segments/explore?bounds=" + swLat + "," + swLng + "," + neLat + "," + neLng;
        fetchStravaData(url, getState()).then( (stravaSegments) => {
            console.log("pizza1");
            console.log("pizza2");
            resolve(stravaSegments);
        });
    });
}

