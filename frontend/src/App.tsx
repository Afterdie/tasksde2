import React from 'react'
import Home from './pages/Home'

import Flash from './pages/Flash'
import Dashboard from './pages/HomeAdmin'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'

import { Toaster } from '@/components/ui/toaster'

export default function App() {
    return (
        <div className="relative">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/stack/:id" element={<Flash />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                </Routes>
            </BrowserRouter>
            <Toaster />
        </div>
    )
}
