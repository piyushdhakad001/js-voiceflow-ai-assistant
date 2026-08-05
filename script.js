const micBtn = document.getElementById("micBtn");
const status = document.getElementById("status");

//Find the Speech Recognition class(blueprint,factory) and store it in SpeechRecognition. factory knows how to build speech recognier
const SpeechRecognition = 
window.SpeechRecognition || window.webkitSpeechRecognition;


// ---- Microphone listening functionality------
// Speech recognizer object;
const recognition = new SpeechRecognition();

recognition.lang = "en-US";

//browser- API wait until you have finished speeaking
recognition.interimResults = false;

// listen once then automatic stop.
recognition.continuous = false;


// Mic-Button functionality
micBtn.addEventListener("click", () => {
  status.textContent = "Status: Listening..."
  // microphone will start listening
  recognition.start();
});


// -------After Listening---------------------

// after listening , browser API says 
// "Hey! I recognized something." inside (event) package
recognition.onresult = (event) => {

//   event
//  └── results
//       └── first result
//            └── first alternative 
//                 └── transcript
//                      "Hey There"
   const transcript = event.results[0][0].transcript;


   console.log(transcript);

  //  status becomes : "Hey There"
   status.textContent = `You said :  ${transcript}`
}
