---
outline: deep
---

# `.get` Store

Retrun value's from Storage Key.

> There is 6 way to Get/Reterieve/Restore Data's from `Store`.

> [!IMPORTANT]
> First, should `import { StoreName } from 'path/store-name.ts'`

## Total Data

### Signature

```typescript
.get(): Promise<DataStore>
```

### Example

```typescript
counter.get();
```

```console
{
  "loggedin": "NO",
  "count": 1
}
```

## Select By Key

There is option to return only key

### Signature

```typescript
// without remap data's
.get<Key extends keyof DataStore>(key: Key): Promise<DataStore[Key]>

// with remap data's
.get<
  Key extends keyof DataStore,
  MapFn extends (value: DataStore[Key]) => unknown
>(key: Key, map: MapFn): Promise<ReturnType<MapFn>>
```

> it's auto-infer to generic `Key`, no more need to pass generic

### Example

**W/O Remap Data's**

```typescript
counter.get("count");
```

```console
1
```

**W/ Remap Data's**

```typescript
counter.get("count", (count) => {
  return {
    value: count,
    message: `we count ${count} times`,
  };
});
```

```console
{
  value: 1,
  message: "we count 1 times",
}
```

## Select By Key List

Return Data's by selected Keys

### Signature

```typescript
.get<
  Key extends keyof DataStore,
  Keys extends Array<Key>,
>(key: Keys): Promise<{
   [K in Keys[number]]: DataStore[K]
}>
```

> it's auto-infer to generic `Key`, no more need to pass generic

### Example

```typescript
counter.get(["count"]);
```

```console
{
  "count": 1,
}
```

## Select By Key Object

Return Data's by selected Keys by `boolean`-like value

### Signature

```typescript
.get<
  Key extends keyof DataStore,
  Keys extends Record<Key, boolean>,
>(key: Keys): Promise<{
  [K in keyof Keys]:
    Keys[K] extends true
    ? DataStore[K]
    : never
}>
```

> it's auto-infer to generic `Key`, no more need to pass generic

### Example

```typescript
counter.get({ count: true, loggedin: false });
```

```console
{
  "count": 1,
}
```

## Remap Data's

Return Data's by custom output

### Signature

```typescript
.get<MapFn extends (store: DataStore) => unknown>(map: MapFn): Promise<ReturnType<MapFn>>
```

> it's auto-infer to generic, no more need to pass generic

### Example

```typescript
counter.get((store) => {
  return {
    value: store.count,
    message: `we counted ${count} times`,
  };
});
```

```console
{
  value: 1,
  message: "we counted 1 times",
}
```

### Using Utilities

There is also `@biruni/utility` library to contain some magical modules to be helper for more DX!

1. **Import**

```typescript
import { get } from "@biruni/utility";
```

2. **Use**

```typescript
get(counter);
get(counter, ["count"]);
get(counter, "count");
get(counter, "count", (count) => `${count} times`);
get(counter, { count: true });
get(counter, (store) => store.count);
```
