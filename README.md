# Lake Norman Cybercab

A personal project to buy a Cybercab or two and run a small autonomous fleet on Lake Norman, North Carolina.

This is not a booking site, and it is not affiliated with Tesla, Inc. or any Tesla product.

## Live

- Project preview: https://chadakeith.github.io/lake-norman-cybercab/
- Canonical (after DNS): https://lakenormancybercab.com/

`CNAME` on `main` is `lakenormancybercab.com`. Canonical, Open Graph, `robots.txt`, and `sitemap.xml` already use that host. The plural domain `lakenormancybercabs.com` is a later Cloudflare 301 and is not configured in this repo.

Until DNS points at GitHub Pages, use the github.io preview. If GitHub starts redirecting github.io to the custom domain before DNS exists, the preview will not load until the records below are in place.

## Stack

Static HTML, CSS, and a little JS. GitHub Pages from `main` via `.github/workflows/pages.yml`.

## Local preview

```bash
python3 -m http.server 8080
```

Open http://127.0.0.1:8080/

## GitHub Pages

The workflow deploys on every push to `main` and can also be run by hand (`workflow_dispatch`).

This repo’s automation token cannot create the Pages site (`Resource not accessible by integration` on the Pages API). The first **Deploy Pages** run on `main` fails at “Configure Pages” until the source is chosen by hand. One click:

1. Open [Settings → Pages](https://github.com/chadakeith/lake-norman-cybercab/settings/pages)
2. Build and deployment → Source → **GitHub Actions**
3. Actions → **Deploy Pages** → **Run workflow** (or re-run the failed job). The next run can publish. Saving the GitHub Actions source does not deploy by itself.

## Custom domain

After the Pages site exists:

1. Settings → Pages → Custom domain → `lakenormancybercab.com` → Save
2. Leave **Enforce HTTPS** on after the certificate issues

DNS (Cloudflare or the registrar), when you are ready to cut over. Apex can be the four GitHub Pages A records, or a flattened CNAME to `chadakeith.github.io`. Start grey-cloud (DNS only) until the GitHub certificate issues.

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `chadakeith.github.io` |

`www` should be a CNAME to `chadakeith.github.io`, not to the project path. Do not add a wildcard.
