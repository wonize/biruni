# `React` Utilities

> [GitHub](https://github.com/wonize/biruni/tree/main/packages/react/)
> | [NPM](https://www.npmjs.com/package/@biruni/react)
> | [Doc's](https://wonize.github.io/biruni/plugin/react/)

## Installation

```shell
$ npm install @biruni/react
```

```shell
$ yarn add @biruni/react
```

```shell
$ pnpm add @biruni/react
```

## Usage As Hook

1. **Import**

```typescript
import { useStore } from "@biruni/react";
```

2. **Use**

```tsx
const MyComponent = () => {
  const store = useStore(MyStore);
};
```

## Use As Props Mapper

1. **Import**

```typescript
import { withStore, type WithStore } from "@biruni/react";
```

2. **Define**

update `Props` from:

```typescript
type Props = {
  myPropKey: string;
};
```

to:

```typescript
type Props = WithStore<
  typeof MyStore,
  {
    myPropKey: string;
  }
>;
```

3. **Wrap**

```typescript
const NewMyComponent = withStore(MyStore, MyComponent);
```

> [!IMPORTANT]
> The mapped props will be `read-only` props and **`Immutable`**
