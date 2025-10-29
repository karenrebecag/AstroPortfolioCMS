/**
 * Trigger Astro site rebuild using Vercel Deploy Hook
 * This triggers a full rebuild of the site when content changes
 */
export const triggerAstroRevalidation = async (_routes: string[] = ['/']) => {
  const deployHookUrl = process.env.ASTRO_DEPLOY_HOOK_URL

  if (!deployHookUrl) {
    console.log('⚠️ ASTRO_DEPLOY_HOOK_URL not configured')
    console.log('   Set this in your CMS environment variables to enable auto-updates')
    console.log('   Create a Deploy Hook in Vercel Dashboard:')
    console.log('   1. Go to your project Settings → Git')
    console.log('   2. Scroll to Deploy Hooks section')
    console.log('   3. Create a new hook for the staging/main branch')
    console.log('   4. Copy the URL and set it as ASTRO_DEPLOY_HOOK_URL')
    return
  }

  console.log(`🚀 Triggering site rebuild via Deploy Hook...`)
  console.log(`📡 Deploy Hook URL: ${deployHookUrl.substring(0, 50)}...`)

  try {
    const response = await fetch(deployHookUrl, {
      method: 'POST',
    })

    if (response.ok) {
      console.log(`✅ Deploy triggered successfully!`)
      console.log(`   Status: ${response.status}`)
      console.log(`   Your site will rebuild and deploy in ~1-2 minutes`)
      return { success: true, status: response.status }
    } else {
      console.error(`❌ Failed to trigger deploy:`, response.status, response.statusText)
      return { success: false, status: response.status, error: response.statusText }
    }
  } catch (error) {
    console.error('❌ Failed to trigger deploy hook:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
