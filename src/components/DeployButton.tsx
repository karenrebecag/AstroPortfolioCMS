import React, { useState } from 'react'

export const DeployButton: React.FC = () => {
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
        headers: {
          'Content-Type': 'application/json',
        },
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

      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div
      style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '8px',
        margin: '20px 0',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <div>
          <h3
            style={{
              margin: '0 0 8px 0',
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
            }}
          >
            🚀 Deploy Site
          </h3>
          <p
            style={{
              margin: 0,
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '14px',
              lineHeight: '1.5',
            }}
          >
            Trigger a full rebuild of your Astro site to publish all pending changes
          </p>
        </div>

        <button
          onClick={handleDeploy}
          disabled={isDeploying}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            color: isDeploying ? '#999' : '#764ba2',
            background: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isDeploying ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            opacity: isDeploying ? 0.7 : 1,
            minWidth: '140px',
          }}
          onMouseEnter={(e) => {
            if (!isDeploying) {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          {isDeploying ? '⏳ Deploying...' : '🚀 Deploy Now'}
        </button>
      </div>

      {message && (
        <div
          style={{
            marginTop: '15px',
            padding: '12px 16px',
            borderRadius: '6px',
            background: isError
              ? 'rgba(239, 68, 68, 0.2)'
              : 'rgba(34, 197, 94, 0.2)',
            border: `1px solid ${isError ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 197, 94, 0.4)'}`,
            color: 'white',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>{isError ? '❌' : '✅'}</span>
          <span>{message}</span>
        </div>
      )}
    </div>
  )
}
