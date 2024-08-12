import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'

export interface StackType {
    topic: string
    category: string
    id: number
}
export default function Stack({ topic, category, id }: StackType) {
    return (
        <Link to={`/stack/${id}`}>
            <div className="w-54 group relative flex h-48 flex-col rounded-lg border-2 border-muted">
                <div className="absolute inset-0 z-20 h-full w-full translate-x-2 rotate-6 transform rounded-lg border-2 bg-white/20 duration-700 ease-in-out group-hover:-translate-y-4 group-hover:translate-x-6 group-hover:rotate-12 group-hover:bg-primary" />
                <div className="relative z-40 h-full w-full overflow-hidden rounded-lg border-2 bg-secondary duration-300 ease-in-out group-hover:-translate-y-2 group-hover:scale-110 group-hover:border-primary">
                    <div className="flex h-full flex-col justify-between p-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-bold">{topic}</h1>
                            <p>{category}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-white/40">Striver</p>
                            <Badge variant="default">Easy</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
