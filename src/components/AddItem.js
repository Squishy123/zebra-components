/**
 * Component to auto-add an item to a react page
 * Useful for defaulting initial cart items for page
 */

import React, {useEffect} from 'react'
import { useCart } from 'react-use-cart'

export default ({ items }) => {
    const { addItem } = useCart();

    useEffect(() => {
        items.forEach(item => {
            addItem(item);
        });
    
        console.log(items)
    }, [])
    
    return (<h1>YAY</h1>);
}