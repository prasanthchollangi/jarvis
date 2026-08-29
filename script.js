/* ================================
JARVIS AI - Frontend JavaScript
================================ */

const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");
const voiceButton = document.getElementById("voiceButton");
const clock = document.getElementById("clock");

/* ================================
CLOCK
================================ */

function updateClock() {

const now = new Date();

const time = now.toLocaleTimeString();

clock.textContent = time;

}

setInterval(updateClock, 1000);

updateClock();

/* ================================
ADD MESSAGE TO CHAT
================================ */

function addMessage(sender, message, type) {

const messageDiv = document.createElement("div");

messageDiv.classList.add("message");

if (type === "user") {
    messageDiv.classList.add("user-message");
} else {
    messageDiv.classList.add("jarvis-message");
}


const senderName = document.createElement("strong");

senderName.textContent = sender;


const messageText = document.createElement("p");

messageText.textContent = message;


messageDiv.appendChild(senderName);

messageDiv.appendChild(messageText);


chatMessages.appendChild(messageDiv);


/* Automatically scroll down */

chatMessages.scrollTop = chatMessages.scrollHeight;

}

/* ================================
JARVIS BASIC BRAIN
================================ */

function getJarvisResponse(command) {

command = command.toLowerCase();


/* Greetings */

if (
    command.includes("hello") ||
    command.includes("hi") ||
    command.includes("hey")
) {

    return "Hello. How can I assist you today?";

}


/* Name */

if (
    command.includes("your name") ||
    command.includes("who are you")
) {

    return "I am Jarvis, your personal AI assistant.";

}


/* Time */

if (command.includes("time")) {

    return "The current time is " + new Date().toLocaleTimeString();

}


/* Date */

if (command.includes("date") ||
    command.includes("day")
) {

    return "Today is " +
        new Date().toLocaleDateString(
            undefined,
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

}


/* Search */

if (command.startsWith("search ")) {

    const query = command.replace("search", "").trim();

    if (query !== "") {

        window.open(
            "https://www.google.com/search?q=" +
            encodeURIComponent(query),
            "_blank"
        );

        return "Searching the web for " + query;

    }

}


/* Open YouTube */

if (command.includes("open youtube")) {

    window.open(
        "https://www.youtube.com",
        "_blank"
    );

    return "Opening YouTube.";

}


/* Open Google */

if (command.includes("open google")) {

    window.open(
        "https://www.google.com",
        "_blank"
    );

    return "Opening Google.";

}


/* Help */

if (
    command.includes("help") ||
    command.includes("what can you do")
) {

    return "I can currently respond to basic commands, tell you the time and date, search the web, open websites, listen using your microphone, and speak responses.";

}


/* Default Response */

return "I do not have an AI brain connected yet. Connect me to an AI API or backend and I will be able to answer intelligent questions.";

}

/* ================================
SEND MESSAGE
================================ */

function sendMessage() {

const message = userInput.value.trim();


if (message === "") {
    return;
}


/* Show user message */

addMessage(
    "YOU",
    message,
    "user"
);


/* Clear input */

userInput.value = "";


/* Jarvis response */

setTimeout(() => {

    const response =
        getJarvisResponse(message);


    addMessage(
        "JARVIS",
        response,
        "jarvis"
    );


    speak(response);

}, 500);

}

/* ================================
BUTTON CLICK
================================ */

sendButton.addEventListener(
"click",
sendMessage
);

/* ================================
ENTER KEY
================================ */

userInput.addEventListener(
"keypress",
function (event) {

    if (event.key === "Enter") {

        sendMessage();

    }

}

);

/* ================================
TEXT TO SPEECH
================================ */

function speak(text) {

if (
    "speechSynthesis" in window
) {

    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    speech.rate = 1;

    speech.pitch = 0.9;

    speech.volume = 1;


    window.speechSynthesis.speak(
        speech
    );

}

}

/* ================================
VOICE RECOGNITION
================================ */

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if (SpeechRecognition) {

const recognition =
    new SpeechRecognition();


recognition.continuous = false;

recognition.lang = "en-US";

recognition.interimResults = false;


/* Voice Button */

voiceButton.addEventListener(
    "click",
    function () {

        recognition.start();


        voiceButton.innerHTML =
            "🎙️ LISTENING...";


        voiceButton.style.transform =
            "scale(1.1)";

    }
);


/* Voice Result */

recognition.addEventListener(
    "result",
    function (event) {

        const transcript =
            event.results[0][0].transcript;


        userInput.value =
            transcript;


        sendMessage();

    }
);


/* Recognition Ends */

recognition.addEventListener(
    "end",
    function () {

        voiceButton.innerHTML =
            "🎤 CLICK TO SPEAK";


        voiceButton.style.transform =
            "scale(1)";

    }
);


/* Recognition Error */

recognition.addEventListener(
    "error",
    function (event) {

        console.log(
            "Voice recognition error:",
            event.error
        );


        voiceButton.innerHTML =
            "🎤 CLICK TO SPEAK";


        voiceButton.style.transform =
            "scale(1)";

    }
);

} else {

voiceButton.addEventListener(
    "click",
    function () {

        alert(
            "Voice recognition is not supported in this browser."
        );

    }
);

}

/* ================================
STARTUP MESSAGE
================================ */

window.addEventListener(
"load",
function () {

    console.log(
        "JARVIS SYSTEM ONLINE"
    );

}

);
