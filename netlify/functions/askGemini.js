exports.handler = async (event) => {

  const { message } = JSON.parse(event.body);

   const response = await fetch(
    `[12:17 am, 11/08/2026] py'-'sh: https://chatgpt.com/s/t_6a7a1cb5ccd08191930c098165d8ecc4
[12:19 am, 11/08/2026] py'-'sh: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
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

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };

}