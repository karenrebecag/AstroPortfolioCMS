/**
 * Trigger Astro on-demand ISR revalidation when content changes
 * This invalidates the cache and regenerates pages without a full rebuild
 */
export const triggerAstroRevalidation = async (routes: string[] = ['/']) => {
  const revalidateUrl = process.env.ASTRO_REVALIDATE_URL
  const revalidateToken = process.env.ASTRO_REVALIDATE_TOKEN

  if (!revalidateUrl || !revalidateToken) {
    console.log('⚠️ ASTRO_REVALIDATE_URL or ASTRO_REVALIDATE_TOKEN not configured')
    console.log('   Set these in your CMS environment variables to enable auto-updates')
    return
  }

  try {
    console.log('📡 Sending revalidation request to:', revalidateUrl)
    const response = await fetch(revalidateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-token': revalidateToken
      },
      body: JSON.stringify({ routes })
    })

    console.log('📥 Response status:', response.status, response.statusText)

    const responseText = await response.text()
    console.log('📄 Response body:', responseText)

    if (response.ok) {
      try {
        const data = responseText ? JSON.parse(responseText) : {}
        console.log('✅ Astro ISR revalidation triggered successfully:', data)
      } catch (parseError) {
        console.warn('⚠️ Response was successful but body is not valid JSON:', responseText)
      }
    } else {
      console.error('❌ Astro revalidation failed:', response.status, responseText)
    }
  } catch (error) {
    console.error('❌ Failed to trigger Astro revalidation:', error)
  }
}
