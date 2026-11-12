export default function PaymentModal(props) {

    function completePayment(paymentFormData) {
        props.setUserName(paymentFormData.get('name').trim());
        props.setOrderArr([]);
        props.setAppStatus('success')
    }

    function handleClose() {
        props.setAppStatus('ordering')
    }

    return (
        <div className="payment-modal" style={{display: (props.isVisible ? 'block' : 'none')}} id="payment-modal">
            <h2 className="modal-title">Enter card details</h2>
            <form id="payment-form" action={completePayment}>
                <input 
                    className="modal-input" 
                    type="text" 
                    name="name" 
                    aria-label="Full name"
                    placeholder="Enter your name" 
                    required 
                />
                <input 
                    className="modal-input" 
                    type="text" 
                    name="card-number" 
                    aria-label="Card number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter card number" 
                    required 
                />
                <input 
                    className="modal-input" 
                    type="text" name="cvv" 
                    aria-label="CVV"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter CVV" 
                    required 
                />
                <button id="modal-submit-btn" className="modal-submit-btn" type="submit">Pay</button>
            </form>
            <button id="modal-close-btn" className="modal-close-btn" onClick={handleClose}>X</button>
        </div>
    );
}
