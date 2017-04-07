import {
    Vec3,
    Color,
    Xfo
} from '../Math';
import {
    TreeItem
} from '../SceneTree';
import {
    UserAvatar
} from './UserAvatar';

let getUrlVars = () => {
    let url = window.location.href,
        projectID,
        args = [],
        hash;

    let parts = url.split('#');
    let tmp = parts[0].split('/');
    projectID = tmp[tmp.length - 1];

    let hashes = parts.length > 1 ? parts[1].split('&') : [];
    for (let i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        args[hash[0]] = hash[1];
    }
    return {
        projectID,
        args
    };
}

function random(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4();;
}

let generateSessionID = () => {
    let words = [
        'sun',
        'sky',
        'cow',
        'six',
        'sir',
        'tag',
        'view'
    ];
    let sessionID = words[random(0, 6)] + words[random(0, 6)].toUpperCase() + words[random(0, 6)];
    window.location.replace('#id=' + sessionID);
    // window.history.pushState("Session", "Title", window.location+'?id=' + sessionID);
    return sessionID;
}

let getJSON = (url, callback) => {
    function createElements(elements) {
        // Assuming you get an array of objects.
        elements = JSON.parse(elements);
        callback(elements);
    }
    let request = new XMLHttpRequest();
    request.onload = createElements;
    request.open("get", url, true);
    request.send()
}

let avatarColors = [
    new Color(0.0, 0.15, 0.15),
    new Color(0.0, 0.85, 0.15),
    new Color(0.0, 0.15, 0.85),
    new Color(0.0, 0.85, 0.85),
    new Color(0.75, 0.15, 0.15),
    new Color(0.75, 0.85, 0.15),
    new Color(0.75, 0.15, 0.85),
    new Color(0.75, 0.85, 0.85)
];
let randomAvatarColor = () => {
    return avatarColors[random(0, avatarColors.length)];
}

class SessionClient {

    constructor(renderer) {
        this.__renderer = renderer;

        let listeners = {};
        let linesCount = 0;
        let connectedUsers = {};
        let lastTime = 0;
        let lastEvent = 0;
        let actualRecording = null;
        let replayData = null;

        // Client IDs need to be persistent.
        // TODO: Integrate with app login, so we can track users
        // by thier profile.
        let clientData; // = JSON.parse(localStorage.getItem('clientData'));
        // getJSON('//freegeoip.net/json', function(data) {
        //     console.log(JSON.stringify(data, null, 2));
        // });

        if (!clientData) {
            clientData = {
                id: guid(),
                color: randomAvatarColor()
            };
            // localStorage.setItem('clientData', JSON.stringify(clientData));
        }
        let myId = clientData.id;

        let urlVars = getUrlVars();
        let projectID = urlVars.projectID;
        let sessionID = urlVars.args['id'];
        if (!sessionID) {
            sessionID = generateSessionID();
        }
        /*
                ///////////////////////////////////////////////////////
                //let generateRecordingUI = () => {
                let div = renderer.getDiv();

                // <div class="controlsContainer">
                //     <div>
                //         <select id="recSelector">
                //             <option value="new">New recording</option>
                //         </select>
                //     </div>
                //     <div class="icon" id="rec"><img src="rec.svg" alt=""></div>
                //     <div class="icon" id="play"><img src="playArrow.svg" alt=""></div>
                // </div>
                let controlsContainer = document.createElement('div');
                controlsContainer.setAttribute('class', 'controlsContainer');
                controlsContainer.style.position = 'fixed';
                controlsContainer.style.left = '20px';
                controlsContainer.style.bottom = '20px';
                controlsContainer.style.padding = '6px';

                // let recSelectorDiv = document.createElement('div');
                // controlsContainer.appendChild(recSelectorDiv);
                // let recSelector = document.createElement('select');
                // recSelector.class = "controlsContainer";
                // recSelectorDiv.appendChild(recSelector);
                // let newRecOption = document.createElement('option');
                // newRecOption.value = "new";
                // newRecOption.innerText = "New recording";
                // recSelector.appendChild(newRecOption);

                let clearButton = document.createElement('button');
                // clearButton.class = "icon";
                // clearButton.style.position = 'fixed';
                // clearButton.style.right = '20px';
                // clearButton.style.bottom = '20px';
                // clearButton.style.padding = '20px';
                clearButton.innerText = 'Clear';
                controlsContainer.appendChild(clearButton);

                let recButton = document.createElement('button');
                // recButton.class = "icon";
                // recButton.style.position = 'fixed';
                // recButton.style.right = '20px';
                // recButton.style.bottom = '20px';
                // recButton.style.padding = '20px';
                recButton.innerText = 'Record';
                controlsContainer.appendChild(recButton);

                let playButton = document.createElement('button');
                // playButton.class = "icon";
                // playButton.style.position = 'fixed';
                // playButton.style.right = '20px';
                // playButton.style.bottom = '20px';
                // playButton.style.padding = '20px';
                playButton.innerText = 'Play';
                controlsContainer.appendChild(playButton);

                div.appendChild(controlsContainer);

                //<input id="timeline" type="range" min="0" max="100" step="0.1" value="0" style="width: 600px" />
                let timeline = document.createElement('input');
                timeline.setAttribute('id', 'timeline');
                timeline.setAttribute('type', 'range');
                timeline.setAttribute('min', '0');
                timeline.setAttribute('max', '100');
                timeline.setAttribute('step', '0.1');
                timeline.setAttribute('value', "0");
                let rhsSpace = 360;
                let resizeTimeline = () => {
                    timeline.style.width = (div.clientWidth - rhsSpace) + 'px';
                }
                renderer.vrViewportSetup.connect(() => {
                    rhsSpace = 480;
                    resizeTimeline();
                });
                renderer.resized.connect((width, height) => {
                    resizeTimeline();
                })
                resizeTimeline();
                div.appendChild(timeline);

                timeline.style.display = 'none';
                playButton.style.display = 'none';

                clearButton.onclick = function(event) {
                    event.preventDefault();
                    if (socketOpen) {
                        ws.send(JSON.stringify({
                            type: 'clearRecording',
                        }));
                    }
                };

                recButton.onclick = function(event) {
                    event.preventDefault();

                    if (socketOpen) {
                        if (!actualRecording) {
                            ws.send(JSON.stringify({
                                type: 'startRecording',
                            }));
                            recButton.innerText = 'Stop Recording';
                        } else {
                            recButton.innerText = 'Record';
                            ws.send(JSON.stringify({
                                type: 'stopRecording',
                            }));
                        }
                    }
                };

                timeline.addEventListener('input', function(event) {
                    if (replayData) {
                        travelTime(timeline.value);
                    }
                });
                // }
                ///////////////////////////////////////////////////////
        */

        //////////////////////////////////////
        // Websocket setup

        let socketOpen = false;

        let ws = new WebSocket("ws://localhost:5000", "proteocolOne");

        ws.onopen = function(event) {
            socketOpen = true;
            ws.send(JSON.stringify({
                type: 'join',
                clientData: clientData,
                projectID: projectID,
                sessionID: sessionID
            }));
            // generateRecordingUI();
        };
        ws.onmessage = function(message) {
            let jsonData = JSON.parse(message.data);
            console.log("onmessage:" + jsonData.type + " client:" + jsonData.client);
            if (listeners[jsonData.type]) {
                listeners[jsonData.type](jsonData.client, jsonData.data);
            }
        };

        let avatarsTreeRoot = new TreeItem("avatarsTreeRoot");
        //scene.getRoot().addChild(avatarsTreeRoot);
        renderer.getCollector().addTreeItem(avatarsTreeRoot);
        this.__avatarsTreeRoot = avatarsTreeRoot;

        // const clientsList = document.createElement('div');
        // clientsList.style.position = 'fixed';
        // clientsList.style.left = '20px';
        // clientsList.style.bottom = '20px';
        // clientsList.style.padding = '20px';
        // clientsList.style.backgroundColor = 'silver';
        // div.appendChild(clientsList);

        listeners.sessionClients = function(client, data) {
            for(let clientData of data){
                if (clientData.id != myId) {
                    onUserConnected(clientData.id, clientData.color);
                }
            }
        };

        listeners.sessionEvents = function(client, data) {
            let sessionEvents = data;
            for (let eventData of sessionEvents) {
                handleEvent(eventData.event);
            }
        };

        listeners.replayState = function(client, data) {
            replayData = data;
        };

        listeners.clientDisconnect = function(client, data) {
            onUserDisconnected(client);
        };

        // Updates the state of the connected user avatars.
        // listeners.updateState = function(message) {
        //     updateAvatars(message.data);
        // };


        listeners.joinClient = function(client, data) {
            if (!connectedUsers[client]) {
                onUserConnected(client, data.color);
            }
        };

        listeners.viewChanged = function(client, data) {
            onUserViewChange(client, data);
        };

        listeners.strokeStarted = function(client, data) {
            onUserStrokeStarted(client, data);
        };

        listeners.strokeSegmentAdded = function(client, data) {
            onUserStrokeSegmentAdded(client, data);
        };

        listeners.clearRecording = function(client, data) {
            clearButton.disabled = true;
            timeline.style.display = 'none';
            playButton.style.display = 'none';

            // const option = document.createElement('option');
            // option.value = message.data.id;
            // option.innerHTML = message.data.id;
            // recSelector.appendChild(option);
            // recSelector.value = message.data.id;

            // actualRecording = message.data;
        };

        listeners.startRecording = function(client, data) {
            clearButton.disabled = true;
            timeline.style.display = 'none';
            playButton.style.display = 'none';
        };

        listeners.stopRecording = function(client, data) {
            clearButton.disabled = false;
            // recSelector.value = data.id;
            timeline.style.display = 'block';
            playButton.style.display = 'block';
        };
        /*
                ////////////////////////////////////////
                // Playback
                let playWait = false;
                let actualReplay = null;
                let requestId = null;
                let start = null;
                let duration = null;
                let rate = null;
                let isPlaying = false;


                let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

                window.requestAnimationFrame = requestAnimationFrame;

                // After joining, or finishing a recording
                // we recieve the reording data from the server.
                listeners.replayData = function(message) {
                    replayData = message.data;
                    playButton.style.display = 'block';
                    timeline.style.display = 'block';
                    timeline.value = 0;
                    if (playWait) {
                        play();
                    }
                };

                function play() {
                    duration = new Date(replayData.stopTime) - new Date(replayData.startTime);
                    rate = duration / 100;
                    playWait = false;
                    isPlaying = true;
                    start = Date.now();
                    // requestId = requestAnimationFrame(step);
                    renderer.redrawOccured.connect(step);
                    renderer.startContinuousDrawing();
                }

                function stop() {
                    // start = null;
                    // duration = null;
                    isPlaying = false;
                    // stateByTime(0);
                    // timeline.value = 0;
                    // window.cancelAnimationFrame(requestId);
                    renderer.stopContinuousDrawing();
                    renderer.redrawOccured.disconnect(step);
                }

                function step() {
                    let actualMS = Date.now() - start;
                    if (actualMS < duration) {
                        stateByTime(actualMS);
                        timeline.value = actualMS / rate;
                        // requestId = requestAnimationFrame(step);
                    } else {
                        stop();
                    }
                }


                playButton.onclick = function(event) {
                    event.preventDefault();

                    if (!playWait && !isPlaying) {
                        // if (replayData && replayData.id == recSelector.value) {
                        playButton.innerText = 'Stop';
                        play();
                        // } else {
                        //     playWait = true;
                        //     ws.send(JSON.stringify({
                        //         type: 'requestReplay',
                        //         data: {
                        //             id: recSelector.value
                        //         }
                        //     }))
                        // }
                        return;
                    }

                    if (isPlaying) {
                        playButton.innerText = 'Play';
                        stop();
                    }
                };


                // recSelector.onchange = function(event) {
                //     if (recSelector.value == 'new') {
                //         timeline.style.display = 'none';
                //         playButton.style.display = 'none';
                //     } else {
                //         ws.send(JSON.stringify({
                //             type: 'requestReplay',
                //             data: {
                //                 id: recSelector.value
                //             }
                //         }))
                //     }
                // };
        */
        ////////////////////////////////////////
        // Register listeners with the renderer

        renderer.viewChanged.connect(function(data) {
            // convert the data type to raw json and send to the server.
            if (socketOpen) {
                ws.send(JSON.stringify({
                    type: 'viewChanged',
                    data: data
                }));
            }
        });

        renderer.pointerMoved.connect(function(data) {
            // convert the data type to raw json and send to the server.
            // console.log("mousePos:", mousePos.toJSON());
            // console.log("ray:", ray.toJSON());
            if (socketOpen) {
                ws.send(JSON.stringify({
                    type: 'pointerMoved',
                    data: data
                }));
            }
        });

        renderer.actionStarted.connect((data) => {
            if (socketOpen)
                ws.send(JSON.stringify(data));
        });
        renderer.actionOccuring.connect((data) => {
            if (socketOpen)
                ws.send(JSON.stringify(data));
        });
        renderer.actionEnded.connect((data) => {
            if (socketOpen)
                ws.send(JSON.stringify(data));
        });


        // let updateAvatars = (data) => {
        //     // let text = 'Clients: <br />';

        //     Object.keys(data.clients).forEach(function(key) {
        //         let client = data.clients[key];
        //         // text += '- ' + (key == myId ? 'me' : key) + ': position [x:' + client.position.x + ', y:' + client.position.y + '] <br />'

        //         if (key != myId) {
        //             if (!connectedUsers[key]) {
        //                 onUserConnected(key, client.color);
        //             }

        //             if (client) {
        //                 onUserViewChange(key, client)
        //             }
        //         }
        //     });

        //     // clientsList.innerHTML = text;
        // }


        let travelTime = (percent) => {
            const duration = new Date(replayData.duration);
            const rate = duration / 100;
            const timeSet = percent * rate;
            stateByTime(timeSet);
        }

        let resetState = () => {
            Object.keys(connectedUsers).forEach(function(key) {
                connectedUsers[key].userMarker.destroy();
                onUserDisconnected(key);
            });
        }

        let stateByTime = (time) => {
            // console.log("stateByTime:" + time);
            const initState = {};

            if (time < lastTime) {
                lastTime = 0;
                lastEvent = 0;
                resetState();
            }

            for (lastEvent; lastEvent < replayData.events.length; lastEvent++) {
                const currentEvent = replayData.events[lastEvent];
                const actualTime = new Date(currentEvent.timestamp);
                if (actualTime > time) {
                    break;
                }

                // if (!connectedUsers[currentEvent.client]) {
                //     onUserConnected(currentEvent.client, replayData.clients[currentEvent.client].color);
                // }

                handleEvent(currentEvent.event);
            }

            lastTime = time;
        }

        let handleEvent = (event) => {

            switch (event.type) {
                case 'joinClient':
                    if (!connectedUsers[event.client]) {
                        onUserConnected(event.client, event.data);
                    }
                    break;
                case 'clientDisconnect':
                    if (connectedUsers[event.client]) {
                        onUserDisconnected(event.client);
                    }
                    break;
                case 'viewChanged':
                    onUserViewChange(event.client, event.data);
                    break;
                case 'pointerMoved':
                    onUserPointerMoved(event.client, event.data);
                    break;
                case 'strokeStarted':
                    onUserStrokeStarted(event.client, event.data);
                    break;
                case 'strokeSegmentAdded':
                    onUserStrokeSegmentAdded(event.client, event.data);
                    break;

            }
        }

        ////////////////////////////////////////////////////////
        // Handle connections from other users.

        let onUserConnected = (client, data) => {
            connectedUsers[client] = new UserAvatar(client, data, avatarsTreeRoot);
        };

        let onUserDisconnected = (client) => {
            if (client in connectedUsers) {
                connectedUsers[client].destroy();
                delete connectedUsers[client];
                renderer.requestRedraw();
            }
        };

        let onUserViewChange = (client, data) => {
            connectedUsers[client].onViewChange(data);
            renderer.requestRedraw();
        };
        let onUserPointerMoved = (client, data) => {
            connectedUsers[client].pointerMoved(data);
            renderer.requestRedraw();
        };

        let onUserStrokeStarted = (client, data) => {
            let userMarker = connectedUsers[client].userMarker;
            let xfo = new Xfo();
            xfo.fromJSON(data.xfo);
            let color = new Color();
            color.fromJSON(data.color);
            userMarker.startStroke(xfo, color, data.thickness, data.id);
        };

        let onUserStrokeSegmentAdded = (client, data) => {
            let userMarker = connectedUsers[client].userMarker;
            let xfo = new Xfo();
            xfo.fromJSON(data.xfo);
            userMarker.addSegmentToStroke(data.id, xfo);
        }
    }

};

export {
    SessionClient
};