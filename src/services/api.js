import axios from 'axios'

// ── Axios instance ────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://api.jikan.moe/v4',
  timeout: 10000,
})

// ── Manga endpoints ───────────────────────────────────────────────────────────

/**
 * Get top manga list (paginated)
 * @param {number} page
 * @returns {Promise<{data: Array, pagination: object}>}
 */
export async function getTopManga(page = 1) {
  const res = await api.get('/top/manga', { params: { page, limit: 20 } })
  return res.data
}

/**
 * Search manga by query (paginated)
 * @param {string} query
 * @param {number} page
 * @returns {Promise<{data: Array, pagination: object}>}
 */
export async function searchManga(query, page = 1) {
  const res = await api.get('/manga', {
    params: { q: query, page, limit: 20, order_by: 'popularity' },
  })
  return res.data
}

/**
 * Get single manga details
 * @param {string|number} id
 * @returns {Promise<{data: object}>}
 */
export async function getMangaDetail(id) {
  const res = await api.get(`/manga/${id}`)
  return res.data
}

/**
 * Get manga characters
 * @param {string|number} id
 * @returns {Promise<{data: Array}>}
 */
export async function getMangaCharacters(id) {
  const res = await api.get(`/manga/${id}/characters`)
  return res.data
}

/**
 * Get manga recommendations
 * @param {string|number} id
 * @returns {Promise<{data: Array}>}
 */
export async function getMangaRecommendations(id) {
  const res = await api.get(`/manga/${id}/recommendations`)
  return res.data
}
