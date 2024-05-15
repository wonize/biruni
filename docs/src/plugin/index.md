# Plugin API

There is 5 type of plugins avaialble:

## Persister's

To perssist and cache data.

::: details Examples

-   `indexeddb API`
-   `localStorage API`
-   `sessionStorage API`
-   `@ionic/secure-storage`
-   `@capacitor/perferences`

:::

## Parser's

To parse/stringify data.

::: details Examples

-   `JSON`
-   `YAML`
-   `TOML`

:::

## Synchronizer's

To sync data between things

::: details Examples

-   `DOM Event API`
-   `Storage Event API`
-   `Event Emitter API`
-   `Broadcast Channel API`

:::

## Validator's

To validate and verify data

::: details Examples

-   `zod`
-   `yup`
-   `joi`
-   `superstruct`

:::

## Integrator's

To integerate with another tools

::: details Example

**Store Managers**

-   `pullstate`
-   `zustand`
-   `pinia`

**Frameworks**

-   `sveltekit`
-   `svelte`
-   `react`
-   `vue`

:::

## Collection's

To compose multiple plugins into one, you can define a composite plugin that takes the individual plugins as dependencies.

## Key Concepts

### Anchor Hooks

#### `preprocess` Method

The `preprocess` hook is called before the data is processed by plugins in the pipeline. plugins can modify, parse, retrieve data. or prevent data processing by returning the given `data` argument.

#### `postprocess` Method

The `postprocess` hook is called before the modified data is committed to persisters. plugins can modify, stringify, save, emit, or invoke listeners the data before it is saved. plugins can prevent data processing further by returning the given `data` argument.

### Accessors and Properties

#### `namespace` getter/setter

The `namespace` property is used to set or get the namespace of a parent `Store`. it can be accessed by plugins but is injected by the parent `Store`.

#### `name` property

The `name` property is a read-only property containing the unique name of the plugin in the format `{scope}/{name}`, for example `built-in/localStorage`.

#### `type` property

The `type` property is a read-only property defining the type of the plugin. This includes the ones mentioned in above section, but for Collection Plugins, the type should be `synchronizer`.

#### `addListener` method [optional if plugin supports]

The `addListener` method allows plugins to accept listeners and handlers from a `Store`. It is typically used by plugins that require reacting to user interactions or browser events. The `type` property should be `synchronizer`.

#### `removeListener` method [optional if plugin supports]

The `removeListener` method allows plugins to remove previously registered event listeners. the `type` property should be `synchronizer`.

#### `Data` generic argument [injectable]

`Data` is a generic argument representing the expected data type that a plugin will receive upon instantiation. It is injected through dependency injection.

### Plugin Invoker Function (PIF)

The PIF (Plugin Invoker Function) is a directive function and arguments proxy to instantiate plugins with their required constructor dependencies.
