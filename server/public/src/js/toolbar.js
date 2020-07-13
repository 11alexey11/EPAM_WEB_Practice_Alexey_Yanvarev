import * as io from "socket.io-client";

export function chooseMode(mode, el) {
    const activeText = document.getElementsByClassName("activeText");
    for (let i = 0; i < activeText.length; i++) {
        activeText[i].style.display = "none";
    }

    const barButton = document.getElementsByClassName("barButton");
    for (let i = 0; i < barButton.length; i++) {
        barButton[i].style.color = "";
    }
    document.getElementById(mode).style.display = "block";
    el.style.color = '#3CB371';
}

export function getStream() {
    let url = new URL('https://voicy-speaker.herokuapp.com');
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url + 'voices');
    
    xhr.responseType = 'json';
    
    xhr.send();
    
    xhr.onload = function() {
        if (xhr.status != 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
            const audioBlob = new Blob([new Uint8Array(xhr.response[xhr.response.length - 1].audioBlob[0].data).buffer]);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        }
    };
}

export function voiceBtnMicrophone() {
    const socket = io.connect('https://voicy-speaker.herokuapp.com');
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            let audioChunks = [];
            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();
                socket.emit('audioMessage', audioChunks);
            });

            setTimeout(() => {
                mediaRecorder.stop();
            }, 5000);
        });
}

export function getAllVoices() {
    let url = new URL('https://voicy-speaker.herokuapp.com');
    let xhr = new XMLHttpRequest();

    xhr.open('GET', `${url}voices`);
    
    xhr.responseType = 'json';
    
    xhr.send();
    
    xhr.onload = function() {
        if (xhr.status != 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
            const info = document.querySelector('.info');
            info.innerHTML = '';
            const ul = document.createElement('ul');
            info.appendChild(ul);
            const voicesLength = xhr.response.length;
            for(let i = 0; i < voicesLength; i++) {
                if (xhr.response[i].audioBlob.length) {
                    const li = document.createElement('li');
                    li.innerHTML = xhr.response[i].timeStamp.substr(0, 24);
                    ul.appendChild(li);
                    li.addEventListener('click', function() {
                        const audioBlob = new Blob([new Uint8Array(xhr.response[i].audioBlob[0].data).buffer]);
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const audio = new Audio(audioUrl);
                        audio.play();
                    })
                }
            }
        }
    };
}