import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const baseURL = "https://links.stcvit.in/api/url/shorten";
  const data = {
    longUrl: longUrl,
  };
  const copyToClipBoard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Hogaya bhai copy");
  };
  const getShortURL = () => {
    axios
      .post(baseURL, data, {
        headers: {
          "content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.shortUrl !== "") {
          setShortUrl(response.data.shortUrl);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="flex gap-3">
        <div>Actual Link</div>
        <div>
          <input
            placeholder="Enter the link"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            autoFocus={true}
            className="border-2 border-black"
          />
        </div>
        <div>
          <button className="bg-blue-300 rounded-lg p-2" onClick={getShortURL}>
            Get short URL
          </button>
        </div>
      </div>
      <div>{shortUrl === "" ? "" : shortUrl}</div>
      {shortUrl ? (
        <div>
          <button
            onClick={copyToClipBoard}
            className="bg-blue-300 rounded-lg p-2"
          >
            Yaha click karke copy crow
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
