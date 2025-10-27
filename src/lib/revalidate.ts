/**
 * Trigger Astro revalidation when content changes
 * This uses ISR (Incremental Static Regeneration) to update the site
 * without requiring a full rebuild
 */
export const triggerAstroRevalidation = async (paths: string[] = ['/']) => {
  const revalidateUrl = process.env.ASTRO_REVALIDATE_URL
  const revalidateToken = process.env.ASTRO_REVALIDATE_TOKEN

  if (!revalidateUrl || !revalidateToken) {
    console.log('⚠️ ASTRO_REVALIDATE_URL or ASTRO_REVALIDATE_TOKEN not configured')
    return
  }

  try {
    const response = await fetch(revalidateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-token': revalidateToken
      },
      body: JSON.stringify({ paths })
    })

    if (response.ok) {
      const data = await response.json()
      console.log('✅ Astro revalidation triggered:', data)
    } else {
      const error = await response.text()
      console.error('❌ Astro revalidation failed:', error)
    }
  } catch (error) {
    console.error('❌ Failed to trigger Astro revalidation:', error)
  }
}
