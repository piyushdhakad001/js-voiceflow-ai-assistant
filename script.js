const micBtn = document.getElementById("micBtn");
const status = document.getElementById("status");
const chatBox = document.getElementById("chatBox");

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

   chatBox.innerHTML += `
       <p><strong>You:</strong> ${transcript}</p>
   `;
   askGemini(transcript);

  //  status becomes : "Hey There"
   status.textContent = "You said :  Waiting..."
}


// connect API & send user message & recieve AI response
async function askGemini(userMessage){
  const response = await fetch("/.netlify/functions/askGemini",
    {
      // There are two common request types:
      // GET-->"Give me information."
      // POST -->"Here is some information.
      //  Please process it."
      method: "POST",

      // This tells Gemini: "I'm sending JSON data."
      headers: {
        "Content-Type": "application/json"
      },

      //JavaScript objects--> into a JSON string.
      body: JSON.stringify({

        // simply means:-->
        // Send this text to Gemini.
            message: userMessage
      })
    }
  );

   chatBox.innerHTML += `
       <p><strong>You:</strong> ${data}</p>
   `;

  // Gemini replies with JSON.
  // We convert that JSON into a JavaScript object
  //  so we can use it.
  const data = await response.json();
  alert(JSON.stringify(data));
}
