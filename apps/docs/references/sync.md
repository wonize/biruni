# Synchoronize

- `Broadcast Channel API`
- `Web Event API`
- `Web Storage Event`
- `Pub/Sub`
- `Signals` (work-in-progress)
- `Event Emitter`
- `React Utilities` (hooks)
- `Vue Utilities` (refs)
- `Svelte Utilities` (stores)

## Usage Of Built-in Event Listener

```typescript
import onChange from "@biruni/built-in/onchange";
```

```typescript
.plug(onChange(function (event){
  // handler
}))
```

or can you listen changes of only specified key

```typescript

.plug(onChange('count', function (event) {
  // handler
}))
```

## Built-in

or

```typescript
counter.on("change", function (event) {
  // handler
});
```

or

```typescript
counter.onChange(function (event) {
  // handler
});
```

or

```typescript
counter.addListener("change", function (event) {
  // handler
});
```

also **experitmental** support

```typescript
counter.on(
  {
    count: "set",
    loggedin: ["set", "get"],
  },
  function (event) {},
);
```

```typescript
counter
  .onKey("count")
  .when("change")
  .trigger(function (event) {
    // handler
  });
```

also support multikeys

```typescript
counter
  .onKey(["count", "loggedin"])
  .when("get")
  .trigger(function (event) {
    // handler
  });
```

also support utilities

```typescript
import { onChange, onSet, onGet, onDelete } from "@biruni/utilities";
```

```typescript
onChange(counter, function (event) {
  // handler
});

onChange(counter).trigger(function (event) {
  // handler
});

onChange(counter)
  .on("count")
  .trigger(function (event) {
    // handler
  });

onSet(counter, function (event) {
  // handler
});
```
