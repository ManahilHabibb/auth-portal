const API_BASE = import.meta.env.VITE_API_URL || '';

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch (e) { json = { error: text }; }
    const err = new Error(json.error || res.statusText);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return res.json();
}

export async function fetchMessages() {
  const url = API_BASE ? `${API_BASE}/api/messages` : '/api/messages';
  const res = await fetch(url);
  return handleResponse(res);
}

export async function postMessage(text) {
  const url = API_BASE ? `${API_BASE}/api/messages` : '/api/messages';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return handleResponse(res);
}
