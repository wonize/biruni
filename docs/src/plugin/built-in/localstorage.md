# LocalStorage built-in plugin

## Import

```typescript
import localstorage from '@biruni/built-in/localstorage';
```

::: details Alternative Import Syntax

```typescript
import localstorage from '@biruni/built-in/localstorage/mod';
```

---

```typescript
import { localstorage } from '@biruni/built-in/mod';
```

---

```typescript
import { localstorage } from '@biruni/built-in';
```

---

Also it's available in `biruni` as battery-included

---

```typescript
import { localstorage } from 'biruni';
```

---

```typescript
import { localstorage } from 'biruni/built-in';
```

---

```typescript
import { localstorage } from 'biruni/localstorage';
```

---

```typescript
import localstorage from 'biruni/localstorage';
```

> [!tip]
> The `localstorage` plugin also aliased to `LocalStoragePlugin` named export

:::

## Plug and Use

```typescript
.plug(localstorage('my-localStorage-key'))
```

Or also can be use aliased name, by:

```typescript
.plug(LocalStoragePlugin('my-localStorage-key'))
```

::: details Signature

```typescript
const localstorage = (key: string) => () => Context.Persister;
```

:::

::: details Information

|                   |                                   |
| ----------------- | --------------------------------- |
| Type              | :jigsaw: [`Persister`](#)         |
| Polyfill-inlcuded | :construction: `WORK IN PROGRESS` |
| SSR Supportation  | :construction: `WORK IN PROGRESS` |
| Cross-Runtime     | :construction: `WORK IN PROGRESS` |
| Implemented Of    | :green_circle: `DOM Storage API`  |

:::
