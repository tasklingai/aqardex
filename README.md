# AqarDex — free Dubai property data widgets

[AqarDex](https://aqardex.com) builds public Dubai real-estate tools on top of
Dubai Land Department (DLD) open data. This repository holds the **free embeddable
widgets** of those tools: live, auto-updating tables you can put on a blog, a
brokerage site or a news article with one `<iframe>`.

**Widget gallery with live preview and code generator:**
https://tasklingai.github.io/aqardex/

## Products

| Product | What it does |
|---|---|
| [Skyline Index](https://skylineindex.com) | Explore sales prices and rents by area, project and building. |
| [CraneScore](https://cranescore.com) | Explore Dubai's developments under construction using Dubai Land Department records. |
| [My Unit Worth](https://myunitworth.com) | Explore a home's estimated value using registered sales nearby. |

Brokers and agencies: the professional portal is at [b2b.aqardex.com](https://b2b.aqardex.com).

## Widgets

Every widget is a plain `<iframe>` served from the product's own domain. It updates
itself when new data is published, so there is nothing to maintain on your side.

| Product | Widget | `dataset` | Height |
|---|---|---|---|
| Skyline Index | Dubai Market Pulse — portal asking vs DLD gap | `asks` | 560 |
| Skyline Index | Dubai Market Pulse — net rental yield league | `yields` | 560 |
| Skyline Index | Dubai Market Pulse — 1Y price momentum leaders | `momentum` | 560 |
| CraneScore | Progress — completion stages | `stages` | 560 |
| CraneScore | Progress — top off-plan corridors | `corridors` | 560 |
| CraneScore | Progress — DLD end-year pipeline | `schedule` | 560 |
| CraneScore | Progress — payment-plan splits | `plans` | 560 |
| My Unit Worth | Seller benchmarks — seller months of supply | `supply` | 460 |
| My Unit Worth | Seller benchmarks — bedroom value bands | `bands` | 460 |
| My Unit Worth | Seller benchmarks — recent handover resales | `handovers` | 460 |

Languages: `en` English, `ar` Arabic, `ru` Russian, `zh` Chinese, `hi` Hindi, `tr` Turkish.
Put the language code in the path (`/en/`, `/ar/`, …).

### Skyline Index — Dubai Market Pulse

```html
<div class="skyline-index-embed" style="max-width:100%;margin:1rem 0;">
  <iframe src="https://skylineindex.com/en/pulse/embed?dataset=asks" title="Skyline Index — Dubai Market Pulse" width="100%" height="560" style="border:1px solid #dbe2ef;border-radius:12px;display:block;max-width:100%;background:#ffffff;" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <p style="margin:0.5rem 0 0;font:12px/1.5 system-ui,-apple-system,sans-serif;color:#526077;">Source: <a href="https://skylineindex.com/en/pulse" target="_blank" rel="noopener">Skyline Index — Dubai Market Pulse</a> (Dubai Land Department open data)</p>
</div>
```

### CraneScore — Progress

```html
<div class="cranescore-embed" style="max-width:100%;margin:1rem 0;">
  <iframe src="https://cranescore.com/en/progress/embed?dataset=stages" title="CraneScore — Progress" width="100%" height="560" style="border:1px solid rgba(128,128,128,0.28);border-radius:10px;display:block;max-width:100%;background:transparent;" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <p style="margin:0.5rem 0 0;font:12px/1.5 system-ui,-apple-system,sans-serif;color:#64748b;">Source: <a href="https://cranescore.com/en/progress" target="_blank" rel="noopener">CraneScore — Progress</a> (Dubai Land Department open data)</p>
</div>
```

### My Unit Worth — Dubai Home Value & Seller Benchmarks

```html
<div class="myunitworth-embed" style="max-width:100%;margin:1rem 0;">
  <iframe src="https://myunitworth.com/en/benchmarks/embed?dataset=supply" title="My Unit Worth — Seller benchmarks" width="100%" height="460" style="border:0;border-radius:8px;display:block;max-width:100%;overflow:hidden;" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <p style="margin:0.5rem 0 0;font:12px/1.5 system-ui,-apple-system,sans-serif;color:#596573;">Source: <a href="https://myunitworth.com/en/benchmarks" target="_blank" rel="noopener">My Unit Worth — Dubai Home Value &amp; Seller Benchmarks</a> (Dubai Land Department open data)</p>
</div>
```

## Terms of use

- The widgets are free for any website, commercial or not.
- Keep the "Source:" line under the widget and its link. Do not hide, shorten or
  `nofollow` it, and do not crop the widget so its own credit is not visible.
- Do not change the figures or present them as your own data. Quote them with the
  product name and "Dubai Land Department open data".
- Do not scrape the widget pages or call them at high volume. For bulk data, write to
  [mail@aqardex.com](mailto:mail@aqardex.com).
- Figures are derived estimates and aggregates, not a valuation or financial advice.

The code in this repository (the snippets and the gallery page) is under the
[MIT License](LICENSE). The data shown inside the widgets belongs to AqarDex and is
not covered by that license; the terms above apply to it.

## Security and privacy for your site

- The widget is a cross-origin `<iframe>`: it cannot read or change your page, your
  cookies or your visitors' input.
- The snippets add no `<script>` to your page.
- `referrerpolicy="strict-origin-when-cross-origin"` sends only your site's origin, never
  the full page URL.

Report a security issue as described in [SECURITY.md](SECURITY.md).

## Contact

- General: [mail@aqardex.com](mailto:mail@aqardex.com)
- Press and data requests: [press@aqardex.com](mailto:press@aqardex.com)
- Web: [aqardex.com](https://aqardex.com)

AqarDex is a product of [Taskling LLC](https://taskling.ai).
