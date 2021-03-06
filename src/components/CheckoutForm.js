/**
 * CheckoutForm to checkout items in cart
 * UpsellItems can be passed in as a prop
 */
import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useForm } from 'react-hook-form'

import { useToasts, ToastProvider } from 'react-toast-notifications'

import { useCart } from 'react-use-cart';

import PostalCodes from 'postal-codes-js';

import { v4 as uuid } from 'uuid';

import { generateCustomerToken } from './ZebraActions'

const textInputClass = 'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
const errClass = 'text-red-500 text-xs italic absolute right-0 bottom-0 p-px'

const ZEBRA_HOST = 'http://localhost:3000'


const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '18px',
            fontSmoothing: 'antialiased',
        },
    },
};

export default ({ orderBumps }) => {
    const {
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        addItem,
    } = useCart();

    const [step, setStep] = useState(1)

    const { addToast } = useToasts()

    const { register, handleSubmit, handleChange, getValues, errors } = useForm()

    const stripe = useStripe();
    const elements = useElements();

    // zebra data stuff
    const [customer_token, setCustomerToken] = useState("");

    const step1 = async data => {
        let customerToken = await generateCustomerToken({
            name: data.name,
            email: data.email,
            phone: data.phone,
            shipping: {
                address: {
                    line1: data.address,
                    country: data.country,
                    postal_code: data.postal,
                    state: data.state
                },
                name: data.name
            }
        }, ZEBRA_HOST);
        console.log(customerToken)
        setStep(2)
        addToast("Success! Moving to Step 2!", { appearance: 'success', autoDismiss: true })
    }

    return (
        <>
            <div>
                <button onClick={() => { setStep(1) }}>Step 1</button>
                <button onClick={() => { setStep(2) }}>Step 2</button>
            </div>
            <article
                className="w-full flex flex-col items-center justify-start p-5 bg-white shadow-md rounded">
                <div
                    className="container flex flex-wrap sm:flex-no-wrap space-y-5 sm:space-y-0 sm:space-x-5 justify-start sm:justify-center ease-in-out duration-700 mt-5">
                    <div
                        className={`w-full md:w-1/2 flex justify-between sm:justify-center items-start space-x-5 ${step === 1 ? 'text-gray-700' : 'text-gray-500'}`}>
                        <h1 className="text-xl md:text-4xl font-bold">1</h1>
                        <div className="flex flex-col items-end sm:items-center">
                            <h1
                                className="block uppercase tracking-wide text-md md:text-xl font-bold my-auto text-right">
                                Shipping Information
              </h1>
                            <p className="text-right">Where should we send your order?</p>
                        </div>
                    </div>
                    <div
                        className={`w-full md:w-1/2 flex justify-between sm:justify-center items-start space-x-5 ${step === 2 ? 'text-gray-700' : 'text-gray-500'}`}>
                        <h1 className="text-xl md:text-4xl font-bold">2</h1>
                        <div className="flex flex-col items-end sm:items-center">
                            <h1
                                className="block uppercase tracking-wide text-md md:text-xl font-bold my-auto text-right">
                                Your Order
              </h1>
                            <p className="text-right">Your Billing Info</p>
                        </div>
                    </div>
                </div>
                {step == 1 &&
                    <form
                        method="post"
                        className="w-full"
                        onSubmit={handleSubmit(step1)}
                    >
                        <section className="flex flex-wrap -mx-3 my-3">
                            <label
                                className="classNaw-full px-3 mb-3 block uppercase tracking-wide text-gray-700 text-xs font-bold text-left"
                            >
                                Contact
                        </label>
                            <div className="w-full px-3 mb-3 relative">
                                <input
                                    id="name"
                                    name="name"
                                    placeholder="Full Name"
                                    className={`${textInputClass} ${errors.name ? 'border-red-500' : ''}`}
                                    onChange={handleChange}
                                    ref={register({ required: true })}
                                />
                                {errors.name && <p className={errClass}>Full Name is required</p>}
                            </div>

                            <div className="w-full px-3 mb-3 relative">
                                <input
                                    id="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className={`${textInputClass} ${errors.email ? 'border-red-500' : ''}`}
                                    onChange={handleChange}
                                    ref={register({ required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
                                />
                                {errors.email && <p className={errClass}>Please give a valid email address in the format: john.doe@mail.com</p>}
                            </div>

                            <div className="w-full px-3 mb-3 relative">
                                <input
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone Number"
                                    className={`${textInputClass} ${errors.phone ? 'border-red-500' : ''}`}
                                    onChange={handleChange}
                                    ref={register({ required: true, pattern: /^([0-9]{10,11})$/ })}
                                />
                                {errors.phone &&
                                    <p className={errClass}>Please give a valid phone number in the format: 01112223333</p>
                                }
                            </div>
                        </section>

                        <section className="flex flex-wrap -mx-3 my-3">
                            <label
                                className="classNaw-full px-3 mb-3 block uppercase tracking-wide text-gray-700 text-xs font-bold text-left"
                            >
                                Shipping
                        </label>
                            <div className="w-full px-3 mb-3 relative">
                                <input
                                    id="address"
                                    name="address"
                                    placeholder="Full Address"
                                    className={`${textInputClass} ${errors.address ? 'border-red-500' : ''}`}
                                    onChange={handleChange}
                                    ref={register({ required: true })}
                                />
                                {errors.address &&
                                    <p className={errClass}>Full address required</p>
                                }
                            </div>
                            <div className="w-full px-3 mb-3 relative">
                                <input
                                    id="city"
                                    name="city"
                                    placeholder="City"
                                    className={`${textInputClass} ${errors.city ? 'border-red-500' : ''}`}
                                    onChange={handleChange}
                                    ref={register({ required: true })}
                                />
                                {errors.city &&
                                    <p className={errClass}>City required</p>
                                }
                            </div>

                            <div className="w-full md:w-8/12 px-3 mb-3 relative">
                                <input
                                    id="state"
                                    name="state"
                                    placeholder="State/Province"
                                    className={`${textInputClass} ${errors.state ? 'border-red-500' : ''}`}
                                    onChange={handleChange}
                                    ref={register({ required: true })}
                                />
                                {errors.state &&
                                    <p className={errClass}>Valid State required</p>
                                }
                            </div>
                            <div className="w-full md:w-4/12 px-3 mb-3 relative">
                                <input
                                    id="postal"
                                    name="postal"
                                    placeholder="Postal Code"
                                    className={`${textInputClass} ${errors.postal ? 'border-red-500' : ''}`}
                                    onChange={handleChange}
                                    ref={register({
                                        required: true, validate: value => {
                                            return PostalCodes.validate(getValues().country, value)
                                        }
                                    })}
                                />
                                {errors.postal &&
                                    < p className={errClass}>Postal code required</p>
                                }
                            </div>

                            <div className="w-full px-3 mb-3">
                                <div className="relative">
                                    <select
                                        className="block appearance-none w-full bg-gray-200 border
                border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded
                leading-tight focus:outline-none focus:bg-white
                focus:border-gray-500"
                                        ref={register({ required: true })}
                                        onChange={handleChange}
                                        id="country"
                                        name="country">
                                        <option value="CA">Canada</option>
                                        <option value="US">United States</option>
                                    </select>
                                    <div
                                        className="pointer-events-none absolute inset-y-0 right-0 flex
                items-center px-2 text-gray-700">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path
                                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828
                    5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded w-full"
                            type="submit">
                            Go to Step #2
                      </button>
                        <p className="my-3 text-gray-600 text-center text-sm">
                            We Respect Your Privacy & Information
                      </p>
                    </form>
                }
                {
                    step == 2 &&
                    <form className="w-full">
                        <div className="w-full py-10">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2 text-left"
                            >
                                Credit or debit card
                            </label>
                            <div className="flex flex-wrap mb-6">
                                <div className="w-full" id="card-element">
                                    < CardElement options={CARD_OPTIONS} />
                                </div>
                            </div>
                        </div>

                        <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
            rounded`} type="submit" disabled={!stripe}>
                            Pay
                        </button>
                        {orderBumps.map(bump => (
                            <div className="flex flex-wrap my-3 border-4 border-dashed border-gray-600" key={uuid()}>
                                <label
                                    className="w-full block bg-orange-200 flex justify-between items-center p-4">
                                    <input className="leading-tight" type="checkbox" />
                                    <span className="text-lg font-bold">
                                        <span className="text-red-600">Yes! </span>
                                        <span className="text-green-600">Add 2 for 1 Men's Warsh Cloth</span>
                                    </span>
                                    <span className="text-lg">$24.99</span>
                                </label>
                                <div className="w-full flex flex-wrap sm:flex-no-wrap p-4">
                                    <div className="w-full sm:w-1/2">
                                        <img src="assets/mens-cloth.png" alt="mens cloth" />
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <p className="text-lg font-bold mb-5">THE WARSH CLOTH™ FOR HIM</p>
                                        <p className="font-semibold mb-5">
                                            Reenergize, cleanse, and exfoliate your face all in one!
     </p>
                                        <p className="mb-5">
                                            Use plain water and the WARSH Cloth before and after your shave
                                            - and last thing at night or when you start to feel grimy--to
                                            clean up fast and look great. Don't over dry and age your skin
                                            with soap.
     </p>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </form>
                }
            </article>
        </>
    )
}
