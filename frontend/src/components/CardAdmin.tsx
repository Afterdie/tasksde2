//shadcn
import { useState } from 'react'
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { editCard } from '../utils/Card'
import { useToast } from './ui/use-toast'

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
    const { toast } = useToast()
    const [cardInfo, setCardInfo] = useState({
        question: question,
        answer: answer,
    })
    const [cardDetails, setCardDetails] = useState({
        question: question,
        answer: answer,
    })
    const handleEditCard = async () => {
        try {
            await editCard({ ...cardDetails, id: id, stack_id: stack_id })
            setCardInfo(cardDetails)
            toast({ title: 'Stack edited successfully' })
        } catch (error) {
            toast({ title: 'Failed to edit card' })
        }
    }
    return (
        <div className="flex items-center justify-between rounded-lg border-2 border-primary p-4">
            <div className="flex flex-col justify-between">
                <h1 className="font-bold">Question: {cardInfo.question}</h1>
                <h2 className="">Answer: {cardInfo.answer}</h2>
            </div>
            <div className="flex items-center gap-3">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Question and Answer</DialogTitle>
                        </DialogHeader>
                        <Input
                            type="text"
                            value={cardDetails.question}
                            onChange={(e) =>
                                setCardDetails({
                                    ...cardDetails,
                                    question: e.target.value,
                                })
                            }
                            placeholder="Topic"
                        />
                        <Input
                            type="text"
                            value={cardDetails.answer}
                            onChange={(e) =>
                                setCardDetails({
                                    ...cardDetails,
                                    answer: e.target.value,
                                })
                            }
                            placeholder="Category"
                        />
                        <DialogFooter>
                            <DialogClose>Close</DialogClose>
                            <DialogClose asChild>
                                <Button onClick={handleEditCard}>Save</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Button onClick={() => handleCardDelete(id, stack_id)}>
                    Delete
                </Button>
                <img src="" alt="" className="h-16 w-16 rounded-sm" />
            </div>
        </div>
    )
}
