---
outline: deep
---

# `.get` Method

The `.get` method is used to retrieve values from the Storage Key. There are six different ways to get, retrieve, or restore data from the Store.

> [!IMPORTANT]
> Before using the `.get` method, make sure to import the Store using `import { StoreName } from 'path/store-name.ts'`.

> [!NOTE]
> All returned data is wrapped in a Promise and follows the async/await function signature.

## Retrieve All Data

This method returns all the data stored in the Store.

```typescript
const data = await userSettings.get();
```

The returned data will look like this:

```json
{
	"theme": "dark",
	"language": "en-US",
	"primaryColor": "blue"
}
```

::: details signature

```typescript
.get(): Promise<Readonly<Data>>;
```

:::

## Get Single Key/Value

You can retrieve a specific key's value using the .get method.

```typescript
userSettings.get('theme');
```

The returned value will be:

```json
"dark"
```

You can also map the value to a custom output format using a function:

```typescript
userSettings.get('theme', (theme) => {
	return {
		value: theme,
		message: `the current theme is: ${theme}`,
	};
});
```

The output will be:

```json
{
	"value": "dar",
	"message": "we current theme is: dark"
}
```

::: details signature

> The generic type is automatically inferred, so you don't need to pass it explicitly.

```typescript
.get<Key extends keyof Data>(key: Key): Promise<Data[Key]>;
```

In case you want to map the value to a custom output format, you can use:

```typescript
.get<Key extends keyof Data, Mapper extends (data: Data[Key] | never) => (Data[Key] | unknown)>(key: Key, mapper: Mapper): Promise<ReturnType<Mapper> | Data[Key] | unknown>;
```

:::

## Filter By Key List

This method allows you to retrieve data for a list of selected keys.

```typescript
userSettings.get(['theme', 'primaryColor']);
```

The returned data will be:

```json
{
	"theme": "dark",
	"primaryColor": "blue"
}
```

::: details signature

> The generic type is automatically inferred, so you don't need to pass it explicitly.

```typescript
.get<KeyList extends Array<keyof Data>>(keys: Partial<KeyList>): Promise<Readonly<{ [SelectedKey in KeyList extends Partial<Array<infer Key>> ? Key : never]: Data[SelectedKey] }>>;
```

:::

## Filter By Key Object

This method allows you to retrieve data for selected keys based on a `boolean`-like value.

```typescript
userSettings.get({ theme: true, primaryColor: false });
```

```json
{
	"theme": "dark"
}
```

::: details signature

> The generic type is automatically inferred, so you don't need to pass it explicitly.

```typescript
.get<KeyObject extends Record<keyof Data, boolean>>(keys: Partial<KeyObject>): Promise<TruthyKeysReturnType<Data, KeyObject>>;
```

:::

## Custom Data Mapping

This method allows you to transform the input data into a custom output format.

```typescript
userSettings.get((store) => {
	return {
		value: store.theme,
		message: `the current theme is: ${store.theme}`,
	};
});
```

The returned data will be:

```json
{
	"value": "dark",
	"message": "the current theme is: dark"
}
```

You can also use this method as a _Selector_ option:

```typescript
userSettings.get((store) => store.theme);
```

The returned data will be:

```json
"dark"
```

::: details signature

> The generic type is automatically inferred, so you don't need to pass it explicitly.

```typescript
.get<Mapper extends (data: Readonly<Data> | never) => (Data | unknown)>(mapper: Mapper): Promise<ReturnType<Mapper> | Data | unknown>;
```

:::

## Using Utilities

There is also `@biruni/utility` library to contain some magical modules to be helper for more DX!

1. **Import**

```typescript
import { get } from '@biruni/utility';
```

2. **Use**

```typescript
get(userSettings);
get(userSettings, ['theme']);
get(userSettings, 'theme');
get(userSettings, 'theme', (theme) => `${theme} mode`);
get(userSettings, { theme: true });
get(userSettings, (store) => store.theme);
```
