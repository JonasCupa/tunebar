# TuneBar Deployment Guide

## 🚀 Deploy to Vercel

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial TuneBar deployment"
git remote add origin https://github.com/yourusername/tunebar.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect React and deploy

### Step 3: Configure Environment Variables
In Vercel dashboard:
1. Go to your project → Settings → Environment Variables
2. Add:
   - `STRIPE_SECRET_KEY` = `sk_live_...` (your live Stripe secret key)
   - `STRIPE_PUBLISHABLE_KEY` = `pk_live_...` (your live Stripe publishable key)

### Step 4: Update Stripe Configuration
Update `src/config/stripe.js`:
```javascript
export const stripeConfig = {
  publishableKey: 'pk_live_...', // Your live key
  priceId: 'price_1S5TPHBDjzVf0zu7F120lqIl', // Keep same
  successUrl: 'https://yourdomain.com/success',
  cancelUrl: 'https://yourdomain.com',
}
```

### Step 5: Add Custom Domain
1. In Vercel dashboard → Domains
2. Add your custom domain
3. Update DNS settings as instructed

## 🔧 Local Development
```bash
npm run dev
```

## 📦 Production Build
```bash
npm run build
```

## ✅ Checklist
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables set
- [ ] Live Stripe keys configured
- [ ] Custom domain added
- [ ] HTTPS enabled (automatic)
- [ ] Test payment flow
