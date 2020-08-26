import React from 'react';
import './App.css';

import Entryform from './components/CheckoutForm';
import ZebraSetup from './components/ZebraSetup';
import AddItem from './components/AddItem';

function App() {
    return (
        <div className="App">
            <ZebraSetup stripeKey="pk_test_51GuNRZDB4q9SlwjvYeV7l2LfpGeHlELwxIojSuB7OXrCzNgK9sPcRTKtLv9bYBYbrFN40IiuCFLIdnASPd4pWeDO00pYjFlOPw">
                <AddItem items={[{
                    name: "3-Pack Warsh Cloth",
                    price: 19.99,
                    shipping: 5.0,
                    thumb: "assets/cloth.jpg",
                    stripe_price_id: "price_1H0sTXDB4q9SlwjvR8mAbVVc",
                }]} />
                <Entryform orderBumps={[{
                    name: "2 for 1 Men's Warsh Cloth",
                    price: 24.99,
                    shipping: 0,
                    thumb: "assets/mens-cloth.png",
                    stripe_price_id: "price_1H0sTpDB4q9Slwjvcr12qrqM"
                }]} />
            </ZebraSetup>
        </div>
    );
}

export default App;
