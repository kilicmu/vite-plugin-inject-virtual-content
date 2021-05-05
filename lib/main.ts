const parseContent2ESM = (content: SupportContent) => {
    let obj: string | Record<string, any> | undefined = undefined;
    if(typeof content === 'function') {
        obj = content()
        if(!['string', 'object'].includes(typeof obj)) {
            throw new Error("[vite-plugin-inject-virtual-content]: function content must return an 'object like' or string")
        }
    }
    else {
        obj = content
    }
    if(typeof obj === 'object' || typeof obj === 'string') {
        return `export default ${JSON.stringify(obj)}`
    }

    return `export default {}`
}

const resolveOptions = (options:Options) => {
    if(!options.token) {
        throw new Error(`
            [vite-plugin-inject-virtual-content]: error: must provide a token.
        `)
    }
    let content = ''
    if(!options.content) {
        content = 'export default {}'
    }else{
        content = parseContent2ESM(options.content)
    }
    
    return {
        ...options,
        content
    }
    
}


export type SupportContent = 
( () => (string | Record<string, any>) )
| Record<string, any> 
| string
interface Options  {
    token: string;
    content?: SupportContent;
}

const virtualIdFactory = (id: string) => `virtual-resource-${id}`

export default function VitePluginInjectVirtualContent(options: Options) {
    const {
        token: virtualToken, 
        content: virtualContent
    } = resolveOptions(options)
    let virturlId = ""
    
    return {
        name: 'vite-plugin-inject-virtual-content',
        resolveId(id: string): string | void {
            if(id === virtualToken) {
                virturlId = virtualIdFactory(id)
                return virturlId
            }
        },
        load(id: string): string | void {
            if(id === virturlId) {
                return virtualContent
            }
        }
    }
}

