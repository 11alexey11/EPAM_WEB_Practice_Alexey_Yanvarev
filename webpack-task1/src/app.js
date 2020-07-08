import './scss/base.scss';
import '../dist/style.css';
import {chooseMode} from './js/toolbar.js';

const btnAllVoices = document.getElementById("btnAllVoices");
const btnMicrophone = document.getElementById("btnMicrophone");
const btnStream = document.getElementById("btnStream");

btnAllVoices.addEventListener("click", function(){chooseMode('AllVoices', this)});
btnMicrophone.addEventListener("click", function(){chooseMode('Microphone', this)});
btnStream.addEventListener("click", function(){chooseMode('Stream', this)});

chooseMode('AllVoices', btnAllVoices);
