async function fetchJSON(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Erreur lors du chargement de ${url}`);
    }

    return await response.json();
}

export async function loadData() {
    try {
        const [customers, products, orders] = await Promise.all([
            fetchJSON("./data/customers.json"),
            fetchJSON("./data/products.json"),
            fetchJSON("./data/orders.json")
        ]);

        return {
            customers,
            products,
            orders
        };
    } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
        throw error;
    }
}
