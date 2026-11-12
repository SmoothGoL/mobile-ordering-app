import { useEffect, useRef } from 'react';

export default function PaymentModal({ isVisible, onPaymentComplete, onClose }) {
    const dialogRef = useRef(null);

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
            <form id="payment-form" action={onPaymentComplete}>
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
