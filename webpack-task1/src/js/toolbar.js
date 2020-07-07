const ioClient = io.connect('ws://voicy-speaker.herokuapp.com/')
ioClient.on('connect', socket => {
    ioClient.send('hello world')
    ioClient.on('message', msg => console.log(msg))
});

function chooseMode(mode, el) {
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

document.getElementById("btnAllVoices").click();
