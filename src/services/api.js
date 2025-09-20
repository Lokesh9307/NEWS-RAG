const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'


export async function createSession() {
    const res = await fetch(`${API_BASE}/api/sessions/new`, { method: 'POST' })
    return res.json()
}


export async function getHistory(sessionId) {
    const res = await fetch(`${API_BASE}/api/sessions/${sessionId}/history`)
    return res.json()
}


export async function clearSession(sessionId) {
    const res = await fetch(`${API_BASE}/api/sessions/${sessionId}/clear`, { method: 'POST' })
    return res.json()
}


// Not used directly in the UI (we use socket streaming), but kept for completeness
export async function sendQueryToNode(sessionId, message) {
    const res = await fetch(`${API_BASE}/api/chat/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message })
    })
    return res.json()
}