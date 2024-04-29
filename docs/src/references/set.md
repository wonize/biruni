---
outline: deep
---

# `.set` Store

Store value's to Storage Key.

> There is 4 way to Set/Save/Store Data's to `Store`.

> [!IMPORTANT]
>
> 1. The `.set` is always **`Immutable`**
> 2. The `.set` return always `Promise<void>`

## Object Data

### Signature

```typescript
.set(store: Partial<DataStore>): Promise<void>
```

### Example

```typescript
counter.set({ count: 3 });
```

```console
{
  "count": 3,
  "anotherKey": "some value"
}
```

## By Key

### Signature

```typescript
// without remap data's
.set<
  Key extends keyof DataStore
  Value extends DataStore[Key]
>(key: Key, value: Value): Promise<void>

// with remap data's
.set<
  Key extends keyof DataStore,
  Value extends DataStore[Key],
  MapFn extends (value: Value) => Value
>(key: Key, map: MapFn): Promise<void>
```

> it's auto-infer to generic `Key`, no more need to pass generic

### Example

**W/O Remap Data's**

```typescript
counter.set("count", 3);
```

```console
{
  "count": 3,
  "anotherKey": "some value"
}
```

**W/ Remap Data's**

```typescript
counter.set("count", (count) => {
  // count was 1, then plus 2 equal to 3
  return count + 2;
});
```

```console
{
  "count": 3,
  "anotherKey": "some value"
}
```

## By Setter Function

### Signature

```typescript
.set<Setter extends (draft: DataStore) => Partial<DataStore>>(setter: Setter): Promise<void>
```

> it's auto-infer to generic and no more need to pass generic

### Example

```typescript
counter.set((draft) => {
  return {
    count: draft.count + 2,
  };
});
```

```console
{
  "count": 3,
  "anotherKey": "some value"
}
```

### Using Utilities

There is also `@biruni/utility` library to contain some magical modules to be helper for more DX!

1. **Import**

```typescript
import { set } from "@biruni/utility";
```

2. **Use**

```typescript
set(counter);
set(counter, { count: 3 });
set(counter, "count", 3);
set(counter, "count", (count) => count + 2);
set(counter, (store) => store.count + 2);
```
