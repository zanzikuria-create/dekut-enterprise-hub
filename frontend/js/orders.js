// ======================================================
// DeKUT Nexus — My Orders Page
// ======================================================

const listEl = document.getElementById("ordersList");
const detailEl = document.getElementById("orderDetail");

const params = new URLSearchParams(window.location.search);
const openOrderId = params.get("id");

renderList();

if (openOrderId) {
    const order = getOrderById(openOrderId);
    if (order) renderDetail(order);
}

function renderList() {
    const orders = getOrders();

    if (orders.length === 0) {
        listEl.innerHTML = `
            <div class="panel empty-state">
                <i class="fa-solid fa-box-open"></i>
                <h2>No orders yet</h2>
                <p>Once you check out, your orders will show up here.</p>
                <a href="catalogue.html" class="primary-btn">Start Shopping</a>
            </div>
        `;
        return;
    }

    listEl.innerHTML = orders.map(order => `
        <div class="order-card" data-id="${order.id}">
            <div class="order-card-top">
                <h3>Order ${order.id}</h3>
                <span class="status-pill">${order.status}</span>
            </div>
            <div class="order-card-meta">
                <span><i class="fa-regular fa-calendar"></i> ${new Date(order.date).toLocaleDateString("en-KE", { year: "numeric", month: "short", day: "numeric" })}</span>
                <span><i class="fa-solid fa-wallet"></i> ${formatKsh(order.total)}</span>
                <span><i class="fa-solid fa-credit-card"></i> ${order.payment}</span>
            </div>
            <div class="order-card-items">${order.items.map(i => `${i.name} × ${i.qty}`).join(", ")}</div>
        </div>
    `).join("");

    listEl.querySelectorAll(".order-card").forEach(card => {
        card.addEventListener("click", () => {
            const order = getOrderById(card.dataset.id);
            renderDetail(order);
            history.replaceState(null, "", `?id=${order.id}`);
        });
    });
}

function renderDetail(order) {
    listEl.style.display = "none";
    detailEl.style.display = "block";

    detailEl.innerHTML = `
        <button class="secondary-btn" id="backToListBtn" style="margin-bottom:20px;">
            <i class="fa-solid fa-arrow-left"></i> Back to Orders
        </button>

        <div class="panel">
            ${buildReceiptHTML(order)}

            <div class="receipt-actions">
                <button class="secondary-btn" id="printReceiptBtn">
                    <i class="fa-solid fa-print"></i> Print Receipt
                </button>
            </div>
        </div>
    `;

    document.getElementById("backToListBtn").addEventListener("click", () => {
        detailEl.style.display = "none";
        listEl.style.display = "block";
        history.replaceState(null, "", window.location.pathname);
    });

    document.getElementById("printReceiptBtn").addEventListener("click", () => window.print());
}
