# :handshake: Convantion

## Case is Matter

Using `PascalCase` or `camelCase` better than `snake_case`

```ts
const counterStore = biruni();
const CounterStore = biruni();
```

Using `Store` suffix make possibilities to define fast-as-possible the stores.

```ts
const counter$ = biruni();
const $counter = biruni();
```

Also, if you not by Hungorian Annotation, you can suffixing by `$` dollor sign after our before stores, its optional.

## Use `export default`

Because make more customiziblity to import by custom naming without using `as` keyword

::: code-group

```tsx [definition]
export default biruni();
```

```tsx [usage]
import MyCustomNameStore from "./counter.store.ts";
```

:::
