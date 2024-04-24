---
outline: deep
---

# `.get` Store

::: tip
initialized store is

```typescript
{
  loggedin: 'NO',
  count: 1,
}
```

:::

## Whole Keys

```typescript
counter.get();
```

it should return

```output
>
{
  loggedin: 'NO',
  count: 1,
}
```

## Select By Function

```typescript
counter.get((s) => {
  return `we count ${s.count} times`;
});
```

```output
> 'we count 1 times'
```

## Select By Keys

the below syntax:

```typescript
counter.get({
  loggedin: false
  count: true
})
```

will return `Promise` of:

```output
>
{
  count: 1,
}
```

> [!IMPORTANT]
> the `.get` method always return a `Promsie` because it's a `Awaitalbe` and `async` function
> that mean you should use `await` before `.get` method or use `.then` method after it

## Select By String Key

```typescript
counter.get("count");
//= 1
```

also you can pass `Array` of keys

```typescript
counter.get(["count", "loggedin"]);
```

its should return:

```output
>
{
  loggedin: 'NO',
  count: 1,
}
```

also its accept function as second arguments to be manipulate retunable data

```typescript
counter.get("count", (count) => {
  return `we counted ${count} ${count <= 1 ? "time" : "times"}`;
});
```

it should return:

```output
> 'we counted 1 time'
```

or `Array` of keys

```typescript
counter.get(["count", "loggedin"], (s) => {
  return `you are ${s.loggedin === "YES" ? "Logged In" : "Not Logged In"} and Counted by ${s.count}`;
});
```

```output
> 'you are Not Logged In and Counted by 1'
```

## Compatibility

::: tip
the accetped arguments are compatible with `utilities` and `useStore` hook returned api
:::

Example of React `useStore` hook for `.get`

```tsx
const OutputComponent = () => {
  const store = useStore(counter);

  store.get(/* as same as above examples */);
};
```

Example of `Get` utility

1. Import

```typescript
import { get } from "@biruni/utility";
```

2. Use

```typescript
get(counter).count;
get(counter, "count");
get(counter, "count", (count) => `${count} times`);
get(counter, { count: true });
get(counter, (s) => s.count);
```
