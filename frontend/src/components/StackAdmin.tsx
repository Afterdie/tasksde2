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

export default function StackAdmin({ topic, category, id }: StackType) {
    const { toast } = useToast()

    const [cards, setCards] = useState<CardType[]>([])
    const [cardDetails, setCardDetails] = useState({
        stack_id: id,
        question: '',
        answer: '',
    })
    const [stackDetails, setStackDetails] = useState({
        topic: topic,
        category: category,
    })

    //gets all the cards for current stack
    useEffect(() => {
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
        fetchData()
    }, [])

    //card function
    const handleCardSubmit = async () => {
        try {
            const response = await createCard({
                question: cardDetails.question,
                answer: cardDetails.answer,
                stack_id: cardDetails.stack_id,
            })
            toast({ title: 'Added new card' })
            setCards([
                ...cards,
                {
                    ...cardDetails,
                    id: response,
                },
            ])
            console.log(cards)
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
        console.log(id, stack_id)
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
            await editStack(stackDetails) // Added parameters
            toast({ title: 'Stack edited successfully' }) // Added success toast
        } catch (err) {
            toast({ title: 'Failed to edit stack' }) // Added error handling
        }
    }
    const handleStackDelete = async () => {
        try {
            await deleteStack(id)
            toast({ title: 'Deleted stack succesfully' })
        } catch (error) {
            toast({ title: 'Something went wrong' })
        }
    }
    return (
        <AccordionItem value={`item-${id}`}>
            <AccordionTrigger>
                <div className="flex w-full items-center justify-between px-4">
                    <h2>
                        <span className="text-bold">{topic}</span> - {category}
                    </h2>
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
                        <p>Start adding cards</p>
                    )}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
