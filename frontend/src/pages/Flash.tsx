import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Card from '@/components/Card'
import { useToast } from '@/components/ui/use-toast'

import { CardType } from '@/components/Card'

//fetch all the cards here using the stack id
export default function Flash() {
    const { toast } = useToast()
    const { id } = useParams<{ id: string }>()
    const [cards, setCards] = useState([])
    const [curIndex, setCurIndex] = useState(0)

    const currentCard: CardType = cards[curIndex]

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                toast({ title: 'Stack not found' })
                return
            }
            try {
                const url = new URL('http://localhost:3000/cards')
                url.searchParams.append('id', id)
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json()
                setCards(data)
            } catch (err) {
                toast({ title: 'Error' })
            }
        }
        fetchData()
    }, [])

    const [flipped, setFlipped] = useState(false)
    const handleFlip = (flag: boolean) => {
        setFlipped(flag)
    }

    return (
        <div className="border-tufaccent mx-auto flex h-screen max-w-[800px] flex-col items-center justify-center gap-4 border-2 pt-[60px]">
            <div className="flex w-full flex-col gap-6">
                <div className="flex justify-center">
                    {currentCard ? (
                        <Card
                            {...currentCard}
                            flipped={flipped}
                            handleFlip={handleFlip}
                        />
                    ) : (
                        <div>No card available</div>
                    )}
                </div>
                <div className="flex justify-center gap-4">
                    <Button
                        disabled={curIndex == 0}
                        onClick={() => {
                            setCurIndex((initial) =>
                                initial == 0 ? 0 : initial - 1
                            )
                            handleFlip(false)
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-move-left"
                        >
                            <path d="M6 8L2 12L6 16" />
                            <path d="M2 12H22" />
                        </svg>
                    </Button>
                    <Button
                        onClick={() => {
                            handleFlip(!flipped)
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-eye"
                        >
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </Button>
                    <Button
                        disabled={curIndex == cards.length - 1}
                        onClick={() => {
                            //additional checks just in case
                            setCurIndex((initial) =>
                                initial == cards.length - 1
                                    ? initial
                                    : initial + 1
                            )
                            handleFlip(false)
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-move-right"
                        >
                            <path d="M18 8L22 12L18 16" />
                            <path d="M2 12H22" />
                        </svg>
                    </Button>
                </div>
            </div>
            <p className="text-2xl font-bold">
                {curIndex + 1}
                <span className="text-white/40">/{cards.length}</span>
            </p>
        </div>
    )
}
