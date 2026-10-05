# 农历

An educational and reusable traditional Chinese lunisolar-calendar app.

- `data/nongli.json` — structured knowledge data
- `src/nongli-engine.js` — reusable knowledge engine
- `src/nongli-calendar.js` — live lunar-date calculation adapter
- `src/lunar-loader.js` — jsDelivr CDN first, local vendor fallback
- `vendor/lunar.js` — offline/local fallback library

The app explains 朔、望、月相、大小月、闰月、中气、农历月份与日期读法, while the live layer calculates today's actual lunar date and leap-month status.
