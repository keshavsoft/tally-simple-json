# tally-simple-json

[![npm version](https://img.shields.io/npm/v/tally-simple-json.svg)](https://www.npmjs.com/package/tally-simple-json)
[![license](https://img.shields.io/npm/l/tally-simple-json.svg)](https://github.com/keshavsoft/tally-simple-json/blob/main/LICENSE)

A clean, modern JavaScript client for querying Tally and receiving structured **JSON** responses.

---

## How It Works

`tally-simple-json` is a lightweight JSON wrapper built on top of [`tally-xml-tdl`](https://www.npmjs.com/package/tally-xml-tdl):

```text
Your App
   │
   ▼
tally-simple-json
   │  delegates queries
   ▼
tally-xml-tdl ───> tally-extract ───> Tally HTTP Server (port 9000)
   │                                           │
   │  receives raw XML                         ▼
   ▼                                    XML Response
fast-xml-parser ({ ignoreAttributes: false })
   │
   ▼
Pure JSON Object returned to your app
```

We do not alter queries or invent schema routes. We consume `tally-xml-tdl` directly to fetch the exact TDL XML response, parse it via `fast-xml-parser`, and return clean JSON.

---

## Installation

```bash
npm install tally-simple-json
```

Requirements:
- Node.js >= 20.10
- Tally ERP9 / Tally Prime running locally with XML/HTTP server enabled (default `http://localhost:9000`)

---

## API & Usage

```javascript
import { company, masters, vouchers } from "tally-simple-json";
```

### 1. `company()`
Fetches active company metadata from Tally.
- **Inputs**: Exactly **0 inputs**.
- **Returns**: `Promise<object>`

```javascript
import { company } from "tally-simple-json";

const res = await company();
console.log(res.ENVELOPE);
```

---

### 2. `masters(path, company)`
Fetches master collections (Units, Ledgers, Stock Items, Groups, etc.).
- **Inputs**: Exactly **2 inputs**:
  - `path` *(string)*: Master route (e.g., `"units.all"`, `"stockItems.withBatches"`, `"ledgers.withGstDetails"`).
  - `company` *(string)*: Target Tally company name (e.g., `"mani9"`).
- **Returns**: `Promise<object>`

```javascript
import { masters } from "tally-simple-json";

const res = await masters("units.all", "mani9");
console.log(res.ENVELOPE.BODY.DATA.COLLECTION);
```

---

### 3. `vouchers(path, company, fromDate, toDate)`
Fetches vouchers for a specified date range.
- **Inputs**: Exactly **4 inputs**:
  - `path` *(string)*: Voucher route (e.g., `"sales.fetch"`, `"purchases.fetch"`).
  - `company` *(string)*: Target Tally company name (e.g., `"mani9"`).
  - `fromDate` *(string)*: Start date in `YYYYMMDD` format (e.g., `"20260401"`).
  - `toDate` *(string)*: End date in `YYYYMMDD` format (e.g., `"20260430"`).
- **Returns**: `Promise<object>`

```javascript
import { vouchers } from "tally-simple-json";

const res = await vouchers("sales.fetch", "mani9", "20260401", "20260430");

const voucherList = res.ENVELOPE.BODY.DATA.COLLECTION.VOUCHER;
console.log(`Found ${voucherList.length} vouchers:`);
console.log(voucherList[0]);
```

---

## Key Features

- **Direct Delegation**: Delegates route resolution and schema validation to `tally-xml-tdl`.
- **Full Attribute Preservation**: Retains XML attributes (such as `@_TYPE`) using `fast-xml-parser` with `{ ignoreAttributes: false }`.
- **Zero Config**: Ready to query your local Tally out of the box.

---

## License

MIT © KeshavSoft
