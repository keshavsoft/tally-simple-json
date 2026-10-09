# Architecture: The tally-simple-json Story

`tally-simple-json` is a lightweight, zero-boilerplate client that provides structured **JSON** access to Tally ERP9 and Tally Prime.

---

## 1. The Processing Pipeline

The system is deliberately layered so that each package has a single, clear responsibility:

```text
Caller Application
       │
       │ calls company(), masters(), or vouchers()
       ▼
tally-simple-json (v31)
       │
       │ calls matching function on tally-xml-tdl
       ▼
tally-xml-tdl (v31)
       │
       │ resolves namespace & validates against tally-spec schema
       │ constructs TDL XML envelope
       ▼
tally-extract
       │
       │ dispatches HTTP POST
       ▼
Tally HTTP Server (default: http://localhost:9000)
       │
       │ returns raw TDL XML
       ▼
tally-xml-tdl
       │
       │ returns raw XML string
       ▼
tally-simple-json (parseXml)
       │
       │ parses XML using fast-xml-parser ({ ignoreAttributes: false })
       ▼
Caller Application receives clean JSON Object
```

---

## 2. Core Principles

### Single Responsibility
- **No Route Guessing or Invention**: Routes map 1:1 to the definitions declared in [`tally-spec`](https://www.npmjs.com/package/tally-spec).
- **Exact Parity with `tally-xml-tdl`**: The caller API contract in `tally-simple-json` matches `tally-xml-tdl` identically, differing only in return type (JSON object instead of XML string).
- **Attribute Preservation**: Uses `fast-xml-parser` with `{ ignoreAttributes: false }` so that critical metadata attributes (e.g. `@_TYPE`) are fully preserved in the resulting JSON.

---

## 3. Strict Domain Boundaries

The public API is divided into three dedicated domain modules:

| Domain | File Path | External Inputs | Description |
| :--- | :--- | :--- | :--- |
| **`company`** | `src/v31/company/` | **0 inputs** | Queries `tally.company.fetch` for active company list |
| **`masters`** | `src/v31/masters/` | **2 inputs** (`path`, `company`) | Queries master collections (Units, Ledgers, Items) |
| **`vouchers`** | `src/v31/vouchers/` | **4 inputs** (`path`, `company`, `fromDate`, `toDate`) | Queries transaction collections filtered by date range |
