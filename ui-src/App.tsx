import React, { useState } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai"
// Find your key at https://beta.openai.com/account/api-keys
const apiKey = "YOUR KEY"
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

function App() {
  const [prompt, setPrompt] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)


  const sendPrompt = async () => {
    const response = await openai.createImage({
      prompt,
      n: 2,
      size: "256x256",
    });
    setImageUrl(response.data.data[0].url ?? "https://res.cloudinary.com/dkzaozc1s/image/upload/v1668132359/undefined-url-wordpress_kcogv2.jpg")
  }

  const addImageToCanvas = () => {}

  return (
    <div className="App">
      <p>generate image from text</p>
      {imageUrl ? (<><button disabled onClick={addImageToCanvas}>add to canvas (coming soon)</button>
        <img src={imageUrl} alt="DALL-E image" /></>) : null}
      <input type="text" placeholder="a dog with 2 faces" value={prompt} onChange={e => setPrompt(e.target.value)} />
      <button
        disabled={loading}
        onClick={sendPrompt}
      >
        generate
      </button>
    </div>
  );
}

export default App;
