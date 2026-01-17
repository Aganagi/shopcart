import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function useFlashMessages() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.message) {
            toast.success(flash.message);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }

        if (flash?.warning) {
            toast(flash.warning, {
                icon: '⚠️',
            });
        }

        if (flash?.info) {
            toast(flash.info, {
                icon: 'ℹ️',
            });
        }
    }, [flash]);
}