import siteConfig from "@/lib/siteConfig";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

const baseURL = siteConfig.scrapUrl;

export const runtime = "edge";

export async function GET(slug) {
  const slugAnime = slug.url;
  const slugPart = slugAnime.split("/").pop();
  try {
    const rawResponse = await fetch(`${baseURL}/anime/${slugPart || ""}`);
    const html = await rawResponse.text();
    const $ = cheerio.load(html);

    const datas = [];
    const episodeList = [];

    $("article > div.episodelist > ul > li").each((i, e) => {
      episodeList.push({
        slug: $(e).find("span.t1 > a").attr("href").replace(`${baseURL}`, ""),
        title: $(e).find("span.t1 > a").text(),
        date: $(e).find("span.t3").text(),
      });
    });

    let genres = $("div.kotakseries > div.data > div.tagline")
      .text()
      .split(/(?=[A-Z])/);

    $("article").each((i, e) => {
      let imageUrl = $(e)
        .find("div.kotakseries > div.poster > img")
        .attr("src");
      let newHeight = 500;
      const updateImageUrl = imageUrl.replace(/h=\d+/, `h=${newHeight}`);
      datas.push({
        title: $(e)
          .find("div.kotakseries > div:nth-child(4) > span:nth-child(1)")
          .text(),
        image: updateImageUrl,
        type: $(e)
          .find(
            "div.kotakseries > div.data > div.scoreseries > span.typeseries"
          )
          .text(),
        score: $(e)
          .find(
            "div.kotakseries > div.data > div.scoreseries > span.nilaiseries"
          )
          .text(),
        episodes: $(e)
          .find("div.kotakseries > div.data > div.extra > span.durasiseries")
          .text(),
        status: $(e)
          .find("div.kotakseries > div.data > div.extra > span.statusseries")
          .text(),
        rating: $(e)
          .find("div.kotakseries > div.data > div.extra > span.ratedseries")
          .text(),
        date: $(e)
          .find("div.kotakseries > div.data > div.extra > span.dateseries > a")
          .text(),
        genres: genres,
        popularity: $(e)
          .find(
            "div.kotakseries > div:nth-child(3) > span.infoseries:nth-child(1)"
          )
          .text(),
        members: $(e)
          .find(
            "div.kotakseries > div:nth-child(3) > span.infoseries:nth-child(2)"
          )
          .text(),
        duration: $(e)
          .find(
            "div.kotakseries > div:nth-child(3) > span.infoseries:nth-child(3)"
          )
          .text(),
        studio: $(e)
          .find(
            "div.kotakseries > div:nth-child(3) > span.infoseries:nth-child(4)"
          )
          .text(),
        aired: $(e)
          .find(
            "div.kotakseries > div:nth-child(3) > span.infoseries:nth-child(5)"
          )
          .text(),
        synopsis: $(e).find("div.entry-content.seriesdesc > p").text(),
        listEpisode: episodeList,
      });
    });

    return NextResponse.json({ statusMsg: "OK", data: datas });
  } catch (error) {
    return NextResponse.json({
      message: "Terjadi kesalahan saat mengambil data",
    });
  }
}
