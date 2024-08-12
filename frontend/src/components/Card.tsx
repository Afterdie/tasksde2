import React, { useState } from 'react'

export interface CardType {
    question: string
    answer: string
    stack_id: number
    id: number
}

//card gets flipped then does nothing
export default function Card({ question, answer }: CardType) {
    return (
        //"border-primary h-10 w-10 rotate-0 border-2 transition-all duration-300 hover:rotate-6 hover:scale-110 hover:opacity-0"
        <div className="bg-tufaccent flex">
            <div className="flex h-[300px] w-[400px] flex-col items-center justify-around rounded-lg border-2 border-primary p-4">
                <div>{question}</div>
                <div>
                    <img src="" alt="" />
                </div>
                {/* <div>{answer}</div> */}
            </div>
        </div>
    )
}
