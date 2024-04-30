# Al-Biruni

## Overview

The `biruni` is a versatile all-in-one storage utility that offers seamless interchangeability between various storage options such as `localStorage`, `sessionStorage`, `ionic/secure-storage`, `react-native/sqlite`, `capacitor/preferences` and also in-memory cache storage. It also includes a built-in synchronizer feature and supports integration with `Broadcast Channel API` and `Storage Event API`.

With a powerful plugin API, `biruni` provides flexibility for developers to tailor their storage solutions to fit their specific needs. It is designed to seamlessly integrate with popular front-end libraries and frameworks such as React.js, as well as store management libraries like `zustand`, `pullstate`, and `redux`.

Named after the renowned scientist Al-Biruni, the `biruni` project aims to streamline the storage process and enhance the overall efficiency of data management for developers. Whether you are looking for a reliable storage solution or seeking to optimize your data storage capabilities, `biruni` offers a comprehensive and adaptable solution for all your storage needs.

## Installation

::: code-group

```shell [pnpm]
$ pnpm add --save biruni
```

```shell [npm]
$ npm install --save biruni
```

```shell [yarn]
$ yarn add --save biruni
```

:::

## Example

::: code-group

```tsx [initialize]
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

```tsx [add observer/events]
import { biruni } from "biruni";
import json from "@biruni/built-in/json";
import localstorage from "@biruni/built-in/localstorage";
import event from "@biruni/built-in/event"; // [!code ++]

type CounterStore = {
  count: number;
};

export default biruni<CounterStore>()
  .plug(json())
  .plug(event()) // [!code ++]
  .plug(localstorage("counter-storage-key"))
  .init(() => ({ count: 1 }));
```

```tsx [add zod validation]
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

```tsx [manipulate with set/get]
import CounterStore from "./store.ts";

const count = await CoutnerStore.get("count");
CounterStore.on("preChange", function (payload) {
  console.log("[ ", payload.oldData, " ] >--CHANGED--> [ ", payload.newData, " ]");
  // [ { count: 1 } ] >--CHANGED--> [ { count: 5 } ]
});

setTimeout(() => {
  CounterStore.set("count", 5);
}, 3_000);
```

:::

## Features

### Simple

> Experience the simplicity of **Biruni** with its **3-Step** process from definition to manipulation, making it incredibly easy to use.

### Extensible

> Expand the capabilities of **Biruni** with our Plugin API. Unlock unlimited possibilities by integrating various plugins to suit your needs.

### Battery-Included

> The `Biruni` Unified All-in-One Utilities around Storages and Stores

### Interchangiblity

> Leverage Biruni's powerful Plugin API to effortlessly interchange components without worrying about API calls. Its abstracted methods and plugin-based approach make it a versatile solution.

### Cross-Use, Write Once, Run Everywhere

> Biruni ensures your experience remains smooth and consistent across different platforms. It comes equipped with built-in polyfills and API availability checking, allowing it to function even in unsupported environments.

### Safe

> Biruni powerd by Typescript programming language.

## Al-Biruni

> **Persian scholar and scientist**

**Al-Bīrūnī** /ælbɪˈruːni/ (Persian: ابوریحان بیرونی; Arabic: أبو الريحان البيروني) (born Sept. 4, 973 CE, Khwārezm, Khorāsān [now in Uzbekistan]—died c. 1052, Ghazna [now Ghaznī, Afg.) was a Iranian Muslim astronomer, mathematician, ethnographist, anthropologist, historian, and geographer during the Islamic Golden Age. Al-Bīrūnī managed to become the most original polymath the Islamic world had ever known.<sup>[ [1] ]</sup>
Al-Biruni was well versed in physics, mathematics, astronomy, and natural sciences, and also distinguished himself as a historian, chronologist, and linguist. He has been called variously the "Father of modern geodesy", and the first anthropologist.<sup>[ [2] ]</sup>

[1]: https://www.britannica.com/biography/al-Biruni
[2]: https://wikipedia.com/en/al-biruni
