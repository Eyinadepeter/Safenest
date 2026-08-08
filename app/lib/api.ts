const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      Array.isArray(data?.message)
        ? data.message.join(", ")
        : data?.message || "Something went wrong"
    );
  }

  return data;
}