import siteConfig from "@/lib/siteConfig";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

const baseURL = siteConfig.scrapUrl;

export const runtime = "edge";

export async function GET() {
  try {
    const rawResponse = await fetch(`${baseURL}/jadwal-rilis`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
      next: { revalidate: 60 * 60 },
    });
    const html = await rawResponse.text();
    const $ = cheerio.load(html);
    let datas = [];
    let senin = [];
    let selasa = [];
    let rabu = [];
    let kamis = [];
    let jumat = [];
    let sabtu = [];
    let minggu = [];

    $("#tab-1 > div > ul > li").each((i, e) => {
      let day1 = "Senin";
      let imageUrl = $(e).find("a > div.top > img").attr("data-src");
      let newHeight = 500;
      const updateImageUrl = imageUrl.replace(/h=\d+/, `h=${newHeight}`);
      const url = $(e).find("a").attr("href");
      const urlObject = new URL(url);
      const slug = urlObject.pathname.substring(1);
      senin.push({
        day: day1,
        title: $(e).find(" a > div.top > h2").text(),
        slug: `/${slug}`,
        image: updateImageUrl,
        type: $(e).find(" a > div.boxinfores > span.typeseries").text(),
        score: $(e).find(" a > div.boxinfores > span.nilaiseries").text(),
        totalEps: $(e).find(" a > div.top > div > p").text().trim(),
        genres: $(e)
          .find(" span.genrebatas")
          .text()
          .trim()
          .split(/(?=[A-Z])/)
          .map((genre) => genre.trim()),
      });
    });

    $("#tab-2 > div > ul > li").each((i, e) => {
      let day2 = "Selasa";
      let imageUrl = $(e).find("a > div.top > img").attr("data-src");
      let newHeight = 500;
      const updateImageUrl = imageUrl.replace(/h=\d+/, `h=${newHeight}`);
      const url = $(e).find("a").attr("href");
      const urlObject = new URL(url);
      const slug = urlObject.pathname.substring(1);
      selasa.push({
        day: day2,
        title: $(e).find(" a > div.top > h2").text(),
        slug: `/${slug}`,
        image: updateImageUrl,
        type: $(e).find(" a > div.boxinfores > span.typeseries").text(),
        score: $(e).find(" a > div.boxinfores > span.nilaiseries").text(),
        totalEps: $(e).find(" a > div.top > div > p").text().trim(),
        genres: $(e)
          .find(" span.genrebatas")
          .text()
          .trim()
          .split(/(?=[A-Z])/)
          .map((genre) => genre.trim()),
      });
    });

    $("#tab-3 > div > ul > li").each((i, e) => {
      let day3 = "Rabu";
      let imageUrl = $(e).find("a > div.top > img").attr("data-src");
      let newHeight = 500;
      const updateImageUrl = imageUrl.replace(/h=\d+/, `h=${newHeight}`);
      const url = $(e).find("a").attr("href");
      const urlObject = new URL(url);
      const slug = urlObject.pathname.substring(1);
      rabu.push({
        day: day3,
        title: $(e).find(" a > div.top > h2").text(),
        slug: `/${slug}`,
        image: updateImageUrl,
        type: $(e).find(" a > div.boxinfores > span.typeseries").text(),
        score: $(e).find(" a > div.boxinfores > span.nilaiseries").text(),
        totalEps: $(e).find(" a > div.top > div > p").text().trim(),
        genres: $(e)
          .find(" span.genrebatas")
          .text()
          .trim()
          .split(/(?=[A-Z])/)
          .map((genre) => genre.trim()),
      });
    });

    $("#tab-4 > div > ul > li").each((i, e) => {
      let day4 = "Kamis";
      let imageUrl = $(e).find("a > div.top > img").attr("data-src");
      let newHeight = 500;
      const updateImageUrl = imageUrl.replace(/h=\d+/, `h=${newHeight}`);
      const url = $(e).find("a").attr("href");
      const urlObject = new URL(url);
      const slug = urlObject.pathname.substring(1);
      kamis.push({
        day: day4,
        title: $(e).find(" a > div.top > h2").text(),
        slug: `/${slug}`,
        image: updateImageUrl,
        type: $(e).find(" a > div.boxinfores > span.typeseries").text(),
        score: $(e).find(" a > div.boxinfores > span.nilaiseries").text(),
        totalEps: $(e).find(" a > div.top > div > p").text().trim(),
        genres: $(e)
          .find(" span.genrebatas")
          .text()
          .trim()
          .split(/(?=[A-Z])/)
          .map((genre) => genre.trim()),
      });
    });

    $("#tab-5 > div > ul > li").each((i, e) => {
      let day5 = "Jumat";
      let imageUrl = $(e).find("a > div.top > img").attr("data-src");
      let newHeight = 500;
      const updateImageUrl = imageUrl.replace(/h=\d+/, `h=${newHeight}`);
      const url = $(e).find("a").attr("href");
      const urlObject = new URL(url);
      const slug = urlObject.pathname.substring(1);
      jumat.push({
        day: day5,
        title: $(e).find(" a > div.top > h2").text(),
        slug: `/${slug}`,
        image: updateImageUrl,
        type: $(e).find(" a > div.boxinfores > span.typeseries").text(),
        score: $(e).find(" a > div.boxinfores > span.nilaiseries").text(),
        totalEps: $(e).find(" a > div.top > div > p").text().trim(),
        genres: $(e)
          .find(" span.genrebatas")
          .text()
          .trim()
          .split(/(?=[A-Z])/)
          .map((genre) => genre.trim()),
      });
    });

    $("#tab-6 > div > ul > li").each((i, e) => {
      let day6 = "Sabtu";
      let imageUrl = $(e).find("a > div.top > img").attr("data-src");
      let newHeight = 500;
      const updateImageUrl = imageUrl.replace(/h=\d+/, `h=${newHeight}`);
      const url = $(e).find("a").attr("href");
      const urlObject = new URL(url);
      const slug = urlObject.pathname.substring(1);
      sabtu.push({
        day: day6,
        title: $(e).find(" a > div.top > h2").text(),
        slug: `/${slug}`,
        image: updateImageUrl,
        type: $(e).find(" a > div.boxinfores > span.typeseries").text(),
        score: $(e).find(" a > div.boxinfores > span.nilaiseries").text(),
        totalEps: $(e).find(" a > div.top > div > p").text().trim(),
        genres: $(e)
          .find(" span.genrebatas")
          .text()
          .trim()
          .split(/(?=[A-Z])/)
          .map((genre) => genre.trim()),
      });
    });

    $("#tab-7 > div > ul > li").each((i, e) => {
      let day7 = "Minggu";
      let imageUrl = $(e).find("a > div.top > img").attr("data-src");
      let newHeight = 500;
      const updateImageUrl = imageUrl.replace(/h=\d+/, `h=${newHeight}`);
      const url = $(e).find("a").attr("href");
      const urlObject = new URL(url);
      const slug = urlObject.pathname.substring(1);
      minggu.push({
        day: day7,
        title: $(e).find(" a > div.top > h2").text(),
        slug: `/${slug}`,
        image: updateImageUrl,
        type: $(e).find(" a > div.boxinfores > span.typeseries").text(),
        score: $(e).find(" a > div.boxinfores > span.nilaiseries").text(),
        totalEps: $(e).find(" a > div.top > div > p").text().trim(),
        genres: $(e)
          .find(" span.genrebatas")
          .text()
          .trim()
          .split(/(?=[A-Z])/)
          .map((genre) => genre.trim()),
      });
    });

    datas.push({
      senin,
      selasa,
      rabu,
      kamis,
      jumat,
      sabtu,
      minggu,
    });

    return NextResponse.json({
      statusMsg: "OK",
      data: datas,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Terjadi kesalahan saat mengambil data",
    });
  }
}
