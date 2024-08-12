import React from 'react'

import { Link } from 'react-router-dom'
//shadcn
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog'

export default function Navbar() {
    return (
        <div className="absolute top-0 z-50 flex w-full items-center justify-between border-b-2 border-muted bg-secondary p-3">
            <div>Logo here</div>
            <Link to={'/dashboard'}>Dash</Link>
            <Link to={'/'}>Return</Link>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Login</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Login to create your own stacks
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button>Login</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
