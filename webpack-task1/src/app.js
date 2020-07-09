import './scss/base.scss';
import '../dist/style.css';
import {chooseMode, voiceBtnMicrophone, getStream, getAllVoices} from './js/toolbar.js';
const btnAllVoices = document.getElementById("btnAllVoices");
const btnMicrophone = document.getElementById("btnMicrophone");
const btnStream = document.getElementById("btnStream");

btnAllVoices.addEventListener("click", function(){chooseMode('AllVoices', this)});
btnMicrophone.addEventListener("click", function(){chooseMode('Microphone', this)});
btnStream.addEventListener("click", function(){chooseMode('Stream', this)});

btnMicrophone.addEventListener("click", function(){voiceBtnMicrophone()});
btnStream.addEventListener("click", function(){getStream()});
btnAllVoices.addEventListener("click", function(){getAllVoices()});

chooseMode('AllVoices', btnAllVoices);
