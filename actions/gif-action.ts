"use server";

import axios from "axios";

export const getGIF = async () => {
  const keywords = ["one+piece", "bleach+anime", "bankai", "jujustu+kaisen"];

  const selectedKeywords =
    keywords[Math.floor(Math.random() * keywords.length)];

  async function randomGIFProvider() {
    const tenor = async () => {
      const { data } = await axios.get(
        `https://tenor.googleapis.com/v2/search?q=${selectedKeywords}&key=${process.env.TENOR_API_KEY}&client_key=Ninjafire&random=true&limit=1&contentfilter=off`,
      );
      return { gif: data.results[0].media_formats.tinygif.url };
    };

    const giphy = async () => {
      if (process.env.NODE_ENV === "development") {
        // GIPHY API allows only 100 requests per hour, so during dev. please use gif
        return {
          gif: "https://media0.giphy.com/media/v1.Y2lkPWZlMzI0YWYzZXRmN290eDZrajJycmk2bXdnaXVrdTZ6NWpnYm1sc253ZW5maTgyOCZlcD12MV9naWZzX3JhbmRvbSZjdD1n/ff54BctkWA5ry/giphy.webp",
        };
      }

      const { data } = await axios.get(
        `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=${selectedKeywords}&rating=pg-13`,
      );
      return { gif: data.data.images.original.webp };
    };

    return Math.random() < 0.5 ? tenor() : giphy();
  }

  return randomGIFProvider();
};
