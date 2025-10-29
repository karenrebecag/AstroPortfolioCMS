import { Endpoint } from 'payload'
import { triggerAstroRevalidation } from '../lib/revalidate'

export const deployEndpoint: Endpoint = {
  path: '/deploy',
  method: 'post',
  handler: async (req) => {
    try {
      // Verify user is authenticated
      if (!req.user) {
        return Response.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }

      console.log(`🚀 Manual deploy triggered by user: ${req.user.email}`)

      const result = await triggerAstroRevalidation()

      if (result?.success) {
        return Response.json({
          success: true,
          message: 'Deploy triggered successfully! Your site will rebuild in ~1-2 minutes.',
          timestamp: new Date().toISOString(),
        })
      } else {
        return Response.json(
          {
            success: false,
            error: result?.error || 'Failed to trigger deploy',
          },
          { status: 500 }
        )
      }
    } catch (error) {
      console.error('❌ Deploy endpoint error:', error)
      return Response.json(
        {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 }
      )
    }
  },
}
