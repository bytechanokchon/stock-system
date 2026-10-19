const API_BASE_URL = "https://localhost:7252/api";

if (!API_BASE_URL) {
    throw new Error("API_BASE_URL not configuration");
}

export async function apiGet<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`API Request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
}

export async function apiPost<T, B = unknown>(
    endpoint: string,
    body: B
): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`API Request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
}