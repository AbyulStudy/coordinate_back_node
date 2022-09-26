import { load } from "cheerio";

/**
 * @param contents {@link load}
 * @return `<pre id="s_esriwkt_text"> {Text} </pre>`
 * @example
 * epsgCheerio('<h2 class="title">Hello world</h2>')
 * @description
 * `cheerio.load('<h2 class="title">Hello world</h2>')`
 */
export const epsgCheerio = (contents: string) => {
  let index = 0;
  const list: Array<{ title: string; code: any }> = [];
  const htmlTag = load(contents);
  const bodyList = htmlTag("div.code-definition-container");

  bodyList.map((i, el) => {
    const title = htmlTag(el).find("p").text().split("Definition: ")[1];
    const code = htmlTag(el).find("div.syntax pre").text();
    list[index] = {
      title,
      code
    };
    index++;
  });

  const result = list.filter(n => n.code);
  return result;
};
