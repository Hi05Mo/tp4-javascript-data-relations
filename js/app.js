
import { state } from "./state.js";
import { loadData } from "./dataService.js";

import { getStatistics, getFilteredOrders, getOrdersWithDetails, getCategories } from "./selectors.js";

import { renderStatistics, renderCategories, renderOrders, renderOrderDetails, renderError, hideError } from "./view.js";


function renderApp() {
    const stats = getStatistics();
    renderStatistics(stats);

    const orders = getFilteredOrders();
    renderOrders(orders);
}


async function init() {
    try {
        const data = await loadData();

        state.customers = data.customers;
        state.products = data.products;
        state.orders = data.orders;

        const categories = getCategories();
        renderCategories(categories);

        hideError();
        renderApp();

        console.log("Données chargées avec succès !");
    } catch (error) {
        console.error("Erreur lors du chargement :", error);

        renderError(
            "Impossible de charger les données. Vérifiez les fichiers JSON."
        );
    }
}


function handleSearch(event) {
    state.searchTerm = event.target.value.trim();
    renderApp();
}


function handleStatusFilter(event) {
    state.selectedStatus = event.target.value;
    renderApp();
}


function handleCategoryFilter(event) {
    state.selectedCategory = event.target.value;
    renderApp();
}


function handleOrderDetails(event) {
    const button = event.target.closest("[data-order-id]");

    if (!button || !event.currentTarget.contains(button)) {
        return;
    }

    const orderId = Number(button.dataset.orderId);

    const orders = getOrdersWithDetails();

    const order = orders.find(order => order.id === orderId);

    if (!order) {
        renderError("Impossible de trouver cette commande.");
        return;
    }

    hideError();
    renderOrderDetails(order);
}


function setupEventListeners() {
    const searchInput = document.getElementById("search-customer");
    const statusFilter = document.getElementById("filter-status");
    const categoryFilter = document.getElementById("filter-category");
    const ordersTable = document.getElementById("orders-container");

    if (!searchInput || !statusFilter || !categoryFilter || !ordersTable) {
        throw new Error(
            "Un élément HTML est introuvable. Vérifiez les IDs dans index.html."
        );
    }

    searchInput.addEventListener("input", handleSearch);

    statusFilter.addEventListener("change", handleStatusFilter);

    categoryFilter.addEventListener("change", handleCategoryFilter);

    ordersTable.addEventListener("click", handleOrderDetails);
}


async function startApp() {
    try {
        setupEventListeners();
        await init();
    } catch (error) {
        console.error("Erreur lors du démarrage :", error);

        renderError(
            "L'application n'a pas pu démarrer. Vérifiez les éléments HTML."
        );
    }
}

startApp();
