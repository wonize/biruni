<div align="center">

[![BANNER][BANNER]][HOMEPAGE]

<br/>

![version][VERSION_BADGE]
![MIT License][LICENSE_BADGE]

</div>

All-In-One and Unified Tools to manage Stores OR Storages for `react`

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
$ npm install --save @biruni/react react
```

### yarn :

```sh
$ yarn add @biruni/react react
```

### pnpm :

```sh
$ pnpm add --save @biruni/react react
```

### Bun :

```sh
$ bun add @biruni/react react
```

## Usage

> [!IMPORTANT]
> require [`biruni`][BIRUNI_NPM] core package

1. Import

```typescript
import { ReactPlugin } from "@biruni/react";
```

2. Plug

```typescript
.plug(ReactPlugin)
```

3. Use ([Hook](#usehook) or [HoC](#usehoc))

<span id="usehook"></span>
**as `hooks` api**

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

<span id="usehoc"></span>
**as `Higher-Order Component` to inject as props**

```tsx
import { withStore } from "@biruni/react";

withStore(CounterStore, CounterComponent);
```

4. Props Type

```tsx
import type { WithStore } from "@biruni/react";

type CounterProps = WithStore<typeof CoutnerStore>;

// OR

interface CounterProps extends WithStore<typeof CounterStore> {}
```

5. Enjoy :)

## Name

Abu Rayhan Muhammad ibn Ahmad **al-Biruni** /ælbɪˈruːni/ (Persian: ابوریحان بیرونی; Arabic: أبو الريحان البيروني) (973 – after 1050), known as al-Biruni, was a Khwarazmian Iranian scholar and polymath during the Islamic Golden Age. He has been called variously the "founder of Indology", "Father of Comparative Religion", "Father of modern geodesy", and the first anthropologist. [from WIKIPEDIA](https://en.wikipedia.org/wiki/Al-Biruni)

## LICENSE

Under [GPLv3 LICENSE](./LICENSE.md)

<!-- URL -->

[BIRUNI_NPM]: https://npmjs.com/package/biruni
[BANNER]: https://raw.githubusercontent.com/wonize/biruni/main/assets/dark.png
[HOMEPAGE]: https://github.com/wonize/biruni/tree/main/packages/react
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
[VERSION_BADGE]: https://img.shields.io/npm/v/@biruni/react?color=00273F&label=VERSION&style=flat-square
[LICENSE_BADGE]: https://img.shields.io/npm/l/@biruni/react?color=00273F&label=LICENSE&style=flat-square
