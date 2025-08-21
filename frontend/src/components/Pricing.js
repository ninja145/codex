import React from 'react';

const Pricing = () => {
    const handlePayment = () => {
        // IMPORTANT: The payment flow requires a backend server to create an order_id.
        // This is a frontend-only implementation for demonstration purposes.
        const options = {
            key: 'YOUR_KEY_ID', // IMPORTANT: Replace this with your actual Razorpay Key ID from the dashboard.
            amount: '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: 'INR',
            name: 'ExigentUSA',
            description: 'Doctor Subscription',
            image: 'https://example.com/your_logo',
            // order_id: 'order_9A33XWu170gUtm', // This should be generated from your server.
            handler: function (response) {
                alert('Payment successful: ' + response.razorpay_payment_id);
                // Here you would typically send the response to your backend for verification.
            },
            prefill: {
                name: 'Test User',
                email: 'test.user@example.com',
                contact: '9999999999',
            },
            notes: {
                address: 'Razorpay Corporate Office',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <section id="pricing">
            <h2>Pricing</h2>
            <p>We offer various subscription plans for doctors.</p>
            <button onClick={handlePayment} className="btn btn-success">Subscribe Now</button>
        </section>
    );
};

export default Pricing;
