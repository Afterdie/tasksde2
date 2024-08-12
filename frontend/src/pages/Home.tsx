import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Stack from '@/components/Stack'
import { useToast } from '@/components/ui/use-toast'
//type imports
import { StackType } from '@/components/Stack'
import { fetchStacks } from '../utils/Stack'
import { Input } from '@/components/ui/input'

const topics = [
    'Science',
    'Biology',
    'SQL',
    'C++',
    'Databases',
    'OOPS',
    'Algorithms',
    'CP',
]

//the stacks will need to be in a stack because it is going to be fetched
export default function Home() {
    const { toast } = useToast()
    const [stacks, setStacks] = useState<StackType[]>([])
    const [results, setResults] = useState<StackType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchStacks()
                setStacks(data)
                setResults(data)
            } catch (err) {
                toast({ title: 'Error fetching data' })
            }
        }
        fetchData()
    }, [])

    const handleSearchChange = (query: string) => {
        setResults(() => {
            return query === ''
                ? stacks
                : stacks.filter((stack) =>
                      stack.topic.toLowerCase().includes(query.toLowerCase())
                  )
        })
    }

    return (
        <div className="mx-auto flex max-w-[1000px] flex-col gap-4 pt-[70px]">
            <SearchBar handleSearchChange={handleSearchChange} />
            <div className="grid grid-cols-4 gap-4">
                {topics.map((topic, index) => {
                    return <Category topic={topic} key={index} />
                })}
            </div>
            <StackSpace stacks={results} />
        </div>
    )
}

interface SearchBarProps {
    handleSearchChange: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearchChange }) => {
    const [query, setQuery] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value
        setQuery(newQuery)
        handleSearchChange(newQuery)
    }

    return (
        <div className="flex items-center gap-4 rounded-md border-2 border-muted p-2 px-4 transition-colors duration-300 ease-in-out hover:border-primary">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8ea3af"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search"
            >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
            </svg>
            <input
                type="text"
                onChange={handleInputChange}
                value={query}
                placeholder="Search by topics"
                className="bg-transparent text-lg focus:outline-none"
            />
        </div>
    )
}

const Category = ({ topic }: { topic: string }) => {
    return (
        <div className="bg-tuf border-tufaccent col-span-1 row-span-1 translate-y-0 rounded-lg border-2 p-3 text-center text-xl font-medium text-white transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-primary/80">
            {topic}
        </div>
    )
}

const StackSpace = ({ stacks }: { stacks: StackType[] }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Stacks ({stacks.length})</h1>
            <div className="mt-6 grid grid-cols-4 gap-10">
                {stacks.map((stack: StackType, index: number) => {
                    return <Stack {...stack} key={index} />
                })}
            </div>
        </div>
    )
}
