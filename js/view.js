
export function renderStatistics(stats) {
    document.getElementById("total-customers").textContent =
        stats.totalCustomers;

    document.getElementById("total-products").textContent =
        stats.totalProducts;

    document.getElementById("total-orders").textContent =
        stats.totalOrders;

    document.getElementById("total-amount").textContent =
        `${stats.totalAmount.toLocaleString("fr-FR")} MAD`;
}

export function renderCategories(categories) {
    const categoryFilter = document.getElementById("filter-category");

    categoryFilter.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "all";
    defaultOption.textContent = "Toutes les catégories";

    categoryFilter.appendChild(defaultOption);

    categories.forEach(category => {
        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);
    });
}

export function renderOrders(orders) {
    const ordersTable = document.getElementById("orders-container");
    const emptyMessage = document.getElementById("empty-message");

    ordersTable.innerHTML = "";

    if (orders.length === 0) {
        emptyMessage.classList.remove("d-none");
        return;
    }

    emptyMessage.classList.add("d-none");

    orders.forEach(order => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer?.name ?? "Client inconnu"}</td>
            <td>${order.date}</td>
            <td>${order.status}</td>
            <td>${order.total.toLocaleString("fr-FR")} MAD</td>
            <td>
                <button
                    type="button"
                    class="btn btn-sm btn-primary"
                    data-order-id="${order.id}">
                    Détails
                </button>
            </td>
        `;

        ordersTable.appendChild(row);
    });
}


export function renderOrderDetails(order) {
    const details = document.getElementById("order-details-section");

    details.classList.remove("d-none");

    if (!order) {
        document.getElementById("order-details").innerHTML =
            "<p>Commande introuvable.</p>";
        return;
    }

    document.getElementById("order-details").innerHTML = `
        <div class="card-body">
            <h5>Commande #${order.id}</h5>
            <p>Client : ${order.customer?.name ?? "Inconnu"}</p>
            <p>Date : ${order.date}</p>
            <p>Statut : ${order.status}</p>
            <p>Total : ${order.total} MAD</p>

            <button id="close-details" class="btn btn-secondary">
                Fermer
            </button>
        </div>
    `;

    document.getElementById("close-details").addEventListener("click", () => {
        details.classList.add("d-none");
    });
}


export function renderError(message) {
    const errorContainer = document.getElementById("error-container");

    errorContainer.textContent = message;
    errorContainer.classList.remove("d-none");
}

export function hideError() {
    const errorContainer = document.getElementById("error-container");

    errorContainer.textContent = "";
    errorContainer.classList.add("d-none");
}
