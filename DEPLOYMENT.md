# Vercel Deployment & Verification Checklist (SSG)

Checklist for verifying a deploy to **Preview** and then to **Production**.
Run the commands below against the deployment URL first, then against `https://malifaux.ru`.

Set the base URL you are checking:

```bash
# Preview (copy the exact URL from the Vercel dashboard)
BASE="https://malifaux-ru-git-<branch>-<team>.vercel.app"
# Production
BASE="https://malifaux.ru"
```

---

## 1. HTTP status codes

Expected results:

| Path                    | Expected |
| :---------------------- | :------- |
| `/`                     | 200      |
| `/posts/post-100`       | 200      |
| `/categories/neverborn` | 200      |
| `/page/2`               | 200      |
| `/tales`                | 200      |
| `/nonexistent`          | 404      |

One-shot check (prints `status  path` for each route):

```bash
for path in / /posts/post-100 /categories/neverborn /page/2 /tales /nonexistent; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "${BASE}${path}")
  printf '%s  %s\n' "$code" "$path"
done
```

Notes:

- `/nonexistent` must return a real HTTP **404** (not a `200` that renders the 404 page). With `fallback: false` on the dynamic routes, missing slugs resolve to a genuine 404.
- `/page/2` exists because pagination is 14 posts/page and there are 238 published posts.

---

## 2. `__NEXT_DATA__` payload size (< 300 KB)

The homepage is the heaviest page; its `__NEXT_DATA__` must stay under 300 KB after the P0 optimization.

```bash
curl -s "${BASE}/" -o /tmp/malifaux-home.html
node -e '
  const fs = require("fs");
  const h = fs.readFileSync("/tmp/malifaux-home.html", "utf8");
  const m = h.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!m) { console.error("__NEXT_DATA__ not found"); process.exit(1); }
  const b = Buffer.byteLength(m[1], "utf8");
  console.log("__NEXT_DATA__ bytes:", b);
  console.log(b < 307200 ? "PASS (< 300 KB)" : "FAIL (>= 300 KB)");
'
```

Alternative (GNU grep):

```bash
curl -s "${BASE}/" \
  | grep -o '<script id="__NEXT_DATA__" type="application/json">.*</script>' \
  | wc -c
```

Threshold reminder: `< 300 KB` == `< 307200` bytes.

---

## 3. `/_next/image` endpoint

The site uses `next/image` (see `layouts/components/ImageFallback.js`). Verify the image-optimization endpoint responds with an image.

```bash
curl -s -o /dev/null -w '%{http_code}\n' \
  "${BASE}/_next/image?url=%2Fimages%2FM3ed.png&w=640&q=75"
```

Expected: `200`. Confirm the response is an image (should be `image/avif` or `image/webp`, falling back to `image/png`):

```bash
curl -s -D - -o /dev/null \
  "${BASE}/_next/image?url=%2Fimages%2FM3ed.png&w=640&q=75" \
  | grep -iE 'HTTP/|content-type'
```

---

## 4. DNS for the custom domain

| Host             | Type   | Value                |
| :--------------- | :----- | :------------------- |
| `malifaux.ru`    | `A`    | `76.76.21.21`        |
| `www.malifaux.ru`| `CNAME`| `cname.vercel-dns.com` |

- Add both records at your DNS provider (apex `A` record, `www` as `CNAME`).
- Add `malifaux.ru` and `www.malifaux.ru` in **Vercel → Project → Settings → Domains** so Vercel auto-provisions TLS (HTTPS) certificates.
- Keep TTL low while switching; remember that DNS changes propagate according to the record's TTL.

---

## 5. Safe rollback via Vercel Instant Rollback

If a Production deploy is broken, roll back **before** re-deploying a fix:

1. Open **Vercel → your project → Deployments**.
2. Locate the last known-good Production deployment (the one before the broken deploy).
3. Click its **“⋯”** menu and choose **Rollback** (Instant Rollback). Vercel re-routes Production traffic to that immutable build instantly — no rebuild and no new deployment.
4. Wait a few seconds, then re-run the status-code and `__NEXT_DATA__` checks from sections 1–2 against `https://malifaux.ru`.
5. Only after the site is healthy again, fix the cause and ship a new deploy. (Optional CLI alternative: `vercel rollback`.)
