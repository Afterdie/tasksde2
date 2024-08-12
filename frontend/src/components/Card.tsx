export interface CardType {
    question: string
    answer: string
    stack_id: number
    id: number
}

interface CardPropType {
    question: string
    answer: string
    flipped: boolean
    handleFlip: (flag: boolean) => void
}

//card gets flipped then does nothing
export default function Card({
    question,
    answer,
    flipped,
    handleFlip,
}: CardPropType) {
    return (
        <div
            onClick={() => handleFlip(true)}
            className={`card-container ${flipped ? 'flipped' : ''}`}
        >
            <div className="card flex h-[300px] w-[400px] flex-col items-center justify-around rounded-lg border-2 border-primary p-4">
                <div className="card-front bg-tufaccent">
                    <div>{question}</div>
                    <img src="" alt="" />
                </div>
                <div className="card-back bg-primary/50">
                    <div>{answer}</div>
                </div>
            </div>
        </div>
    )
}
