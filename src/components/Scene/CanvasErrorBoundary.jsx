import React from 'react'

export class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Viewport Error Boundary caught error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#090d16',
            color: '#f8fafc',
            zIndex: 50,
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</span>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
            3D Viewport Render Fallback
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', maxWidth: '420px', marginBottom: '20px' }}>
            A WebGL graphics error occurred while rendering the digital twin canvas.
          </p>
          <button
            onClick={this.handleRetry}
            style={{
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Reload Viewport
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
