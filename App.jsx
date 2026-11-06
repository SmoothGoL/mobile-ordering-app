import headerImage from './src/assets/images/header.png'

export default function App() {
    return (
        <>
            <header>
                <img className="header-img" src={headerImage}
                    alt="The restaurant header image with the title, 'Jimmy&apos;s Diner - The best burgers and pizzas in town.'" />
            </header>
            <main>
                <section id="menu-items" className="menu-items"></section>
                {/* <p id="window-width"></p> */}
                <section id="order" className="order"></section>
                <div id="thank-you-message-container" className="thank-you-message-container"></div>
            </main>
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
        </>
    );
}