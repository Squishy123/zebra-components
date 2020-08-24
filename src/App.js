import React from 'react';
import logo from './logo.svg';
import './App.css';

import Entryform from './components/EntryForm';
import { loadStripe } from '@stripe/stripe-js';

function App() {
  return (
    <div className="App">
        <Entryform stripePromise={loadStripe(`pk_test_51GuNRZDB4q9SlwjvYeV7l2LfpGeHlELwxIojSuB7OXrCzNgK9sPcRTKtLv9bYBYbrFN40IiuCFLIdnASPd4pWeDO00pYjFlOPw`)}/>
    </div>
  );
}

export default App;
