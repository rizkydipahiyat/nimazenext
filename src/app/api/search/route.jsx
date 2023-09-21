import siteConfig from "@/lib/siteConfig";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

const baseURL = siteConfig.scrapUrl;
export const runtime = "edge";

export async function GET(req) {
  const params = new URL(req.url);
  const query = params.searchParams.get("query");
  // example for search => 'http://localhost:5000/search?query=bleach'
  try {
    const rawResponse = await fetch(`${baseURL}/?s=${query || ""}`);
    const html = await rawResponse.text();
    const $ = cheerio.load(html);

    const datas = [];
    const animesList = [];

    $("#wrap > main > div.result > ul > li").each((i, e) => {
      let imageUrl = $(e).find("a > div.top > img").attr("src");
      let newHeight = 500;
      const updateImageUrl = imageUrl.replace(/h=\d+/, `h=${newHeight}`);
      const url = $(e).find("a").attr("href");
      const urlObject = new URL(url);
      const slug = urlObject.pathname.substring(1);
      animesList.push({
        image: updateImageUrl,
        title: $(e).find("a > div.top > h2").text(),
        slug: `/${slug}`,
        shortDesc: $(e).find("a > div.top > div.descs").text().trim(),
        score: $(e).find("a > div.boxinfores > span.nilaiseries").text(),
        type: $(e).find("a > div.boxinfores > span.typeseries").text(),
        genres: $(e)
          .find("span.genrebatas")
          .text()
          .trim()
          .split(/(?=[A-Z])/)
          .map((genre) => genre.trim()),
      });
    });

    $("#wrap > main").each((i, e) => {
      let textResult = $(e).find("div.releases > h1").text();
      let newText = textResult.replace("Hasil Pencarian ", "");
      datas.push({
        result: newText,
        listAnime: animesList,
      });
    });

    return NextResponse.json({ statusMsg: "OK", data: { datas, animesList } });
  } catch (error) {
    return NextResponse.json({
      message: "Terjadi kesalahan saat mengambil data",
    });
  }
}
