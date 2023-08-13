import siteConfig from "@/lib/siteConfig";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

const baseURL = siteConfig.scrapUrl;

export const runtime = "edge";

export async function GET() {
  try {
    const rawResponse = await fetch(`${baseURL}/popular-series`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
      next: { revalidate: 60 * 60 },
    });
    const html = await rawResponse.text();
    const $ = cheerio.load(html);

    const datas = [];

    $("#wrap > main > div.contentpost > ul > li").each((i, e) => {
      let imageUrl = $(e).find("a > img").attr("data-src");
      let newHeight = 500;
      const updateImageUrl = imageUrl.replace(/h=\d+/, `h=${newHeight}`);
      datas.push({
        rank: i + 1,
        title: $(e).find("a > div > h2").text(),
        slug: $(e).find("a").attr("href").replace(`${baseURL}`, ""),
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
