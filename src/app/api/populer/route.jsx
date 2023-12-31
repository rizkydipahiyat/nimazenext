import siteConfig from "@/lib/siteConfig";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

const baseURL = siteConfig.scrapUrl;

export const runtime = "edge";

export async function GET() {
  try {
    const rawResponse = await fetch(`${baseURL}/popular-series`);
    const html = await rawResponse.text();
    const $ = cheerio.load(html);

    const datas = [];

    $("#wrap > main > div.contentpost > ul > li").each((i, e) => {
      let imageUrl = $(e).find("a > img").attr("src");
      let newHeight = 500;
      const updateImageUrl = imageUrl.replace(/h=\d+/, `h=${newHeight}`);
      const url = $(e).find("a").attr("href");
      const urlObject = new URL(url);
      const slug = urlObject.pathname.substring(1);
      datas.push({
        rank: i + 1,
        title: $(e).find("a > div > h2").text(),
        slug: `${slug}`,
        image: updateImageUrl,
        genres: $(e)
          .find("a > div > div.viewer")
          .text()
          .trim()
          .split(/(?=[A-Z])/)
          .map((genre) => genre.trim()),
      });
    });

    let data = datas.slice(0, 10);

    return NextResponse.json({ statusMsg: "OK", data: data });
  } catch (error) {
    return NextResponse.json({
      message: "Terjadi kesalahan saat mengambil data",
    });
  }
}
