import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Stack from '@/components/Stack'
import { useToast } from '@/components/ui/use-toast'
//type imports
import { StackType } from '@/components/Stack'

const initialStacks: StackType[] = [
    {
        topic: 'Sex',
        category: 'Bio',
        id: 12314,
    },
    {
        topic: 'balls',
        category: 'Bio',
        id: 12314,
    },
    {
        topic: 'twe',
        category: 'Bio',
        id: 12314,
    },
    {
        topic: 'dhva',
        category: 'Bio',
        id: 12314,
    },
]
//the stacks will need to be in a stack because it is going to be fetched
export default function Home() {
    const { toast } = useToast()
    const [stacks, setStacks] = useState<StackType[]>([])
    const [results, setResults] = useState<StackType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/stacks')
                const data = await response.json()
                setStacks(data)
                setResults(data)
                console.log(data)
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
        <div className="pt-[70px]">
            <SearchBar handleSearchChange={handleSearchChange} />
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
        <div>
            <MagnifyingGlassIcon />
            <input type="text" onChange={handleInputChange} value={query} />
        </div>
    )
}
const StackSpace = ({ stacks }: { stacks: StackType[] }) => {
    return (
        <div className="grid grid-cols-4 gap-10 border-2 border-muted p-4">
            {stacks.map((stack: StackType, index: number) => {
                return <Stack {...stack} key={index} />
            })}
        </div>
    )
}
