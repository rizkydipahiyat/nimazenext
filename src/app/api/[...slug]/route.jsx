import siteConfig from "@/lib/siteConfig";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

const baseURL = siteConfig.scrapUrl;

export const runtime = "edge";

export async function GET(slug) {
  const slugAnime = slug.url;
  const slugPart = slugAnime.split("/").pop();
  try {
    const rawResponse = await fetch(`${baseURL}/${slugPart || ""}`);
    const html = await rawResponse.text();
    const $ = cheerio.load(html);

    const datas = [];

    $("article").each((i, e) => {
      let getId = $("#player-option-1").attr("data-post");
      datas.push({
        title: $(e).find("header > h1").text(),
        embed: $(e).find("div.player_embed > iframe").attr("src"),
        synopsis: $(e).find(`div.animeinfomu-${getId} > p.sinoparea`).text(),
        image: $(e)
          .find(`div.animeinfomu-${getId} > div.imgbox > img`)
          .attr("src"),
        genres: $(e)
          .find(`div.animeinfomu-${getId} > div.data > div.tagline > a`)
          .text()
          .split(/(?=[A-Z])/),
        prev: $(e).find("div.naveps > div:nth-child(1) > a").attr("href")
          ? $(e)
              .find("div.naveps > div:nth-child(1) > a")
              .attr("href")
              .replace(`${baseURL}`, "")
          : "#",
        detail: $(e)
          .find("div.naveps > div.nvs.nvsc > a")
          .attr("href")
          .replace(`${baseURL}`, ""),
        next: $(e).find("div.naveps > div:nth-child(3) > a").attr("href")
          ? $(e)
              .find("div.naveps > div:nth-child(3) > a")
              .attr("href")
              .replace(`${baseURL}`, "")
          : "#",
      });
    });

    return NextResponse.json({ statusMsg: "OK", data: datas });
  } catch (error) {
    return NextResponse.json({
      message: "Terjadi kesalahan saat mengambil data",
    });
  }
}
