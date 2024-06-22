document.getElementById('mpesa-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const phone = document.getElementById('phone').value;
    const amount = document.getElementById('amount').value;
    const accountReference = document.getElementById('accountReference').value;
    const response = await fetch('/mpesa/pay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone, amount, accountReference })
    });
    const result = await response.json();
    alert(JSON.stringify(result));
});

document.getElementById('stripe-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const amount = document.getElementById('amountStripe').value;
    const source = document.getElementById('card').value;
    const response = await fetch('/stripe/pay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, source })
    });
    const result = await response.json();
    alert(JSON.stringify(result));
});
