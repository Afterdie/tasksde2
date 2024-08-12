import { Link } from 'react-router-dom'
//shadcn
import { Button } from './ui/button'
import logo from '../../public/logo.svg'

export default function Navbar() {
    return (
        <div className="absolute top-0 z-50 flex w-full items-center justify-between border-b-2 border-muted bg-secondary px-3">
            <div className="flex items-center font-bold">
                <img src={logo} alt="" className="h-14 w-14" />
                tacks
            </div>
            <div className="flex items-center gap-6">
                <Link to={'/'}>Home</Link>
                <Link to={'/dashboard'}>
                    <Button>Dashboard</Button>
                </Link>
            </div>
        </div>
    )
}
