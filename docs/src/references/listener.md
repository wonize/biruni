# Listener API

Require having at least one `Synchronizer` plugin installed.

## `.addListener` Method

> [!NOTE]
> Aliased to `on`

This method is used to add an event listener to the Store.

```typescript
.addListener('change', (payload) => {
	// do stuff with `payload`
});
```

::: details Signature

```typescript
(event: EventName, listener: ListenerFunction<EventName>): void;
```

:::

## `.removeListener` Method

> [!NOTE]
> Aliased to `off`

This method is used to remove an event listener to the Store.

```typescript
.removeListener('change', /* same listener passed to addListener */);
```

::: details Signature

```typescript
(event: EventName, listener: ListenerFunction<EventName>): void;
```

:::

## Payload

The shape of the `payload` object provided to the listener function, containing various data related to the change event.

```typescript
interface Payload {
	// whole new data object
	target: unknown;

	// whole old data object
	source: unknown;

	// only changed values
	diff: Diff;

	// only changed keys
	keys: PropertyKey[];
}

type Diff = {
	[PropertyKey: string]: {
		target: unknown;
		source: unknown;
	};
};

interface ListenerFunction<EventName> {
	(event: EventName, payload: Payload): void;
}
```

## Events (Experimental)

-   `change`: Triggers after a change have been committed when the `.set` method invoked.
