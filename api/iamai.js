export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { messages } = req.body;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.8,
        max_tokens: 300
      })
    });

    const data = await openaiRes.json();
    res.status(200).json({ response: data.choices?.[0]?.message?.content?.trim() });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong." });
  }
}
