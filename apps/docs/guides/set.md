---
outline: deep
---

# `.set` Store

> [!NOTE]
> you can pass only keys you need them to change that, that mean you not need to pass or return whole object store
> the `biruni` make them merge by previous stored data out-of-box

## Object Struct

```typescript
counter.set({
  loggedin: 'YES'
  count: 3
})
```

## Setter Function

> [!IMPORTANT]
> by pass setter function, you should return immutable object
> also, `biruni` itself make them clone to be immutable

```typescript
counter.set(function (draft) {
  return {
    count: draft.count + 1,
  };
});
```

also can be wrapped inside function as **reusable** peice

```typescript
function increaseCountBy(value: number) {
  return counter.set(function (draft) {
    return {
      count: draft.count + value,
    };
  });
}
```

also it setter function be an `Arrow Function`

```typescript
counter.set((draft) => ({
  count: draft.count + 1,
}));

counter.set((draft) => {
  return {
    count: draft.count + 1,
  };
});
```

> [!IMPORTANT]
> the calling `setter` function is not idenpotent!
> that mean, each calling them should update stores

## Key/Value

```typescript
counter.set("count", 5);
```

## Key/Setter

```typescript
counter.set("count", function (count) {
  return count + 1;
});
```

also by `Arrow` function in oneline

```typescript
counter.set("count", (count) => count + 1);
```

> [!NOTE]
> the accetped arguments are compatible with `utilities` and `useStore` hook returned api

Example of React `useStore` hook for `.set`

```tsx
const IncreaseComponent = () => {
  const store = useStore(counter);

  store.set(/* as same as above examples */);
};
```

Example of `Set` utility

1. Import

```typescript
import { set } from "@biruni/utility";
```

2. Use

```typescript
set(counter, "count", 5);
set(counter, "count", (count) => 5);
set(counter, { count: 5 });
set(counter, (draft) => ({ count: 5 }));
```
