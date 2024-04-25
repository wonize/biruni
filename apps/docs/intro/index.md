# Al-Biruni

## Overview

[desk]

## Installation

::: code-group

```shell [pnpm]
$ pnpm add biruni
```

```shell [npm]
$ npm install biruni
```

```shell [yarn]
$ yarn add biruni
```

:::

## Example

::: code-group

```tsx [basic]
import { biruni } from "biruni";
import json from "@biruni/built-in/json";
import localstorage from "@biruni/built-in/localstorage";

type CounterStore = {
  count: number;
};

export default biruni<CounterStore>()
  .plug(json())
  .plug(localstorage("counter-storage-key"))
  .init(() => ({ count: 1 }));
```

```tsx [sync between tabs]
import { biruni } from "biruni";
import json from "@biruni/built-in/json";
import localstorage from "@biruni/built-in/localstorage";
import broadcast from "@biruni/built-in/broadcast"; // [!code ++]

type CounterStore = {
  count: number;
};

export default biruni<CounterStore>()
  .plug(json())
  .plug(broadcast()) // [!code ++]
  .plug(localstorage("counter-storage-key"))
  .init(() => ({ count: 1 }));
```

```tsx [zod validation]
import { biruni } from "biruni";
import json from "@biruni/built-in/json";
import localstorage from "@biruni/built-in/localstorage";
import zod from "@biruni/zod"; // [!code ++]
import { z } from "zod"; // [!code ++]

const CounterSchema = z.object({ count: z.number().min(1).max(10) }); // [!code ++]
type CounterStore = z.infer<typeof CounterSchema>; // [!code ++]

export default biruni<CounterStore>()
  .plug(json())
  .plug(zod(CounterSchema)) // [!code ++]
  .plug(localstorage("counter-storage-key"))
  .init(() => ({ count: 1 }));
```

```tsx [set/get]
import CounterStore from "./store.ts";

const count = await CoutnerStore.get("count");

setTimeout(() => {
  CounterStore.set("count", 5);
}, 3_000);
```

:::

## Why `Biruni`?

### Simple

> The `Biruni` is easy-to-use by only **3 Step** from definition to manipulation

### Extensible

> The `Biruni` is Extensible By **Plugin API**, that mean, we can extend behavior by unlimited available plugins.

### Battery-Included

> The `Biruni` Unified All-in-One Utilities around Storages and Stores
