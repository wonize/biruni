<div align="center">

[![BANNER][BANNER]][HOMEPAGE]

<br/>

![version][VERSION_BADGE]
![MIT License][LICENSE_BADGE]

</div>

All-In-One and Unified Tools to manage Stores OR Storages

`react`
`lcoalStorage`
`sessionStorage`
`@capacitor/perferences`
`zod`
`yup`
`indexdb`

## Features

- Simple API's by only few steps
- Type Safety by `Typescript`
- Highly customizable by many built-in plugins
- All-In-One and Unifined tools

## Installation

[![npm][INSTALLATION_NPM_BADGE]][INSTALLATION_NPM]
[![Yarn][INSTALLATION_YARN_BADGE]][INSTALLATION_YARN]
[![pnpm][INSTALLATION_PNPM_BADGE]][INSTALLATION_PNPM]
[![bun][INSTALLATION_BUN_BADGE]][INSTALLATION_BUN]
[![deno][INSTALLATION_DENO_BADGE]][INSTALLATION_DENO]

### npm :

```sh
$ npm install --save biruni
```

### yarn :

```sh
$ yarn add biruni
```

### pnpm :

```sh
$ pnpm add --save biruni
```

### Bun :

```sh
$ bun add biruni
```

## Usage

1. Import:

```typescript
import biruni from "biruni";
import JsonPlugin from "@biruni/built-in/json";
import LocalStoragePlugin from "@biruni/built-in/localstorage";
// OR
import { biruni } from "biruni";
import { JsonPlugin, LocalStoragePlugin } from "@biruni/built-in";
```

2. Define:

```typescript
interface CounterStore {
  count: number;
}

export default biruni()
  .plug(JsonPlugin())
  .plug(LocalStoragePlugin("local-counter"))
  .init(() => ({ count: 1 }));
```

3. Call:

```typescript
import CounterStore from "./stores/counter";
```

to restore and `get` data from `localStorage`, should use `.get` method by below usecases:

```typescript
CounterStore.get(); //= { count: 1 }
CounterStore.get("count"); //= 1
CounterStore.get((d) => d.count + 1); //= 2
```

to store and `set` new data should:

```typescript
CounterStore.set({ count: 3 });
CounterStore.set((d) => ({ count: d.count + 1 }));
```

4. Enjoy :)

for more information about plugins, can you read in Plugins

### Plugins

There is four simple types to Plug in `Biruni` are:

- Validators (`zod`, `yup`, etc)
- Parsers (built-in `JSON`, etc)
- Persister (built-in `localStorage`, `@capacitor/perferences`, etc)
- Reactiviter (built-in `react` hooks and api's, `zustand`, `pullstate`, etc)

#### [`react` Hooks and HoC's](https://npmjs.com/package/@biruni/react)

1. Import

```typescript
import { ReactPlugin } from "@biruni/react";
```

2. Plug

```typescript
.plug(ReactPlugin)
```

3. Use

```tsx
import { useStore /* alias useBiruni */ } from "@biruni/react";

function CounterComponent() {
  const store = useStore(CounterStore);

  return (
    <div>
      <button onClick={() => store.set((d) => ({ count: 0 }))}>Reset</button>
      <button onClick={() => store.set((d) => ({ count: d.count + 1 }))}>Increase</button>
      <button onClick={() => store.set((d) => ({ count: d.count - 1 }))}>Decrease</button>
      <span>{store.get("count")}</span>
    </div>
  );
}
```

also will be able to pass through by props

```tsx
import { withStore } from "@biruni/react";

withStore(CounterStore, CounterComponent);
```

for type definition in props should:

```tsx
import type { WithStore } from "@biruni/react";

type CounterProps = WithStore<typeof CoutnerStore>;
// OR
interface CounterProps extends WithStore<typeof CounterStore> {}
```

#### [`zod` Validator](https://npmjs.com/package/@biruni/zod)

1. Install

```shell
$ pnpm add --save @biruni/zod zod
```

2. Import

```typescript
import { ZodPlugin } from "@biruni/zod";
import { z } from "zod";
```

3. Define

```typescript
const CounterSchema = z.object({
  count: z.number().min(1).max(10),
});

type CounterStore = z.infer<typeof CounterSchema>;
```

4. Plug

```tsx
.plug(ZodPlugin(CounterSchema))
```

5. Use

```typescript
CounterStore.set({ count: /* only accept between 1 to 10 */ });
```

## Name

Abu Rayhan Muhammad ibn Ahmad **al-Biruni** /ælbɪˈruːni/ (Persian: ابوریحان بیرونی; Arabic: أبو الريحان البيروني) (973 – after 1050), known as al-Biruni, was a Khwarazmian Iranian scholar and polymath during the Islamic Golden Age. He has been called variously the "founder of Indology", "Father of Comparative Religion", "Father of modern geodesy", and the first anthropologist. [from WIKIPEDIA](https://en.wikipedia.org/wiki/Al-Biruni)

## LICENSE

Under [GPLv3 LICENSE](./LICENSE.md)

<!-- URL -->

[BANNER]: https://raw.githubusercontent.com/wonize/biruni/main/assets/dark.png
[HOMEPAGE]: https://github.com/wonize/biruni/tree/main/packages/biruni
[INSTALLATION_NPM_BADGE]: https://img.shields.io/static/v1?style=for-the-badge&message=npm&color=CB3837&logo=npm&logoColor=FFFFFF&label=
[INSTALLATION_YARN_BADGE]: https://img.shields.io/static/v1?style=for-the-badge&message=Yarn&color=2C8EBB&logo=Yarn&logoColor=FFFFFF&label=
[INSTALLATION_PNPM_BADGE]: https://img.shields.io/static/v1?style=for-the-badge&message=pnpm&color=FF6C37&logo=pnpm&logoColor=FFFFFF&label=
[INSTALLATION_BUN_BADGE]: https://img.shields.io/static/v1?style=for-the-badge&message=bun&color=E2BD8C&logo=bun&logoColor=FFFFFF&label=
[INSTALLATION_DENO_BADGE]: https://img.shields.io/static/v1?style=for-the-badge&message=deno&color=323232&logo=deno&logoColor=FFFFFF&label=
[INSTALLATION_NPM]: #npm-
[INSTALLATION_YARN]: #yarn-
[INSTALLATION_PNPM]: #pnpm-
[INSTALLATION_BUN]: #bun-
[INSTALLATION_DENO]: https://deno.land/manual@v1.36.4/examples/manage_dependencies
[VERSION_BADGE]: https://img.shields.io/npm/v/biruni?color=00273F&label=VERSION&style=flat-square
[LICENSE_BADGE]: https://img.shields.io/npm/l/biruni?color=00273F&label=LICENSE&style=flat-square
