# `sessionstorage` built-in plugin

| Name                    | Type        |
| ----------------------- | ----------- |
| `sessionstorage` plugin | `Persister` |

## Import

```typescript
import sessionstorage from "@biruni/built-in/sessionstorage";
```

::: details Alternative Import Syntax

```typescript
import sessionstorage from "@biruni/built-in/sessionstorage/mod";
```

---

```typescript
import { sessionstorage } from "@biruni/built-in/mod";
```

---

```typescript
import { sessionstorage } from "@biruni/built-in";
```

---

Also it's available in `biruni` as battery-included

---

```typescript
import { sessionstorage } from "biruni";
```

---

```typescript
import { sessionstorage } from "biruni/built-in";
```

---

```typescript
import { sessionstorage } from "biruni/sessionstorage";
```

---

```typescript
import sessionstorage from "biruni/sessionstorage";
```

:::

> [!tip]
> The `sessionstorage` plugin also aliased to `SessionStoragePlugin` named export

## Usage

| #   | Parameter | Type     |
| --- | --------- | -------- |
|     | `key`     | `string` |

To plug to Store Factory:

```typescript
.plug(sessionstorage('my-sessionstorage-key'))
```

Or also can be use aliased name, by:

```typescript
.plug(SessionStoragePlugin('my-sessionstorage-key'))
```
