# `Zod` Utilities

> [GitHub](https://github.com/wonize/biruni/tree/main/packages/zod/)
> | [NPM](https://www.npmjs.com/package/@biruni/zod)
> | [Doc's](https://wonize.github.io/biruni/references/zod/)

## Installation

```shell
$ npm install @biruni/zod zod
```

```shell
$ yarn add @biruni/zod zod
```

```shell
$ pnpm add @biruni/zod zod
```

## Import

```typescript
import { zod } from "@biruni/zod";
```

::: details Import Aliases

```typescript
import zod from "@biruni/zod";
```

---

```typescript
import { zod } from "@biruni/zod/mod";
```

---

```typescript
import zod from "@biruni/zod/mod";
```

> [!TIP]
> The `zod` also aliased to `ZodPlugin` named export

:::

## Define

```typescript {1,3-5,7,9}
import { z } from "zod";

const CounterSchema = z.object({
  count: z.number().min(1).max(10),
});

type CounterStore = z.infer<typeof CounterSchema>;

export default biruni<CounterStore>(); // optional pass to Generic Param
```

## Usage

```typescript
.plug(zod(MyStoreSchema))
```
