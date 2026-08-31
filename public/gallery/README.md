# Gallery photos

Drop real photos of your nights and venues in this folder and they appear on the
site automatically, in alphabetical order. No code change is needed.

- Accepted formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`
- Recommended: landscape, at least 1600px wide, under ~500 KB each
- Suggested naming so the order is predictable:
  `01-rooftop-cairo.jpg`, `02-nile-boat.jpg`, `03-sahel-beach-club.jpg`
- If this folder has no images, the gallery section is hidden entirely, so the
  site never shows broken images.

To add a caption under a photo, edit `captions` in `src/lib/gallery.ts` using the
file name as the key:

```ts
const captions = {
  "01-rooftop-cairo.jpg": { ar: "روفتوب على النيل — القاهرة", en: "Nile rooftop — Cairo" },
};
```

Only use photos you have the right to publish. If a venue or a guest appears
recognisably, get their permission first.
