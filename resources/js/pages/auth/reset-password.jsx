import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { router, useForm } from '@inertiajs/react'
import React from 'react'
import toast from 'react-hot-toast'

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        router.post('/reset-password', {
            token: data.token,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation
        }, {
            onSuccess: () => {
                toast.success('Password reset successfully. Please login.'),
                setTimeout(() => {
                    router.visit('/')
                }, 3000)
            },
            onError: () => {
                toast.error(
                    <div>
                        Something went wrong.<br />
                        Please try again.
                    </div>)
            }
        })
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>Enter your new password</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="email" className="mt-1">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                required
                                readOnly
                            />
                            {errors.email && (
                                <div className="text-sm text-red-600 mt-1">{errors.email}</div>
                            )}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                required
                            />
                            {errors.password && (
                                <div className="text-sm text-red-600 mt-1">{errors.password}</div>
                            )}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                required
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full cursor-pointer"
                        onClick={handleSubmit}
                        disabled={processing}
                    >
                        {processing ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}