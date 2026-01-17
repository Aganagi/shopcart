import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { Link, router } from '@inertiajs/react'
import useFlashMessages from '@/hooks/useFlashMessages'

export default function AuthModal({ defaultTab = 'login', isOpen }) {
    const [activeTab, setActiveTab] = useState(defaultTab)
    const [errors, setErrors] = useState({})
    const [processing, setProcessing] = useState(false)

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    useEffect(() => {
        if (isOpen) {
            setActiveTab(defaultTab)
            setErrors({})
            setLoginData({ email: '', password: '' })
            setRegisterData({ name: '', email: '', password: '', password_confirmation: '' })
        }
    }, [isOpen, defaultTab])

    const handleLogin = (e) => {
        e.preventDefault()
        setProcessing(true)
        setErrors({})

        router.post('/login', loginData, {
            onSuccess: () => {
                setProcessing(false)
                if (onClose) onClose()
            },
            onError: (errors) => {
                setProcessing(false)
                setErrors(errors)
            }
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        setProcessing(true)
        setErrors({})

        router.post('/register', registerData, {
            onSuccess: () => {
                setProcessing(false)
                if (onClose) onClose()
            },
            onError: (errors) => {
                setProcessing(false)
                setErrors(errors)
            }
        })
    }
    useFlashMessages();
    return (
        <DialogContent className="dark:text-white dark:[&>button]:text-white w-[400px] max-h-[90vh] overflow-y-auto">
            {activeTab === 'login' && (
                <div className="animate-in fade-in-50 duration-300">
                    <DialogHeader className="text-black dark:text-white">
                        <DialogTitle>Login to your account</DialogTitle>
                        <DialogDescription>
                            Enter your email below to login to your account.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col text-black dark:text-white mt-4">
                        <div className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    required
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-sm">{errors.email}</span>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        href="/forgot-password"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-[#063c28] dark:text-[#7fc17f]"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    required
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-sm">{errors.password}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="flex gap-2 flex-col! mt-6">
                        <Button
                            onClick={handleLogin}
                            disabled={processing}
                            className="w-full bg-[#063d29cc] hover:bg-[#063c28] dark:bg-[#2a6a2a] dark:hover:bg-[#1e4f1e]"
                        >
                            {processing ? 'Loading...' : 'Login'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => window.location.href = '/auth/google'}
                        >
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Login with Google
                        </Button>
                        <div className="text-sm text-center text-gray-600 dark:text-gray-400 mt-2">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setActiveTab('register')}
                                className="font-semibold text-[#063c28] dark:text-[#7fc17f] hover:underline underline-offset-4"
                            >
                                Sign up
                            </button>
                        </div>
                    </DialogFooter>
                </div>
            )
            }
            {
                activeTab === 'register' && (
                    <div className="animate-in fade-in-50 duration-300">
                        <DialogHeader className="text-black dark:text-white">
                            <DialogTitle>Create an account</DialogTitle>
                            <DialogDescription>
                                Enter your information to create an account.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col text-black dark:text-white mt-4">
                            <div className="flex flex-col gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={registerData.name}
                                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                        required
                                    />
                                    {errors.name && (
                                        <span className="text-red-500 text-sm">{errors.name}</span>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="reg-email">Email</Label>
                                    <Input
                                        id="reg-email"
                                        type="email"
                                        placeholder="m@example.com"
                                        value={registerData.email}
                                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                        required
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-sm">{errors.email}</span>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="reg-password">Password</Label>
                                    <Input
                                        id="reg-password"
                                        type="password"
                                        value={registerData.password}
                                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                        required
                                    />
                                    {errors.password && (
                                        <span className="text-red-500 text-sm">{errors.password}</span>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirm-password">Confirm Password</Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        value={registerData.password_confirmation}
                                        onChange={(e) => setRegisterData({ ...registerData, password_confirmation: e.target.value })}
                                        required
                                    />
                                    {errors.password_confirmation && (
                                        <span className="text-red-500 text-sm">{errors.password_confirmation}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="flex gap-2 flex-col! mt-6">
                            <Button
                                onClick={handleRegister}
                                disabled={processing}
                                className="w-full bg-[#063d29cc] hover:bg-[#063c28] dark:bg-[#2a6a2a] dark:hover:bg-[#1e4f1e]"
                            >
                                {processing ? 'Loading...' : 'Sign Up'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => window.location.href = '/auth/google'}
                            >
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Sign up with Google
                            </Button>
                            <div className="text-sm text-center text-gray-600 dark:text-gray-400 mt-2">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('login')}
                                    className="font-semibold text-[#063c28] dark:text-[#7fc17f] hover:underline underline-offset-4"
                                >
                                    Sign in
                                </button>
                            </div>
                        </DialogFooter>
                    </div>
                )
            }
        </DialogContent >
    )
}