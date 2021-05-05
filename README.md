## vite-plugin-inject-virtual-content

this is a vite plugin to help inject some json/string data for project;

### Quick Start

vite.config.js/ts
```ts
import provider from "vite-plugin-inject-virtual-content"

export default {
    //...
    plugins: [
        provider({
            token: '@provider-token',
            content: () => ({
                title: "vite-plugin-inject-virtual-content",
                description: "some message for this plugin",
                meta: {
                    v: 1,
                    other: "other meta"
                }
            })
        })
    ]
    //...
}
```

file: any-file-in-project.ts
```ts
import content from "@provider-token"
console.log(content) //Object { title: "vite-plugin-inject-virtual-content", description: "some message for this plugin", meta: {…} }
```