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
    const [stackDetails, setStackDetails] = useState({
        topic: '',
        category: '',
    })
    const { toast } = useToast()

    const fetchData = async () => {
        try {
            const data = await fetchStacks()
            setStacks(data)
        } catch (err) {
            toast({ title: 'Error fetching data' })
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleStackSubmit = async () => {
        const { topic, category } = stackDetails

        // Validation
        if (!topic || !category) {
            toast({ title: 'Error', description: 'Both fields are required.' })
            return
        }
        try {
            const id = await createStack(stackDetails)
            toast({ title: 'Stack created' })
            setStacks([
                ...stacks,
                {
                    id: id,
                    topic: topic,
                    category: category,
                },
            ])
        } catch (error) {
            toast({
                title: 'Failed to add stack',
                variant: 'destructive',
            })
        }
        setStackDetails({ topic: '', category: '' })
    }

    return (
        <div className="flex flex-col gap-4 p-6 pt-[100px]">
            <div className="flex gap-4">
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
                                <Button onClick={handleStackSubmit}>
                                    Submit
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                {/* <Button onClick={fetchData}>Refresh</Button> */}
            </div>
            <StackSpace stacks={stacks} />
        </div>
    )
}
const StackSpace = ({ stacks }: { stacks: StackType[] }) => {
    return (
        <div className="flex flex-col rounded-lg border-2 border-muted p-2">
            <Accordion type="single" collapsible>
                {stacks.map((stack, index) => {
                    return <StackAdmin {...stack} key={index} />
                })}
            </Accordion>
        </div>
    )
}
