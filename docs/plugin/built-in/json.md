# `json` built-in plugin

| Name          | Type     |
| ------------- | -------- |
| `json` plugin | `Parser` |

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

:::

> [!tip]
> The `json` plugin also aliased to `JsonPlugin` named export

## Usage

To plug to Store Factory:

```typescript
.plug(json())
```

Or also can be use aliased name, by:

```typescript
.plug(JsonPlugin())
```
