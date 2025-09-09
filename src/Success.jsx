import React, { useState, useEffect } from 'react'
import './App.css'

function Success() {
  const [isMac, setIsMac] = useState(false)
  const [downloadReady, setDownloadReady] = useState(false)

  useEffect(() => {
    setIsMac(/Mac|Macintosh|Mac OS X/i.test(navigator.userAgent))
  }, [])

  const handleDownload = () => {
    if (!isMac) {
      alert('TuneBar is for macOS. Please download on your Mac.')
      return
    }
    
    // Immediately open the Google Drive download link
    window.open('https://drive.google.com/file/d/1qjzqhGLFgYproCXk2ZeUw78CmpAoN5E1/view?usp=share_link', '_blank')
    
    // Show downloading state briefly
    setDownloadReady(true)
    setTimeout(() => {
      setDownloadReady(false)
    }, 2000)
  }

  return (
    <div className="app">
      <div className="background">
        <div className="bg-gradient"></div>
        <div className="bg-noise"></div>
      </div>

      <nav className="nav glass">
        <div className="container nav-inner">
          <div className="brand">
            <img src="/assets/tunebar logo.png" alt="TuneBar" className="brand-logo" />
            <span className="brand-name">TuneBar</span>
          </div>
        </div>
      </nav>

      <main className="main">
        <div className="container">
          <section className="success-section">
            <div className="success-content">
              {/* Success Icon */}
              <div className="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
              </div>

              {/* Success Message */}
              <h1 className="success-title">
                Payment Successful!
              </h1>
              
              <p className="success-subtitle">
                Thank you for purchasing TuneBar!<br />
                Your app is ready to download.
              </p>

              {/* Download Section */}
              <div className="download-section glass">
                <div className="download-info">
                  <div className="download-details">
                    <div className="detail-item">
                      <span className="detail-label">Version</span>
                      <span className="detail-value">1.0.0</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Size</span>
                      <span className="detail-value">2.4 MB</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Requirements</span>
                      <span className="detail-value">macOS 12.0+</span>
                    </div>
                  </div>

                  <button 
                    className={`download-button glass ${downloadReady ? 'downloading' : ''}`}
                    onClick={handleDownload}
                    disabled={!isMac}
                  >
                    <svg className="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,15 17,10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    {downloadReady ? 'Preparing Download...' : 'Download TuneBar'}
                  </button>

                  {!isMac && (
                    <p className="mac-only-note">
                      TuneBar is for macOS only. Please download on your Mac.
                    </p>
                  )}
                </div>
              </div>

              {/* Support */}
              <div className="support-section">
                <p>Need help? Contact us at <a href="mailto:cupajonas@gmail.com" className="support-link">cupajonas@gmail.com</a></p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#support">Support</a>
            </div>
            <div className="footer-copyright">
              <span>© 2025 TuneBar. All rights reserved. Made with ♥ for Mac</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Success
