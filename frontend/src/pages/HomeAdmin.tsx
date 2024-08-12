import { useState, useEffect } from 'react'

//shadcn
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Accordion } from '@/components/ui/accordion'

//comps
import StackAdmin from '@/components/StackAdmin'

//types
import { StackType } from '@/components/Stack'

//utils
import { fetchStacks, createStack } from '../utils/Stack'

export default function Dashboard() {
    const [stacks, setStacks] = useState<StackType[]>([])
    const [stackDetails, setStackDetails] = useState<StackType>({
        id: 0,
        topic: '',
        category: '',
    })
    const { toast } = useToast()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchStacks()
                setStacks(data)
            } catch (err) {
                toast({ title: 'Error fetching data' })
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async () => {
        const { topic, category } = stackDetails

        // Validation
        if (!topic || !category) {
            toast({ title: 'Error', description: 'Both fields are required.' })
            return
        }
        try {
            await createStack({ topic, category })
            toast({ title: 'Stack created' })

            setStackDetails({ id: 0, topic: '', category: '' })
        } catch (error) {
            toast({
                title: 'Failed to add stack',
                variant: 'destructive',
            })
        }
        setStacks([
            ...stacks,
            {
                id: stacks.length,
                topic: topic,
                category: category,
            },
        ])
    }

    return (
        <div className="pt-[100px]">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Add Stack</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add topic and category</DialogTitle>
                    </DialogHeader>
                    <input
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
                    <input
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
                        <DialogClose asChild>
                            <Button onClick={handleSubmit}>Submit</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <StackSpace stacks={stacks} />
        </div>
    )
}
const StackSpace = ({ stacks }: { stacks: StackType[] }) => {
    return (
        <div className="flex flex-col border-2 border-muted p-4">
            <Accordion type="single" collapsible>
                {stacks.map((stack, index) => {
                    return <StackAdmin {...stack} key={index} />
                })}
            </Accordion>
        </div>
    )
}
