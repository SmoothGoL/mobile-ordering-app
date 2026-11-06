export default function PaymentModal() {
    return (
        <div className="payment-modal" id="payment-modal">
            <h2 className="modal-title">Enter card details</h2>
            <form id="payment-form">
                <input className="modal-input" type="text" name="name" placeholder="Enter your name" required />
                <input className="modal-input" type="text" name="card-number" placeholder="Enter card number" required />
                <input className="modal-input" type="text" name="cvv" placeholder="Enter CVV" required />
                <button id="modal-submit-btn" className="modal-submit-btn" type="submit">Pay</button>
            </form>
            <button id="modal-close-btn" className="modal-close-btn">X</button>
        </div>
    );
}