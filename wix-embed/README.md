# PUSH casting call — Wix embed

Two files that put the casting call design onto the existing Wix page
(`/catherinewillis-bbc3-push-opencasting`, reachable as `/castingcall`).

- `push-casting-embed.html` — the page content, self-contained. Goes into a Wix
  **Embed HTML** element.
- `velo-page-code.js` — Velo page code that resizes the embed to fit its
  content.

## Installing

1. In the Wix Editor, open the PUSH page and add an **Embed HTML** element
   (Add → Embed Code → Embed HTML). Stretch it to full width.
2. Choose the **Code** option and paste the whole of `push-casting-embed.html`.
3. Turn on **Dev Mode**, open the page's own code file, and paste
   `velo-page-code.js` into it.
4. Check the element's ID in the editor. If it isn't `html1`, change the
   selector at the top of the Velo file to match.
5. Preview, then publish.

Step 3 is optional. Without it the embed keeps whatever fixed height you gave it
in the editor and its content scrolls inside that box, which looks wrong on a
phone. With it, the page grows to fit.

## Differences from the standalone design

- **Light theme only.** The standalone version follows the visitor's OS dark
  mode. Inside a Wix page that would make the embed disagree with everything
  around it, so the embed is fixed to the light palette.
- **`target="_top"` on the mailto links.** Links inside the embed's iframe would
  otherwise try to open in the iframe itself, and some browsers block that.

## Known trade-off: search engines can't read it

Content inside an embed lives in an iframe, and Google indexes it against the
iframe's own URL rather than the page it sits on. So none of this copy counts
towards the page ranking for "West Yorkshire casting call" or similar.

The page's title and meta description are set separately through the SEO API and
are unaffected — but the body text is invisible to search.

If search traffic matters for this page, the alternative is to rebuild the design
with native Wix text and container elements, using the standalone design as the
reference. That is slower, and it is the only version search engines can read.

For a casting call driven by a poster and social posts over about a week, the
embed is a reasonable trade. For a page meant to be found through search, it
isn't.
