# Plugin API

There is 5 type of plugins avaialble:

## Persister's

To perssist data.

::: details Interface

::: code-group

```ts [context]
interface PersisterContext<DataStore> {
  $$type: "persister";
  $$instance: Persister;
}
```

```ts [interface]
interface Persister<DataStore> {
  new (key: string): Persister<DataStore>;
  set: PersisterSet<DataStore>;
  get: PersisterGet<DataStore>;
}
```

:::

::: details Examples

- `indexeddb API`
- `localStorage API`
- `sessionStorage API`
- `@ionic/secure-storage`
- `@capacitor/perferences`

:::

## Parser's

To parse/stringify data.

::: details Examples

- `JSON`
- `YAML`
- `TOML`

:::

## Synchronizer's

To sync data between things

::: details Examples

- `DOM Event API`
- `Storage Event API`
- `Event Emitter API`
- `Broadcast Channel API`

:::

## Validator's

To validate and verify data

::: details Examples

- `zod`
- `yup`
- `joi`
- `superstruct`

:::

## Integrator's

To integerate with another tools

::: details Example

**Store Managers**

- `pullstate`
- `zustand`
- `pinia`

**Frameworks**

- `sveltekit`
- `svelte`
- `react`
- `vue`

:::
