# Photo Appendix Generator

A browser-based tool for arranging field photographs, editing captions, preserving available EXIF/GPS information, and exporting a formatted photo appendix.

All photo processing occurs in the browser. Photos and generated appendices are not uploaded to the application server.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The app is configured for deployment as a Cloudflare Worker with static assets. Cloudflare Workers Builds can connect to this GitHub repository, build with `npm run build`, and deploy with `npx wrangler deploy`.

## Privacy and project data

Photo content and appendix generation are handled in the browser. Photos are not intentionally uploaded to this app's own backend, but hosted code and dependencies still load over the network. Location is opt-in on each visit: GPS coordinates, map links and automatic device location are disabled by default. Opening a generated Google Maps link transmits its coordinates to Google.

The app remembers only non-identifying appearance/export preferences. Project names, company labels, uploaded logos and GPS choices are not retained across browser sessions. Earlier saved settings are sanitised when the updated application first loads. Exported documents, GPS CSV files and photographs may still contain confidential site or client information: save them only to an approved project filing system. Generated images are re-encoded to avoid embedding original photo EXIF metadata.

**Clear photos** discards the currently loaded photos, cached preview and in-session location. It does not delete files already downloaded, the original images on your device, or browser files saved elsewhere.
