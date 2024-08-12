import { Link } from 'react-router-dom'
export interface StackType {
    topic: string
    category: string
    id: number
}
export default function Stack({ topic, category, id }: StackType) {
    return (
        <Link to={`/stack/${id}`}>
            <div className="group relative flex flex-col rounded-lg border-2 border-muted">
                <div className="group-hover:rotate-4 absolute inset-0 z-20 h-full w-full translate-x-2 rotate-2 transform rounded-lg border-2 border-primary bg-primary duration-700 ease-in-out group-hover:-translate-y-2 group-hover:translate-x-6 group-hover:rotate-6" />
                <div className="relative z-40 overflow-hidden rounded-lg border-2 border-primary bg-secondary duration-300 ease-in-out group-hover:-translate-y-2 group-hover:scale-110">
                    <h1>{topic}</h1>
                    <p>{category}</p>
                </div>
            </div>
        </Link>
    )
}
