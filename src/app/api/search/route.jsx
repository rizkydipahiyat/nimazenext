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
    console.log(query);
    const rawResponse = await fetch(`${baseURL}/?s=${query || ""}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
      cache: "no-cache",
    });
    const html = await rawResponse.text();
    const $ = cheerio.load(html);

    const datas = [];
    const animesList = [];

    if (!$("#wrap > main > div.result > ul > li").html()) {
      throw new Error(
        "Page not found, you may request more than the maximum page"
      );
    }
    $("#wrap > main > div.result > ul > li").each((i, e) => {
      let imageUrl = $(e).find("a > div.top > img").attr("src");
      let newHeight = 500;
      const updateImageUrl = imageUrl.replace(/h=\d+/, `h=${newHeight}`);
      animesList.push({
        image: updateImageUrl,
        title: $(e).find("a > div.top > h2").text(),
        slug: $(e).find("a").attr("href").replace(`${baseURL}`, ""),
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
