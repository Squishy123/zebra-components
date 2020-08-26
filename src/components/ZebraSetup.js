import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useToasts, ToastProvider } from 'react-toast-notifications'
import { CartProvider } from 'react-use-cart'

function useSessionStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item =
                typeof window !== 'undefined' && window.sessionStorage.getItem(key)

            return item ? item : initialValue
        } catch (error) {
            return initialValue
        }
    })

    const setValue = value => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value

            setStoredValue(valueToStore)

            window.sessionStorage.setItem(key, valueToStore)
        } catch (error) {
            console.log(error)
        }
    }

    return [storedValue, setValue]
}

function useTempStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        return initialValue
    })

    const setValue = value => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value

            setStoredValue(valueToStore)
        } catch (error) {
            console.log(error)
        }
    }

    return [storedValue, setValue]
}

export default ({ children, stripeKey }) => {
    const stripePromise = loadStripe(stripeKey)
    return <>
        <ToastProvider autoDismissTimeout={3000}>
            <CartProvider storage={useTempStorage} id="tempStorage">
                <Elements stripe={stripePromise}>
                    {children}
                </Elements>
            </CartProvider>
        </ToastProvider>
    </>
}