# React Utilities

## Installation

## Map to Props

```typescript
export default withStore(store, MyComponent);
```

the `MyComponent` can use store as props as `readonly`

```tsx
const MyComponent = (props: Props) => {
  props.count;
};
```

for definition props type should:

```typescript
type Props = WithStore<typeof counter, AnotherPropsType>;
```

## `useStore` Hook

```tsx
const MyComponent = () => {
  const store = useStore(counter);

  // avaialbel API's
  store.get;
  store.set;
  store.del;
  store.on;
};
```

## Context

```tsx
import { context } from "@biruni/react";
```

```tsx
const CounterContext = context(counter);

const App = () => {
  return (
    <CounterContext>
      <YouComponents />
    </CounterContext>
  );
};
```

```tsx
const MyComponent = () => {
  const counter = context.use(CounterContext);

  // available API's
  counter.set;
  counter.get;
  counter.del;
  counter.on;
};
```
