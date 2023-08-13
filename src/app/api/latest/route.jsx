import siteConfig from "@/lib/siteConfig";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

const baseURL = siteConfig.scrapUrl;

export const runtime = "edge";

export async function GET() {
  try {
    const rawResponse = await fetch(`${baseURL}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
      next: { revalidate: 60 * 60 },
    });
    const html = await rawResponse.text();
    const $ = cheerio.load(html);

    const datas = [];
    const popularSummer = [];

    $("#sidebar_right > div:nth-child(2) > div > ul > li").each((i, e) => {
      let imageUrl = $(e).find("a > div.top > img").attr("data-src");
      let newHeight = 500;
      const updateImageUrl = imageUrl.replace(/h=\d+/, `h=${newHeight}`);
      popularSummer.push({
        image: updateImageUrl,
        title: $(e).find("a > div.top > h4").text(),
        slug: $(e).find("a").attr("href").replace(`${baseURL}`, ""),
        shortDesc: $(e).find("a > div.top > div.descs > p").text(),
        score: $(e)
          .find("a > div.top > div.boxinfores > span.nilaiseries")
          .text(),
        genres: $(e)
          .find("span.genrebatas")
          .text()
          .trim()
          .split(/(?=[A-Z])/)
          .map((genre) => genre.trim()),
      });
    });

    $("#postbaru > div.misha_posts_wrap > article").each((i, e) => {
      let imageUrl = $(e).find("div > a > div > img").attr("data-src");
      let newHeight = 500;
      const updateImageUrl = imageUrl.replace(/h=\d+/, `h=${newHeight}`);
      datas.push({
        title: $(e).find("div > a > div > h3 > span").text(),
        slug: $(e).find("div > a").attr("href").replace(`${baseURL}`, ""),
        eps: $(e).find("div > a > div > span").text().trim(),
        image: updateImageUrl,
      });
    });

    datas.pop();

    return NextResponse.json({
      statusMsg: "OK",
      data: datas,
      popularSummer,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Terjadi kesalahan saat mengambil data",
    });
  }
}
