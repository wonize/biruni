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
import { biruni } from 'biruni';
import json from '@biruni/built-in/json';
import localstorage from '@biruni/built-in/localstorage';

type CounterStore = {
	count: number;
};

export default biruni<CounterStore>()
	.plug(json())
	.plug(localstorage('counter-storage-key'))
	.init(() => ({ count: 1 }));
```

```tsx [add observer/events]
import { biruni } from 'biruni';
import json from '@biruni/built-in/json';
import localstorage from '@biruni/built-in/localstorage';
import event from '@biruni/built-in/event'; // [!code ++]

type CounterStore = {
	count: number;
};

export default biruni<CounterStore>()
	.plug(json())
	.plug(event()) // [!code ++]
	.plug(localstorage('counter-storage-key'))
	.init(() => ({ count: 1 }));
```

```tsx [add zod validation]
import { biruni } from 'biruni';
import json from '@biruni/built-in/json';
import localstorage from '@biruni/built-in/localstorage';
import zod from '@biruni/zod'; // [!code ++]
import { z } from 'zod'; // [!code ++]

const CounterSchema = z.object({ count: z.number().min(1).max(10) }); // [!code ++]
type CounterStore = z.infer<typeof CounterSchema>; // [!code ++]

export default biruni<CounterStore>()
	.plug(json())
	.plug(zod(CounterSchema)) // [!code ++]
	.plug(localstorage('counter-storage-key'))
	.init(() => ({ count: 1 }));
```

```tsx [manipulate with set/get]
import CounterStore from './store.ts';

const count = await CoutnerStore.get('count');
CounterStore.on('preChange', function (payload) {
	console.log('[ ', payload.oldData, ' ] >--CHANGED--> [ ', payload.newData, ' ]');
	// [ { count: 1 } ] >--CHANGED--> [ { count: 5 } ]
});

setTimeout(() => {
	CounterStore.set('count', 5);
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
He found the diameter of the earth very close to today's value. He argued that trigonometry, which he learned in India, should be seen as a separate science from astronomy. He advised radius to be used as a unit in trigonometric functions in astronomy and geography. Moreover, he thought possible the Earth to revolve around the Sun and developed the idea the geological eras succeed one another.

<picture id="collage-picture">
  <img src="/assets/lunar/1075th Birthday of a Persian Astronomer of Lunar Cycles.jpeg"
    srcset="/assets/lunar/640px-Lunar_phases_al-Biruni.jpg 640px, /assets/lunar/1022px-Lunar_phases_al-Biruni.jpg 1022px, /assets/lunar/1533px-Lunar_phases_al-Biruni.jpg 1533px"
    id="collage-image" />
  <p id="collage-description">Lunar Cycles explained by Persian Astrologer</p>
</picture>

<style>
  #collage-picture {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    position: relative;
    height: auto;
    border-radius: 1rem;
    overflow: hidden;
  }

  #collage-image {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  #collage-description {
    position: absolute;
    bottom: 0.25rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0 1rem 1rem 0;
    background: hsla(0, 0%, 0%, 70%);
  }
</style>

[1]: https://www.britannica.com/biography/al-Biruni
[2]: https://wikipedia.com/en/al-biruni
