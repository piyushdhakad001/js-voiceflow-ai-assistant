exports.handler = async (event) => {

  const { message } = JSON.parse(event.body);

   const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: message,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  // extract only ai response text from whole data package
  // data
//  ↓
// candidates
//  ↓
// [0]                 → first answer
//  ↓
// content
//  ↓
// parts
//  ↓
// [0]                 → first piece of text
//  ↓
// text                → actual AI answer

// "Go inside Gemini's response and get the actual text of its first answer."
  const aiResponse = data.candidates[0].content.parts[0].text;


  return {
    statusCode: 200,
    body: JSON.stringify(aiResponse),
  };

}