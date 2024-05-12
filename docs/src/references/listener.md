# Listening Actions

> [!IMPORTANT]
> Require to plug some `Synchronizer` plugins least one

## `.on` Method

> Aliased to `addListener`

```typescript
.addListener('postChange', function onChange(payload) {
  // do stuff with `payload`
});
```

::: details signature

```typescript
(event: EventName, listener: ListenerFunction<EventName>) => void;
```

:::

## Available Events

-   Change (`preChange`, `postChange`)

## Payload

```typescript
interface Payload {
	// whole new data object
	newData;

	// whole old data object
	oldData;

	// only changed key/value pairs
	diffs;

	// only changed key of pairs
	keyDiff;

	// what event is this (for external callback listeners)
	event;
}
```

Currently Available Event Hooks (unstable, only internal-use):

-   `preChange` : before `.set` Method commit changes
-   `postChange`: after `.set` Method commit changes
