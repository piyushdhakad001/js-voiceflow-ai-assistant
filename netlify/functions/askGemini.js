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
  const aiResponse = await data.candidate[0].content.parts[0].text;

  return {
    statusCode: 200,
    body: JSON.stringify(aiResponse),
  };

}