//shadcn
import { useToast } from './ui/use-toast'
import { Button } from './ui/button'

interface CardAdminProp {
    question: string
    answer: string
    id: number
    stack_id: number
    handleCardDelete: (id: number, stack_id: number) => Promise<void>
}

export default function CardAdmin({
    question,
    answer,
    id,
    stack_id,
    handleCardDelete,
}: CardAdminProp) {
    return (
        <div className="flex items-center justify-between rounded-lg border-2 border-primary p-4">
            <div className="flex flex-col justify-between">
                <h1 className="font-bold">Question: {question}</h1>
                <h2 className="">Answer: {answer}</h2>
            </div>
            <div className="flex items-center gap-3">
                <Button>Edit</Button>
                <Button onClick={() => handleCardDelete(id, stack_id)}>
                    Delete
                </Button>
                <img src="" alt="" className="h-16 w-16 rounded-sm" />
            </div>
        </div>
    )
}
