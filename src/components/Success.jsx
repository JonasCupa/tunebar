import React, { useEffect } from 'react'

function Success() {
  useEffect(() => {
    // Here you could trigger the actual download
    // or redirect to a download page
    console.log('Payment successful! Starting download...')
    
    // Example: Redirect to download after a delay
    setTimeout(() => {
      // Replace with your actual download URL or trigger
      window.location.href = '/path-to-your-app-download'
    }, 3000)
  }, [])

  return (
    <div className="success-page">
      <div className="container">
        <div className="success-content glass">
          <div className="success-icon">✅</div>
          <h1>Payment Successful!</h1>
          <p>Thank you for purchasing TuneBar!</p>
          <p>Your download will start automatically...</p>
          <div className="success-actions">
            <button 
              className="btn btn--primary"
              onClick={() => window.location.href = '/path-to-your-app-download'}
            >
              Download Now
            </button>
            <button 
              className="btn btn--secondary"
              onClick={() => window.location.href = '/'}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Success
