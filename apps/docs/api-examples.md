---
outline: deep
---

# Example Setup

```tsx
import { biruni } from "biruni";
import { json } from "@biruni/built-in";
import { localstorage } from "@biruni/built-in";
import { z, zod } from "@biruni/zod";

const CounterSchema = z.object({
  count: z.number().min(1).max(10),
});

type CounterStore = z.infer<typeof CounterSchema>;

const store = biruni<CounterStore>()
  .plug(json())
  .plug(zod(CounterSchema))
  .plug(localstorage("key"))
  .init(() => ({ count: 1 }));
```

This page demonstrates usage of some of the runtime APIs provided by VitePress.

The main `useData()` API can be used to access site, theme, and page data for the current page. It works in both `.md` and `.vue` files:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data

<pre>{{ theme }}</pre>

### Page Data

<pre>{{ page }}</pre>

### Page Frontmatter

<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data

<pre>{{ theme }}</pre>

### Page Data

<pre>{{ page }}</pre>

### Page Frontmatter

<pre>{{ frontmatter }}</pre>

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
