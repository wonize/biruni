# JSON built-in plugin

## Import

```typescript
import json from "@biruni/built-in/json";
```

::: details Alternative Import Syntax

```typescript
import json from "@biruni/built-in/json/mod";
```

---

```typescript
import { json } from "@biruni/built-in/mod";
```

---

```typescript
import { json } from "@biruni/built-in";
```

---

Also it's available in `biruni` as battery-included

---

```typescript
import { json } from "biruni";
```

---

```typescript
import { json } from "biruni/built-in";
```

---

```typescript
import { json } from "biruni/json";
```

---

```typescript
import json from "biruni/json";
```

> [!tip]
> The `json` plugin also aliased to `JsonPlugin` named export

:::

## Plug and Use

```typescript
.plug(json())
```

Or also can be use aliased name, by:

```typescript
.plug(JsonPlugin())
```

::: details Signature

```typescript
const json = () => () => Context.Parser;
```

:::

::: details Information

|                   |                                       |
| ----------------- | ------------------------------------- |
| Type              | :jigsaw: [`Parser`](#)                |
| Polyfill-inlcuded | :green_circle: `RUNTIMES BUILTED-IN ` |
| SSR Supportation  | :green_circle: `RUNTIMES BUILTED-IN ` |
| Cross-Runtime     | :green_circle: `RUNTIMES BUILTED-IN ` |
| Implemented Of    | :green_circle: `JSON API`             |

:::
