# `localstorage` built-in plugin

| Name                  | Type        |
| --------------------- | ----------- |
| `localstorage` plugin | `Persister` |

## Import

```typescript
import localstorage from "@biruni/built-in/localstorage";
```

::: details Alternative Import Syntax

```typescript
import localstorage from "@biruni/built-in/localstorage/mod";
```

---

```typescript
import { localstorage } from "@biruni/built-in/mod";
```

---

```typescript
import { localstorage } from "@biruni/built-in";
```

---

Also it's available in `biruni` as battery-included

---

```typescript
import { localstorage } from "biruni";
```

---

```typescript
import { localstorage } from "biruni/built-in";
```

---

```typescript
import { localstorage } from "biruni/localstorage";
```

---

```typescript
import localstorage from "biruni/localstorage";
```

:::

> [!tip]
> The `localstorage` plugin also aliased to `LocalStoragePlugin` named export

## Usage

| #   | Parameter | Type     |
| --- | --------- | -------- |
|     | `key`     | `string` |

To plug to Store Factory:

```typescript
.plug(localstorage('my-localStorage-key'))
```

Or also can be use aliased name, by:

```typescript
.plug(LocalStoragePlugin('my-localStorage-key'))
```
