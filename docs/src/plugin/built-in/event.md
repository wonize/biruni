# Event Emitter built-in plugin

## Import

```typescript
import event from '@biruni/built-in/event';
```

::: details Alternative Import Syntax

```typescript
import event from '@biruni/built-in/event/mod';
```

---

```typescript
import { event } from '@biruni/built-in/mod';
```

---

```typescript
import { event } from '@biruni/built-in';
```

---

Also it's available in `biruni` as battery-included

---

```typescript
import { event } from 'biruni';
```

---

```typescript
import { event } from 'biruni/built-in';
```

---

```typescript
import { event } from 'biruni/event';
```

---

```typescript
import event from 'biruni/event';
```

> [!tip]
> The `event` plugin also aliased to `EventEmitterPlugin` named export

:::

## Plug and Use

```typescript
.plug(event())
```

Or also can be use aliased name, by:

```typescript
.plug(EventEmitterPlugin())
```

::: details Signature

```typescript
const event = () => () => Context.Synchronizer;
```

:::

::: details Information

|                   |                                                       |
| ----------------- | ----------------------------------------------------- |
| Type              | :jigsaw: [`Synchronizer`](#)                          |
| Polyfill-inlcuded | :green_circle: [`INCLUDED` read more][polyfill_link]  |
| SSR Supportation  | :green_circle: `YES`                                  |
| Cross-Runtime     | :green_circle: [`INCLUDED` read more][polyfill_link]  |
| Implemented Of    | :green_circle: [`Node.js EventEmitter API`][api_link] |

:::

[polyfill_link]: https://www.npmjs.com/package/events
[api_link]: https://nodejs.org/dist/v11.13.0/docs/api/events.html
