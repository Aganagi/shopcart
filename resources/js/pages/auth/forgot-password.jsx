import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Link, router, useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function ForgotPassword({ status }) {
    const { data, setData, processing, errors } = useForm({
        email: '',
    });

    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        router.post('/forgot-password', {
            email: data.email,
        }, {
            onSuccess: () => {
                toast.success('Please check your email and reset your password.'),
                    setSent(true)
            },
            onError: () => {
                toast.error(
                    <div>
                        Something went wrong.<br />
                        Please try again.
                    </div>
                )
            }
        })
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Forgot Password?</CardTitle>
                    <CardDescription>
                        {status
                            ? 'Please check your email and reset your password.'
                            : 'Enter your email to get a reset link'}
                    </CardDescription>
                    <CardAction>
                        <Link href="/" className='text-sm text-black dark:text-white'>Go back</Link>
                    </CardAction>
                </CardHeader>
                {sent ? (
                    <div className="text-sm text-center text-black dark:text-white">
                        We have emailed your password reset link.
                    </div>
                ) : (
                    <CardContent>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <Input
                                type="email"
                                placeholder="m@example.com"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                required />
                            {errors.email && (
                                <div className="text-sm text-red-600 mt-2">{errors.email}</div>
                            )}
                        </form>
                    </CardContent>
                )}
                {!sent ? (
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full cursor-pointer"
                            onClick={handleSubmit}
                            disabled={processing}
                        >
                            {processing ? 'Sending...' : 'Send Reset Link'}
                        </Button>
                    </CardFooter>) : (
                    <CardFooter>
                        <Link href="/" className="w-full">
                            <Button variant="outline" className="w-full">
                                Back to Home
                            </Button>
                        </Link>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}
