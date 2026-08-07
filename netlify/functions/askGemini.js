exports.handler = async (event) => {

  const { message } = JSON.parse(event.body);

   const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.AQ_Ab8RN6J_MGS_D1ooKMfJdqADrUoyCYpIVhQCDuvUid_e4KRAvw}`,
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