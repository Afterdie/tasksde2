import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
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

    const handleChangeIndex = () => {}

    return (
        <div className="border-tufaccent mx-auto flex h-screen max-w-[800px] justify-between border-2 pt-[60px]">
            <div className="flex-1">
                <div className="flex justify-center">
                    {currentCard ? (
                        <Card {...currentCard} />
                    ) : (
                        <div>No card available</div>
                    )}
                </div>
                <Button
                    disabled={curIndex == 0}
                    onClick={() =>
                        setCurIndex((initial) =>
                            initial == 0 ? 0 : initial - 1
                        )
                    }
                >
                    Previous
                </Button>
                <Button>Flip</Button>
                <Button
                    disabled={curIndex == cards.length - 1}
                    onClick={() => {
                        //additional checks just in case
                        setCurIndex((initial) =>
                            initial == cards.length - 1 ? initial : initial + 1
                        )
                        console.log(curIndex)
                    }}
                >
                    Next
                </Button>
                <Link to={'/'}>
                    <Button>Return</Button>
                </Link>
            </div>
        </div>
    )
}
