import React, { useState } from 'react'

export interface CardType {
    question: string
    answer: string
}

//card gets flipped then does nothing
export default function Card({ question, answer }: CardType) {
    return (
        //"border-primary h-10 w-10 rotate-0 border-2 transition-all duration-300 hover:rotate-6 hover:scale-110 hover:opacity-0"
        <div className="border-primary flex flex-col border-2">
            <div>{question}</div>
            <div>{answer}</div>
        </div>
    )
}
