# `.on` Method

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

- `preChange` : before new passed data to `.set` Method apply to `Persister` plugin
- `postChange`:after new passed data to `.set` Method apply to `Persister` plugin
