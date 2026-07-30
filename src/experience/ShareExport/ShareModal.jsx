import { useState } from 'react'
import { useTwinStore } from '../../store/useTwinStore'
import { ExportSystem } from '../../engine/export/ExportSystem'

export function ShareModal() {
  const shareModalOpen = useTwinStore((state) => state.shareModalOpen)
  const toggleShareModal = useTwinStore((state) => state.toggleShareModal)
  const [copySuccess, setCopySuccess] = useState('')

  if (!shareModalOpen) return null

  const shareLink = window.location.href
  const embedCode = ExportSystem.generateIframeEmbedCode(shareLink)

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopySuccess(type)
    setTimeout(() => setCopySuccess(''), 2000)
  }

  const handleScreenshot = () => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const dataUrl = ExportSystem.captureScreenshot(canvas)
      ExportSystem.downloadScreenshot(dataUrl, 'akari-twin-presentation.png')
    } else {
      alert('Could not locate WebGL canvas.')
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
      }}
      onClick={toggleShareModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '480px',
          background: 'rgba(15, 23, 42, 0.96)',
          border: '1px solid rgba(59, 130, 246, 0.4)',
          borderRadius: '20px',
          padding: '24px',
          color: '#fff',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔗</span> Share & Export
          </h2>
          <button
            onClick={toggleShareModal}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '18px' }}
          >
            ✕
          </button>
        </div>

        {/* Share Link */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
            DIRECT SHARE LINK
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              readOnly
              value={shareLink}
              style={{
                flex: 1,
                padding: '10px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#94a3b8',
                fontSize: '13px',
                outline: 'none',
              }}
            />
            <button
              onClick={() => handleCopy(shareLink, 'link')}
              style={{
                padding: '0 16px',
                background: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid #3b82f6',
                color: '#60a5fa',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {copySuccess === 'link' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Embed Code */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
            IFRAME EMBED CODE
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              readOnly
              value={embedCode}
              style={{
                flex: 1,
                padding: '10px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#94a3b8',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'monospace',
              }}
            />
            <button
              onClick={() => handleCopy(embedCode, 'embed')}
              style={{
                padding: '0 16px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#e2e8f0',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {copySuccess === 'embed' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Actions Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            onClick={handleScreenshot}
            style={{
              padding: '12px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              border: 'none',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            📸 Capture 4K Snapshot
          </button>
          <button
            onClick={() => alert('QR Code Generation Modal...')}
            style={{
              padding: '12px',
              borderRadius: '10px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            📱 Get QR Code
          </button>
        </div>
      </div>
    </div>
  )
}
