import { useEffect, useRef, useState } from 'react';

export default function PaymentModal({ isVisible, onPaymentComplete, onClose }) {
    const dialogRef = useRef(null);
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isVisible && !dialog.open) {
            dialog.showModal();
        } else if (!isVisible && dialog.open) {
            dialog.close();
        }
    }, [isVisible]);

    function handleCancel(e) {
        e.preventDefault();
        onClose();
    }

    function handleBackdropClick(e) {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const rect = dialog.getBoundingClientRect();
        const clickedOutside =
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom;
        if (clickedOutside) {
            onClose();
        }
    }

    function handleFormAction(paymentFormData) {
        onPaymentComplete(paymentFormData);
        setName('');
        setCardNumber('');
        setCvv('');
    }

    return (
        <dialog
            ref={dialogRef}
            className="payment-modal"
            id="payment-modal"
            aria-labelledby="modal-title"
            onCancel={handleCancel}
            onClick={handleBackdropClick}
        >
            <h2 id="modal-title" className="modal-title">Enter card details</h2>
            <form id="payment-form" action={handleFormAction}>
                <input 
                    className="modal-input" 
                    type="text" 
                    name="name" 
                    aria-label="Full name"
                    placeholder="Enter your name" 
                    pattern=".*\S.*"
                    title="Please enter your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required 
                />
                <input
                    className="modal-input"
                    type="text"
                    name="card-number"
                    aria-label="Card number"
                    inputMode="numeric"
                    pattern="[0-9]{8,19}"
                    minLength={8}
                    maxLength={19}
                    placeholder="Enter card number"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value.replace(/\D/g, ''))}
                    required
                />
                <input 
                    className="modal-input" 
                    type="text"
                    name="cvv" 
                    aria-label="CVV"
                    inputMode="numeric"
                    pattern="[0-9]{3,4}"
                    minLength={3}
                    maxLength={4}
                    placeholder="Enter CVV" 
                    value={cvv}
                    onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
                    required 
                />
                <button id="modal-submit-btn" className="modal-submit-btn" type="submit">Pay</button>
            </form>
            <button
                id="modal-close-btn"
                className="modal-close-btn"
                type="button"
                aria-label="Close payment modal"
                onClick={onClose}
            >
                X
            </button>
        </dialog>
    );
}
