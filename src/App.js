import React from 'react';
import './App.css';

import { useToasts, ToastProvider } from 'react-toast-notifications'

import Entryform from './components/EntryForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ZebraSetup from './components/ZebraSetup';


function App() {
    const stripePromise = loadStripe(`pk_test_51GuNRZDB4q9SlwjvYeV7l2LfpGeHlELwxIojSuB7OXrCzNgK9sPcRTKtLv9bYBYbrFN40IiuCFLIdnASPd4pWeDO00pYjFlOPw`)

    return (
        <div className="App">
            <ToastProvider autoDismissTimeout={3000}>
                <Elements stripe={stripePromise}>
                    <ZebraSetup />
                    <Entryform />
                </Elements>
            </ToastProvider>
        </div>
    );
}

export default App;
