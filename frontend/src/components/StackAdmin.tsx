import { useEffect, useState } from 'react'

//shadcn
import { Button } from './ui/button'
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { useToast } from './ui/use-toast'
import { StackType } from './Stack'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

//comps
import CardAdmin from './CardAdmin'

//utils
import { CardType } from './Card'
import { deleteStack, editStack } from '../utils/Stack'
import { createCard, fetchCards, deleteCard } from '../utils/Card'

interface StackAdminProp {
    topic: string
    category: string
    id: number
    editStack: (id: number) => Promise<void>
}

export default function StackAdmin({ topic, category, id }: StackType) {
    const { toast } = useToast()

    const [stackInfo, setStackInfo] = useState({
        topic: topic,
        category: category,
    })
    const [deleted, setDeleted] = useState(false)
    const [cards, setCards] = useState<CardType[]>([])
    const [cardDetails, setCardDetails] = useState({
        stack_id: id,
        question: '',
        answer: '',
    })

    //for editing
    const [stackDetails, setStackDetails] = useState({
        topic: topic,
        category: category,
    })
    const fetchData = async () => {
        if (!id) {
            toast({ title: `Couldnt load stack ${id}` })
            return
        }
        try {
            const response = await fetchCards(id)
            setCards(response)
        } catch (err) {
            toast({ title: "Couldn't load cards" })
        }
    }
    //gets all the cards for current stack
    useEffect(() => {
        fetchData()
    }, [])

    //card function
    const handleCardSubmit = async () => {
        try {
            const response = await createCard({
                question: cardDetails.question,
                answer: cardDetails.answer,
                stack_id: id,
            })
            toast({ title: 'Added new card' })
            setCards([
                ...cards,
                {
                    ...cardDetails,
                    id: response,
                },
            ])
        } catch (err) {
            toast({ title: 'Failed to add new card' })
        }
        setCardDetails({
            ...cardDetails,
            question: '',
            answer: '',
        })
    }

    const handleCardDelete = async (id: number, stack_id: number) => {
        try {
            await deleteCard(id, stack_id)
            setCards(cards.filter((card) => card.id !== id))
            console.log(
                cards.filter(
                    (card) => card.id !== id && card.stack_id !== stack_id
                )
            )
            toast({ title: 'Card deleted successfully' })
        } catch (err) {
            toast({ title: "Couldn't delete the card" })
        }
    }
    //stack functions
    const handleStackEdit = async () => {
        try {
            await editStack({ ...stackDetails, id: id })
            setStackInfo(stackDetails)
            toast({ title: 'Stack edited successfully' })
        } catch (err) {
            toast({ title: 'Failed to edit stack' })
        }
    }
    const handleStackDelete = async () => {
        try {
            await deleteStack(id)
            setDeleted(true)
            toast({ title: 'Deleted stack succesfully' })
        } catch (error) {
            toast({ title: 'Something went wrong' })
        }
    }
    return (
        <AccordionItem
            value={`item-${id}`}
            disabled={deleted}
            className={`${deleted ? 'opacity-50' : 'opacity-100'} transition-opacity ease-in-out`}
        >
            <AccordionTrigger>
                <div className="flex w-full items-center justify-between px-4">
                    {deleted ? (
                        <h2>Removed</h2>
                    ) : (
                        <h2>
                            <span className="text-bold">{stackInfo.topic}</span>{' '}
                            - {stackInfo.category}
                        </h2>
                    )}
                    <div className="flex items-center gap-3">
                        <p className="flex h-6 w-6 items-center justify-center rounded-full bg-primary font-bold text-secondary">
                            {cards.length}
                        </p>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold">
                            Cards ({cards.length})
                        </h1>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Add</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Add question and answer
                                    </DialogTitle>
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
                                    placeholder="Question"
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
                                    placeholder="Answer"
                                />
                                <DialogFooter>
                                    <DialogClose>Close</DialogClose>
                                    <DialogClose asChild>
                                        <Button onClick={handleCardSubmit}>
                                            Save
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <p>Stack options: </p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Edit</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Add topic and category
                                    </DialogTitle>
                                </DialogHeader>
                                <Input
                                    type="text"
                                    value={stackDetails.topic}
                                    onChange={(e) =>
                                        setStackDetails({
                                            ...stackDetails,
                                            topic: e.target.value,
                                        })
                                    }
                                    placeholder="Topic"
                                />
                                <Input
                                    type="text"
                                    value={stackDetails.category}
                                    onChange={(e) =>
                                        setStackDetails({
                                            ...stackDetails,
                                            category: e.target.value,
                                        })
                                    }
                                    placeholder="Category"
                                />
                                <DialogFooter>
                                    <DialogClose>Close</DialogClose>
                                    <DialogClose asChild>
                                        <Button onClick={handleStackEdit}>
                                            Save
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Button onClick={handleStackDelete}>Delete</Button>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    {cards.length ? (
                        cards.map((card, index) => {
                            return (
                                <CardAdmin
                                    {...card}
                                    stack_id={id}
                                    key={index}
                                    handleCardDelete={handleCardDelete}
                                />
                            )
                        })
                    ) : (
                        <p className="text-center text-white/50">
                            Start adding cards
                        </p>
                    )}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
