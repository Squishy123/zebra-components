/**
 * Component to auto-add an item to a react page
 * Useful for defaulting initial cart items for page
 */

import React, {useEffect} from 'react'
import { useCart } from 'react-use-cart'

import { v4 as uuid } from 'uuid';

export default ({ items }) => {
    const { addItem } = useCart();

    useEffect(() => {
        items.forEach(item => {
                addItem(Object.assign({id: uuid()}, item), item.quantity || 1)
        });
    
        console.log(items)
    }, [])
    
    return (<h1>YAY</h1>);
}