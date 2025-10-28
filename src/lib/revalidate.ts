/**
 * Trigger Astro on-demand ISR revalidation when content changes
 * This invalidates the cache and regenerates pages without a full rebuild
 */
export const triggerAstroRevalidation = async (routes: string[] = ['/']) => {
  const siteUrl = process.env.ASTRO_SITE_URL || process.env.SITE_URL
  const bypassToken = process.env.ASTRO_ISR_BYPASS_TOKEN

  if (!siteUrl || !bypassToken) {
    console.log('⚠️ ASTRO_SITE_URL and ASTRO_ISR_BYPASS_TOKEN not configured')
    console.log('   Set these in your CMS environment variables to enable auto-updates')
    console.log('   ASTRO_SITE_URL: https://www.karenortiz.space')
    console.log('   ASTRO_ISR_BYPASS_TOKEN: <your-32-char-token>')
    return
  }

  console.log(`🔑 Using bypass token: ${bypassToken.substring(0, 8)}...${bypassToken.substring(bypassToken.length - 4)}`)
  console.log(`🌐 Site URL: ${siteUrl}`)

  try {
    // Revalidate each route by calling it directly with the bypass header
    const results = await Promise.all(
      routes.map(async (route) => {
        const url = `${siteUrl}${route}`
        console.log(`📡 Revalidating route: ${url}`)

        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'x-prerender-revalidate': bypassToken,
            },
          })

          const cacheStatus = response.headers.get('X-Vercel-Cache')
          const success = cacheStatus === 'REVALIDATED' || cacheStatus === 'BYPASS' || cacheStatus === 'MISS'

          // Log all Vercel-related headers for debugging
          const vercelHeaders = {
            cache: cacheStatus,
            id: response.headers.get('X-Vercel-Id'),
            cacheControl: response.headers.get('Cache-Control'),
          }

          console.log(`📥 Route ${route} - Status: ${response.status}, Cache: ${cacheStatus}, Success: ${success}`)
          console.log(`   Vercel Headers:`, JSON.stringify(vercelHeaders, null, 2))

          return { route, success, cacheStatus, status: response.status }
        } catch (error) {
          console.error(`❌ Failed to revalidate ${route}:`, error)
          return { route, success: false, error: error instanceof Error ? error.message : 'Unknown error' }
        }
      })
    )

    const allSuccess = results.every(r => r.success)

    if (allSuccess) {
      console.log('✅ All routes revalidated successfully:', results)
    } else {
      console.warn('⚠️ Some routes failed to revalidate:', results)
    }
  } catch (error) {
    console.error('❌ Failed to trigger Astro revalidation:', error)
  }
}
