export default function ThankYouMessage({ userName }) {
    return (
        <div id="thank-you-message-container" className="thank-you-message-container">
            <p className="thank-you-message">Thanks, {userName}! Your order is on its way!</p>
        </div>
    );
}
