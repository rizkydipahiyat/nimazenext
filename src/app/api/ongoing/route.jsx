import siteConfig from "@/lib/siteConfig";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

const baseURL = siteConfig.scrapUrl;

export const runtime = "edge";

export async function GET() {
  try {
    const rawResponse = await fetch(`${baseURL}/ongoing-list`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
      next: { revalidate: 60 * 60 },
    });
    const html = await rawResponse.text();
    const $ = cheerio.load(html);

    const datas = [];

    $("#wrap > main > div.contentpost > div.animeseries").each((i, e) => {
      let imageUrl = $(e)
        .find("div.sera > a > div.limit > img")
        .attr("data-src");
      let newHeight = 500;
      const updateImageUrl = imageUrl.replace(/h=\d+/, `h=${newHeight}`);
      const url = $(e).find("div.sera > a ").attr("href");
      const urlObject = new URL(url);
      const slug = urlObject.pathname.substring(1);
      datas.push({
        image: updateImageUrl,
        title: $(e)
          .find("div.sera > a > div.limit > div.title.less > span")
          .text(),
        slug: `/${slug}`,
        score: $(e)
          .find("div.sera > a > div.limit > span.kotakscore")
          .text()
          .trim(),
      });
    });

    datas.pop();

    return NextResponse.json({ statusMsg: "OK", data: datas });
  } catch (error) {
    return NextResponse.json({
      message: "Terjadi kesalahan saat mengambil data",
    });
  }
}
