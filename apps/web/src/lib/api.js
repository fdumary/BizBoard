const API_BASE = "http://localhost:4000/api";
const authHeaders = () => ({
    "content-type": "application/json",
    authorization: `Bearer ${localStorage.getItem("bizboard-token") ?? "demo-user"}`
});
export async function login(email) {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password: "demo" })
    });
    if (!response.ok) {
        throw new Error("Unable to login.");
    }
    return response.json();
}
export async function fetchCards() {
    const response = await fetch(`${API_BASE}/cards`, { headers: authHeaders() });
    if (!response.ok) {
        throw new Error("Unable to fetch cards.");
    }
    return response.json();
}
export async function fetchTemplates() {
    const response = await fetch(`${API_BASE}/templates`);
    if (!response.ok) {
        throw new Error("Unable to fetch templates.");
    }
    return response.json();
}
export async function createCard(payload) {
    const response = await fetch(`${API_BASE}/cards`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message ?? "Unable to create card.");
    }
    return response.json();
}
export async function fetchPublicCard(slug) {
    const response = await fetch(`${API_BASE}/public/cards/${slug}`);
    if (!response.ok) {
        throw new Error("Card not found.");
    }
    return response.json();
}
