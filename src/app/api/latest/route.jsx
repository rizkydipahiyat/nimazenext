import siteConfig from "@/lib/siteConfig";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

const baseURL = siteConfig.scrapUrl;

export const runtime = "edge";

export async function GET() {
  try {
    const response = await fetch(`${baseURL}`);
    const html = await response.text();
    const $ = cheerio.load(html);
    const data = [];
    const popularSummer = [];

    $("#sidebar_right > div:nth-child(6) > div > ul > li").each((i, e) => {
      let imageUrl = $(e).find("a > div > img").attr("src");
      let newHeight = 500;
      const updateImageUrl = imageUrl.replace(/h=\d+/, `h=${newHeight}`);
      const url = $(e).find("a").attr("href");
      const urlObject = new URL(url);
      const slug = urlObject.pathname.substring(1);
      popularSummer.push({
        image: updateImageUrl,
        title: $(e).find("a > div > h4").text(),
        slug: `${slug}`,
        shortDesc: $(e).find("a > div > div.descs > p").text(),
        score: $(e).find("a > div > div.boxinfores > span.nilaiseries").text(),
        genres: $(e)
          .find("span.genrebatas")
          .text()
          .trim()
          .split(/(?=[A-Z])/)
          .map((genre) => genre.trim()),
      });
    });

    $("#postbaru > div.misha_posts_wrap > article").each((i, e) => {
      const url = $(e).find("a").attr("href");
      const urlObject = new URL(url);
      const slug = urlObject.pathname.substring(1);
      data.push({
        title: $(e).find("div > a > div > h3 > span").text(),
        slug: `${slug}`,
        eps: $(e).find("div > a > div > span").text().trim(),
        image: $(e).find("div > a > div > img").attr("src"),
      });
    });

    return NextResponse.json({
      statusMsg: "OK",
      data,
      popularSummer,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Terjadi kesalahan saat mengambil data",
    });
  }
}
