
import { state } from "./state.js";

function getCustomer(customerId) {
    return state.customers.find(customer => customer.id === customerId);
}

function getProduct(productId) {
    return state.products.find(product => product.id === productId);
}

function getOrderTotal(order) {
    return order.items.reduce((total, item) => {
        const product = getProduct(item.productId);

        if (!product) {
            return total;
        }

        return total + product.price * item.quantity;
    }, 0);
}

export function getOrdersWithDetails() {
    return state.orders.map(order => {
        const customer = getCustomer(order.customerId);

        const items = order.items.map(item => {
            const product = getProduct(item.productId);

            return {
                ...item,
                product,
                lineTotal: product? product.price * item.quantity : 0
            };
        });

        return {
            ...order,
            customer,
            items,
            total: getOrderTotal(order)
        };
    });
}

export function getCategories() {
    return [...new Set(state.products.map(product => product.category))];
}

export function getStatistics() {
    const totalAmount = state.orders.reduce((total, order) => {
        return total + getOrderTotal(order);
    }, 0);

    return {
        totalCustomers: state.customers.length,
        totalProducts: state.products.length,
        totalOrders: state.orders.length,
        totalAmount
    };
}

export function getFilteredOrders() {
    const orders = getOrdersWithDetails();

    return orders.filter(order => {
        const customerName =
            order.customer?.name.toLowerCase() ?? "";

        const search = state.searchTerm.toLowerCase();

        const matchesSearch = customerName.includes(search);

        const matchesStatus =
            state.selectedStatus === "all" ||
            order.status === state.selectedStatus;

        const matchesCategory =
            state.selectedCategory === "all" ||
            order.items.some(item =>
                item.product?.category === state.selectedCategory
            );

        return matchesSearch && matchesStatus && matchesCategory;
    });
}
