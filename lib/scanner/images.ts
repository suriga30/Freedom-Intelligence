import * as cheerio from "cheerio";

export interface ImageResult {
  totalImages: number;
  imagesWithAlt: number;
  imagesWithoutAlt: number;
}

export function extractImages(html: string): ImageResult {
  const $ = cheerio.load(html);

  const images = $("img");

  let imagesWithAlt = 0;
  let imagesWithoutAlt = 0;

  images.each((_, image) => {
    const alt = $(image).attr("alt");

    if (alt && alt.trim().length > 0) {
      imagesWithAlt++;
    } else {
      imagesWithoutAlt++;
    }
  });

  return {
    totalImages: images.length,
    imagesWithAlt,
    imagesWithoutAlt,
  };
}