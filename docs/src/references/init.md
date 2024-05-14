# Createing and Initializing

## Biruni Story Builder

After installing Biruni, the next step is initializing. This involves creating a new Store and setting up your plugins and default data.

The primary function you'll use is the `biruni` directive, which is also aliased as `defineBiruni`, `defineStore`, or simply `biruni`. Additionally, there is a class-based builder named `Biruni`.

> [!NOTE]
> we recommending to using directive function instead of builder class

The biruni function provides two essential methods: `plug` and `init`. it also accepts a single parameter: `namespace`.

### Namespace and Scope

The namespace is a unique identifier used to manage storage. It's important to use a unique identifier called namespace (also known as scope or any name you prefer) to avoid conflicts with other stores and plugins that may be using the same storage.

-   Useful for `localStorage` and `sessionStorage` keys
-   Useful for **SQLite** file names or in-memory scoped storage (upcoming feature)
-   Useful for **`@capacitor/preferences`** groups (upcoming feature)
-   Useful for **Redis** `namespaces` or key prefixes (upcoming feature)
-   Useful for **Deno KV** scopes (upcoming feature)
-   Useful for determining warnings/errors in development environment

### `plug` Method

The `plug` method assigns and integrates your plugins into the main core of `Store`. It accepts a single plugin or a collection of plugins as arguments. This method is designed to be chainable, returning a new Biruni builder instance in an **immutable** and **garbage-collection-friendly** way.

There are several built-in plugins available. For example:

-   `localStorage` as a Persister
-   Built-In `JSON` as a Parser
-   `EventEmitter` as a Synchronizer

You can also use `BuiltinPlugin` as a collection of these three plugins combined.

The syntax is simple and straightforward:

```typescript
.plug(PluginForSomeJob)

// Accepts a list of plugins as an array
.plug([
  PluginOne,
  PluginTwo,
  PluginThree
])

// Can be used in a step-by-step way
.plug(PluginOne)
.plug(PluginTwo)
.plug(PluginThree)
```

The starter setup, will be look like:

```typescript
.plug(builtins())

// Accepts a list of plugins as an array
.plug([
  json(),
  event(),
  localstorage()
])

// Can be used in a step-by-step way
.plug(json())
.plug(event())
.plug(localstorage())
```

> [!IMPORTANT]
> At least, one plugin per type must be provided; otherwise, the Store will throw errors.

### `init` method

To pass default data to your storage, use the `init` method. It accepts a callback function that returns the data. This method closes the plug chain and returns the final `Store`.

```typescript
.init(function initializer(){
  return { /* key: value */ }
})
```

For example, initializing data with two keys `theme` and `language` will look like this:

```typescript
.init(function initializer(){
  return {
    theme: 'LIGHT',
    language: 'ENG',
  }
})
```

```jsonc
{
	"theme": "LIGHT",
	"language": "ENG",
}
```

There might be concerns about re-rendering and re-setting data repeatedly, but this does not happen due to **Fresh Initializing**. This feature ensures that keys are fresh without changing their values.

When changing the value of an existing key, the values remain unchanged unless updated via **Set API** methods:

```typescript
biruni('user-settings')
	.plug(builtins())
	.init(() => {
		return {
			theme: 'LIGHT',
			langauge: 'ENG', // ![code --]
			language: 'FRA', // ![code ++]
		};
	});
```

```json
{
	"theme": "LIGHT",
	"language": "ENG" // ![code focus]
}
```

The values persist and remain unchanged unless explicitly updated.

After a while, if you want to rename the `language` key to `lang` (or remove it and add new one):

```typescript
biruni('user-settings')
	.plug(builtins())
	.init(() => {
		return {
			theme: 'LIGHT',
			langauge: 'ENG', // ![code --]
			lang: 'ENG', // ![code ++]
		};
	});
```

```json
{
	"theme": "LIGHT", // NO CHANGE ![code highlight]
	"langauge": "ENG", // ![code --]
	"lang": "ENG" // ![code ++]
}
```

**Fresh Initializing** ensures that the old `language` key is removed to reduce storage size, and the new `lang` key is added with the value `ENG`. This process is similar to garbage collection but for unused or obsolete keys.
**Fresh Initializing** is especially useful when you're updating your application and need to change the structure of your data.
