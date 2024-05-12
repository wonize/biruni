# @biruni/built-in

## 0.0.5

### Patch Changes

-   -   Add `Synchronizer` Plugin Infrastructure
    -   Add `event` built-in plugin
        -   based on `Synchronizer` Infrastructure
        -   based on `Node.js EventEmitter API`
    -   Add `on` Method API
    -   Support observability for `useStore` hook
    -   Support non-promise and sync data access from `useStore`
    -   Fix `README`'s broken image links
    -   Refactor Barrel `mod.ts` exports and `exports` filed in `package.json`
    -   Refactor `@biruni/core` Base Structure
-   -   Add `Synchronizer` Plugin Infrastructure
    -   Add `event` built-in plugin
        -   based on `Synchronizer` Infrastructure
        -   based on `Node.js EventEmitter API`
    -   Add `on` Method API
    -   Support observability for `useStore` hook
    -   Support non-promise and sync data access from `useStore`
    -   Fix `README`'s broken image links
    -   Refactor Barrel `mod.ts` exports and `exports` filed in `package.json`
    -   Refactor `@biruni/core` Base Structure
-   Updated dependencies
-   Updated dependencies
    -   @biruni/core@0.0.5

## 0.0.4

### Patch Changes

-   Reimagined of core and factory

    -   improve `README` document
    -   improve `package.json` properties (actual `exports` and `peerDependencies`)
    -   react: symbolic implemneted for type correction.
    -   react: improve `withStore` as Higher-Order Component to map store pairs as `Props` for Class/Functional Components
    -   react: improve `useStore` as hook use inside Functional Components
    -   core: improve `set` and `get` overloads and auto-infer types

-   Updated dependencies
    -   @biruni/core@0.0.4
