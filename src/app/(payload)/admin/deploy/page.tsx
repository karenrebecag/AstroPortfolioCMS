'use client'

import React, { useState } from 'react'

export default function DeployPage() {
  const [isDeploying, setIsDeploying] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)

  const handleDeploy = async () => {
    setIsDeploying(true)
    setMessage(null)
    setIsError(false)

    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        credentials: 'include',
      })

      const data = await response.json()

      if (data.success) {
        setMessage(data.message || 'Deploy triggered successfully!')
        setIsError(false)
      } else {
        setMessage(data.error || 'Failed to trigger deploy')
        setIsError(true)
      }
    } catch (error) {
      setMessage('Network error: Could not trigger deploy')
      setIsError(true)
      console.error('Deploy error:', error)
    } finally {
      setIsDeploying(false)

      // Clear message after 8 seconds
      setTimeout(() => {
        setMessage(null)
      }, 8000)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--theme-elevation-0)',
        padding: '40px 20px',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: 'var(--theme-elevation-1000)',
              marginBottom: '12px',
            }}
          >
            🚀 Deploy Site
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--theme-elevation-800)',
              lineHeight: '1.6',
            }}
          >
            Trigger a full rebuild of your Astro portfolio site. This will publish all pending
            content changes to production.
          </p>
        </div>

        {/* Deploy Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <h2
              style={{
                margin: '0 0 12px 0',
                color: 'white',
                fontSize: '24px',
                fontWeight: '600',
              }}
            >
              Ready to Deploy?
            </h2>
            <p
              style={{
                margin: 0,
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: '15px',
                lineHeight: '1.6',
              }}
            >
              Click the button below to start the deployment. Your site will rebuild and be live in
              approximately 1-2 minutes.
            </p>
          </div>

          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            style={{
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: '600',
              color: isDeploying ? '#999' : '#764ba2',
              background: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: isDeploying ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              opacity: isDeploying ? 0.7 : 1,
              width: '100%',
              maxWidth: '300px',
            }}
          >
            {isDeploying ? '⏳ Deploying...' : '🚀 Deploy Now'}
          </button>

          {message && (
            <div
              style={{
                marginTop: '24px',
                padding: '16px 20px',
                borderRadius: '8px',
                background: isError
                  ? 'rgba(239, 68, 68, 0.2)'
                  : 'rgba(34, 197, 94, 0.2)',
                border: `2px solid ${isError ? 'rgba(239, 68, 68, 0.5)' : 'rgba(34, 197, 94, 0.5)'}`,
                color: 'white',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '20px' }}>{isError ? '❌' : '✅'}</span>
              <span>{message}</span>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div
          style={{
            marginTop: '40px',
            padding: '30px',
            background: 'var(--theme-elevation-100)',
            borderRadius: '12px',
            border: '1px solid var(--theme-elevation-200)',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'var(--theme-elevation-1000)',
              marginBottom: '16px',
            }}
          >
            💡 How it works
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: '24px',
              color: 'var(--theme-elevation-800)',
              fontSize: '15px',
              lineHeight: '1.8',
            }}
          >
            <li>Make all your content changes in the CMS collections</li>
            <li>Save each change individually (they won't trigger a deploy automatically)</li>
            <li>When you're ready to publish everything, come to this page and click Deploy</li>
            <li>One single build will include ALL your changes</li>
            <li>This saves Vercel build quota and is more efficient</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
