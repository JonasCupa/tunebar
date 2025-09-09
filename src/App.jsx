import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { createCheckoutSession } from './services/stripe.js'
import Success from './Success.jsx'

function Home() {
  const [isMac, setIsMac] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  const screenshots = [
    { src: "/assets/tunebar.png", alt: "TuneBar interface" },
    { src: "/assets/tunebar2.png", alt: "TuneBar menu bar view" }
  ]

  useEffect(() => {
    setIsMac(/Mac|Macintosh|Mac OS X/i.test(navigator.userAgent))
  }, [])

  const handleDownload = async () => {
    if (!isMac) {
      alert('TuneBar is for macOS. Open this page on your Mac to download.')
      return
    }

    try {
      // Start Stripe checkout process
      await createCheckoutSession()
    } catch (error) {
      console.error('Purchase failed:', error)
      alert('Sorry, there was an error starting the purchase process. Please try again.')
    }
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
          <button className="download-btn glass" onClick={handleDownload}>
            Download for Mac
          </button>
        </div>
      </nav>

      <main className="main">
        <div className="container">
          <section className="hero">
            <div className="hero-content">
              <h1 className="hero-title">
                A tuner that lives<br />
                <span className="hero-highlight">in your menu bar</span>
              </h1>
              <p className="hero-subtitle">
                Minimal. Precise. Always within reach.<br />
                <span className="price-tag">Only $3</span>
              </p>
              <div className="hero-cta">
                <button className="cta-button glass" onClick={handleDownload}>
                  <svg className="apple-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Download for macOS
                  <span className="price">$3</span>
                </button>
                <p className="cta-note">
                  {isMac ? 'Apple Silicon & Intel supported' : 'Mac only — view on your Mac to install'}
                </p>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="screenshot-container">
                <div className="screenshot-main glass floating">
                  <img 
                    src={screenshots[activeImage].src}
                    alt={screenshots[activeImage].alt}
                  />
                </div>
                <div className="screenshot-switcher">
                  {screenshots.map((_, index) => (
                    <button
                      key={index}
                      className={`switcher-dot ${activeImage === index ? 'active' : ''}`}
                      onClick={() => setActiveImage(index)}
                      aria-label={`View screenshot ${index + 1}`}
                    />
                  ))}
                </div>
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  )
}

export default App