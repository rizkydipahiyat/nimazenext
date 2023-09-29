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

    const articleElement = $('article[id^="post-"]');
    const postId = articleElement.attr("id");

    const data = {
      title: articleElement.find("header > h1").text(),
      embed: articleElement.find("div.player_embed > iframe").attr("data-src"),
      synopsis: articleElement
        .find(`div.animeinfomu-${postId} > p.sinoparea`)
        .text(),
      image: articleElement
        .find(`div.animeinfomu-${postId} > div.imgbox > img`)
        .attr("data-src"),
      genres: articleElement
        .find(`div.animeinfomu-${postId} > div.data > div.tagline`)
        .text()
        .split(/(?=[A-Z])/),
      prev: articleElement
        .find("div.naveps > div:nth-child(1) > a")
        .attr("href")
        ? articleElement
            .find("div.naveps > div:nth-child(1) > a")
            .attr("href")
            .replace(`${baseURL}`, "")
        : "#",
      detail: articleElement.find("div.naveps > div.nvs.nvsc > a").attr("href")
        ? articleElement
            .find("div.naveps > div.nvs.nvsc > a")
            .attr("href")
            .replace(`${baseURL}`, "")
        : "#",
      next: articleElement
        .find("div.naveps > div:nth-child(3) > a")
        .attr("href")
        ? articleElement
            .find("div.naveps > div:nth-child(3) > a")
            .attr("href")
            .replace(`${baseURL}`, "")
        : "#",
    };

    return NextResponse.json({ statusMsg: "OK", data: data });
  } catch (error) {
    return NextResponse.json({
      message: "Terjadi kesalahan saat mengambil data",
    });
  }
}
