//customer_data consists of {name, email, phone, shipping}
export async function generateCustomerToken(customer_data, zebra_host) {
    let customerRes = await fetch(
        zebra_host + "/customer",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                customer_data)
        }
    ).then(r => r.json());
    let local_customer_token = customerRes.customer_token;
    return local_customer_token;
}

//payment_data consists of {price_id, customer_token, order_bump}
export async function generatePaymentToken(payment_data, zebra_host) {
    let paymentRes = await fetch(
        zebra_host + "/products/purchase",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                payment_data
            )
        }
    ).then(r => r.json());
    let payment_intent = paymentRes.payment_intent;
    return payment_intent;
}