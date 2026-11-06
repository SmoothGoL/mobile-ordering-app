export default function ThankYouMessage(props) {
    return (
        <div id="thank-you-message-container" className="thank-you-message-container">
            <p className="thank-you-message">Thanks, {props.userName}! Your order is on its way!</p>
        </div>
    );
}
