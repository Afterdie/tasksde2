import { CardType } from '@/components/Card'

export function fetchCards(id: number): Promise<CardType[]>

export function createCard(params: {
    question: string
    answer: string
    stack_id: number
}): Promise<number>

export declare const editCard = (cardDetails: CardType) => Promise<void>

export declare const deleteCard = (id: number, stack_id: number) =>
    Promise<void>
