---
outline: deep
---

# `.set` Method

The `.set` method allows you to store, save, or update data in a Storage Key. There are four ways to use the `.set` method to manage your data.

> [!IMPORTANT]
> The `.set` Always:
>
> 1. return `Promise<void>`
> 2. is **`Immutable`**.\
>    meaning it won't modify the existing data but create a new version with merged updates.

## Set Data with Key-Value Pair

```typescript
userSettings.set({ theme: 'dark' });
```

```json
{
	"theme": "light", // [!code --]
	"theme": "dark", // [!code ++]

	// unchanged and merged ->
	"language": "en-US",
	"primaryColor": "blue"
}
```

::: details signature

```typescript
.set(data: Partial<Data>): Promise<void>;
```

:::

## Set Data with Key and Value

```typescript
userSettings.set('theme', 'dark');
```

```json
{
	"theme": "light", // [!code --]
	"theme": "dark", // [!code ++]

	// unchanged and merged ->
	"language": "en-US",
	"primaryColor": "blue"
}
```

::: details signature

> The generic type is automatically inferred, so you don't need to pass it explicitly.

```typescript
.set<Key extends keyof Data, Value extends Data[Key]>(key: Key, value: Value): Promise<void>;
```

:::

## Set Data with Key-Setter Function

> also can be used to conditional changes

```typescript
userSettings.set('theme', (theme) => {
	return theme === 'light' ? 'dark' : 'light';
});
```

```json
{
	"theme": "light", // [!code --]
	"theme": "dark", // [!code ++]

	// unchanged and merged ->
	"language": "en-US",
	"primaryColor": "blue"
}
```

::: details signature

> The generic type is automatically inferred, so you don't need to pass it explicitly.

```typescript
.set<Key extends keyof Data, Value extends Data[Key], Setter extends (value: Value) => Value>(key: Key, setter: Setter): Promise<void>;
```

:::

## Set Data with Setter Function

```typescript
userSettings.set((oldData) => {
	if (oldData.theme === 'light') {
		return { theme: 'dark' };
	} else {
		return { theme: 'light' };
	}
});
```

```json
{
	"theme": "light", // [!code --]
	"theme": "dark", // [!code ++]

	// unchanged and merged ->
	"language": "en-US",
	"primaryColor": "blue"
}
```

::: details signature

> The generic type is automatically inferred, so you don't need to pass it explicitly.

```typescript
.set<Setter extends (oldData: Data) => (Partial<Data>)>(setter: Setter): Promise<void>
```

:::

## Using Utilities

There is also `@biruni/utility` library to contain some magical modules to be helper for more DX!

1. **Import**

```typescript
import { set } from '@biruni/utility';
```

2. **Use**

```typescript
set(userSettings);
set(userSettings, { theme: 'dark' });
set(userSettings, 'theme', 'dark');
set(userSettings, 'theme', (theme) => (theme === 'light' ? 'dark' : 'light'));
set(userSettings, (oldData) => (oldData.theme === 'light' ? 'dark' : 'light'));
```
