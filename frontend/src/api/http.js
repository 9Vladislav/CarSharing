import { API_URL } from "./init";

export async function api(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const message = data?.error || data?.message || `HTTP ${res.status}`;
    const code = data?.code ?? null;
    const err = new Error(message);
    err.status = res.status;
    err.code = code;
    err.data = data;
    throw err;
  }

  return data;
}
