import { getTopManga, searchManga, getMangaDetail, getMangaCharacters } from './api.js'

/**
 * Loader for HomePage – fetches top manga list
 */
export async function homeLoader({ request }) {
  const url = new URL(request.url)
  const page = Number(url.searchParams.get('page')) || 1
  const data = await getTopManga(page)
  return { ...data, currentPage: page }
}

/**
 * Loader for SearchPage – fetches search results
 */
export async function searchLoader({ request }) {
  const url = new URL(request.url)
  const query = url.searchParams.get('q') ?? ''
  const page  = Number(url.searchParams.get('page')) || 1

  if (!query.trim()) return { data: [], pagination: null, query: '', currentPage: 1 }

  const data = await searchManga(query, page)
  return { ...data, query, currentPage: page }
}

/**
 * Loader for DetailPage – fetches manga + characters in parallel
 */
export async function detailLoader({ params }) {
  const { id } = params
  const [mangaRes, charsRes] = await Promise.allSettled([
    getMangaDetail(id),
    getMangaCharacters(id),
  ])

  if (mangaRes.status === 'rejected') {
    throw new Response('مانگا پیدا نشد', { status: 404 })
  }

  return {
    manga: mangaRes.value.data,
    characters: charsRes.status === 'fulfilled' ? charsRes.value.data.slice(0, 12) : [],
  }
}
