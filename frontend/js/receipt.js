// ======================================================
// DeKUT Nexus — Receipt Page
// Renders the order matching ?id= from localStorage.
// ======================================================

const receiptEl = document.getElementById("receiptContent");
const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");
const order = orderId ? getOrderById(orderId) : null;

const PAYMENT_LABELS = {
    mpesa: "M-Pesa",
    card: "Debit / Credit Card",
    cod: "Cash / Pay on Delivery",
};

if (!order) {
    receiptEl.innerHTML = `
        <div class="empty-state">
            <i class="fa-solid fa-receipt"></i>
            <h2>Receipt Not Found</h2>
            <p>We couldn't find that order. It may have been placed in a different browser.</p>
            <a href="orders.html" class="view-btn">View My Orders</a>
        </div>
    `;
} else {
    document.title = `Receipt ${order.id} | DeKUT Nexus`;

    const orderDate = new Date(order.date);
    const dateDisplay = orderDate.toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" });
    const timeDisplay = orderDate.toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" });

    let paymentNote = "";
    if (order.payment.method === "mpesa") {
        paymentNote = `M-Pesa number: ${order.payment.details.phone}`;
    } else if (order.payment.method === "card") {
        paymentNote = `Card ending in ${order.payment.details.last4}`;
    } else {
        paymentNote = "Payable in cash on delivery / pickup";
    }

    receiptEl.innerHTML = `
        <div class="receipt-box">

            <div class="receipt-header">
                <i class="fa-solid fa-circle-check"></i>
                <h1>Order Confirmed!</h1>
                <p>Thank you for shopping with DeKUT Nexus.</p>
            </div>

            <div class="receipt-status">
                <i class="fa-solid fa-circle"></i>
                ${order.status}
            </div>

            <div class="receipt-meta">
                <div><strong>Receipt No:</strong> ${order.id}</div>
                <div><strong>Date:</strong> ${dateDisplay} · ${timeDisplay}</div>
                <div><strong>Customer:</strong> ${order.customer.name}</div>
                <div><strong>Phone:</strong> ${order.customer.phone}</div>
                <div><strong>Delivery:</strong> ${order.customer.deliveryMethod === "pickup" ? "Pickup at DeKUT Enterprise Shop" : order.customer.location}</div>
                <div><strong>Payment:</strong> ${PAYMENT_LABELS[order.payment.method] || order.payment.method}</div>
            </div>

            <table class="receipt-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th class="num">Qty</th>
                        <th class="num">Price</th>
                        <th class="num">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td class="num">${item.qty}</td>
                            <td class="num">${formatKsh(item.price)}</td>
                            <td class="num">${formatKsh(item.lineTotal)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>

            <div class="receipt-totals">
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>${formatKsh(order.subtotal)}</span>
                </div>
                <div class="summary-row">
                    <span>Delivery</span>
                    <span>${order.delivery === 0 ? "Free" : formatKsh(order.delivery)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total Paid</span>
                    <span>${formatKsh(order.total)}</span>
                </div>
            </div>

            <p class="form-hint" style="text-align:center;margin-top:10px;">${paymentNote}</p>

            <div class="receipt-footer">
                DeKUT Nexus · Dedan Kimathi University of Technology<br>
                sdc@dekut.ac.ke · +254 701 109 967<br>
                Keep this receipt as proof of purchase.
            </div>

            <div class="receipt-actions">
                <button type="button" class="btn-outline" onclick="window.print()">
                    <i class="fa-solid fa-print"></i> Print Receipt
                </button>
                <a href="orders.html" class="btn-primary">
                    <i class="fa-solid fa-box"></i> View My Orders
                </a>
            </div>

        </div>
    `;
}