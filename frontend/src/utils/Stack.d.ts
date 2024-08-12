export declare const fetchStacks: () => Promise<any>

export declare const createStack: (params: {
    topic: string
    category: string
}) => Promise<number>

export declare const editStack: (params: {
    id: number
    topic: string
    category: string
}) => Promise<void>

export declare const deleteStack: (id: number) => Promise<void>
