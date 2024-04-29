# Al-Biruni

## Overview

The `biruni` is a versatile all-in-one storage utility that offers seamless interchangeability between various storage options such as `localStorage`, `sessionStorage`, `ionic/secure-storage`, `react-native/sqlite`, `capacitor/preferences` and also in-memory cache storage. It also includes a built-in synchronizer feature and supports integration with `Broadcast Channel API` and `Storage Event API`.

With a powerful plugin API, `biruni` provides flexibility for developers to tailor their storage solutions to fit their specific needs. It is designed to seamlessly integrate with popular front-end libraries and frameworks such as React.js, as well as store management libraries like `zustand`, `pullstate`, and `redux`.

Named after the renowned scientist Al-Biruni, the `biruni` project aims to streamline the storage process and enhance the overall efficiency of data management for developers. Whether you are looking for a reliable storage solution or seeking to optimize your data storage capabilities, `biruni` offers a comprehensive and adaptable solution for all your storage needs.

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

## Features

### Simple

> The `Biruni` is easy-to-use by only **3 Step** from definition to manipulation

### Extensible

> The `Biruni` is Extensible By **Plugin API**, that mean, we can extend behavior by unlimited available plugins.

### Battery-Included

> The `Biruni` Unified All-in-One Utilities around Storages and Stores


## Why `Al-Biruni`?

### 1. Interchangiblity

`biruni` provide **Plugin API's** and it's make power of interchange everything with anything else without making worry about API Calls, because it's provide abstracted methods and usage over plugins.

### 2. Write Once, Run Everywhere

`biruni` also provide polyfill and api-avialbility-checking in built-in. it's work also in unsupported place.

## Al-Biruni

> **Persian scholar and scientist**

**Al-Bīrūnī** /ælbɪˈruːni/ (Persian: ابوریحان بیرونی; Arabic: أبو الريحان البيروني)  (born Sept. 4, 973 CE, Khwārezm, Khorāsān [now in Uzbekistan]—died c. 1052, Ghazna [now Ghaznī, Afg.) was a Iranian Muslim astronomer, mathematician, ethnographist, anthropologist, historian, and geographer during the Islamic Golden Age. Al-Bīrūnī managed to become the most original polymath the Islamic world had ever known.<sup>[ [1] ]</sup>
Al-Biruni was well versed in physics, mathematics, astronomy, and natural sciences, and also distinguished himself as a historian, chronologist, and linguist. He has been called variously the "Father of modern geodesy", and the first anthropologist.<sup>[ [2] ]</sup>

[1]: https://www.britannica.com/biography/al-Biruni
[2]: https://wikipedia.com/en/al-biruni