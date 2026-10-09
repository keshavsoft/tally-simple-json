# API Reference

`tally-simple-json` exports three modular functions: `company`, `masters`, and `vouchers`.

```javascript
import { company, masters, vouchers } from "tally-simple-json";
```

---

## 1. `company()`

Fetches the list of active companies loaded in Tally.

### Signature
```typescript
function company(): Promise<object>
```

- **Arguments**: None (0 inputs).
- **Internal Route**: `tally.company.fetch`
- **Returns**: A Promise resolving to the parsed JSON response object.

### Example
```javascript
import { company } from "tally-simple-json";

const res = await company();
console.log(res.ENVELOPE.BODY.DATA.COLLECTION);
```

---

## 2. `masters(path, company)`

Fetches master entities from Tally (e.g. units, stock items, ledgers, groups).

### Signature
```typescript
function masters(path: string, company: string): Promise<object>
```

### Arguments
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `path` | `string` | Yes | The master sub-route defined in schema (e.g. `"units.all"`, `"stockItems.withBatches"`) |
| `company` | `string` | Yes | The name of the company open in Tally (e.g. `"mani9"`) |

### Example
```javascript
import { masters } from "tally-simple-json";

const res = await masters("units.all", "mani9");
console.log(res.ENVELOPE.BODY.DATA.COLLECTION.UNIT);
```

---

## 3. `vouchers(path, company, fromDate, toDate)`

Fetches transactional vouchers from Tally for a specific period.

### Signature
```typescript
function vouchers(
    path: string, 
    company: string, 
    fromDate: string, 
    toDate: string
): Promise<object>
```

### Arguments
| Parameter | Type | Required | Format | Description |
| :--- | :--- | :--- | :--- | :--- |
| `path` | `string` | Yes | String | The voucher route (e.g. `"sales.fetch"`, `"purchases.fetch"`) |
| `company` | `string` | Yes | String | The company name (e.g. `"mani9"`) |
| `fromDate` | `string` | Yes | `YYYYMMDD` | Period start date (e.g. `"20260401"`) |
| `toDate` | `string` | Yes | `YYYYMMDD` | Period end date (e.g. `"20260430"`) |

### Example
```javascript
import { vouchers } from "tally-simple-json";

const res = await vouchers("sales.fetch", "mani9", "20260401", "20260430");

const voucherList = res.ENVELOPE.BODY.DATA.COLLECTION.VOUCHER;
console.log(`Retrieved ${voucherList.length} vouchers.`);
```
