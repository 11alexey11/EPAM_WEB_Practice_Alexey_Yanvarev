import * as io from "socket.io-client";
const socket = io('ws://voicy-speaker.herokuapp.com/');

export function playSocket() {
    socket.on('playStarSound', () => {
    var sound = document.getElementById("audio");
    sound.play();
})
}

socket.send()

