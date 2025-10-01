# Deployment Setup Guide

Complete step-by-step guide for deploying the Poreitsid monorepo to production.

## Prerequisites

- GitHub account
- Vercel account (free tier is fine)
- pnpm installed locally
- Node.js 20+ installed

## Step 1: Push to GitHub

```bash
cd C:/poreitsid-monorepo
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/poreitsid-monorepo.git
git push -u origin main
```

## Step 2: Setup Vercel Project

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `pnpm -w build`
   - **Install Command**: `pnpm i -w`
   - **Output Directory**: Leave default
   - **Node Version**: 20.x

## Step 3: Add Environment Variables in Vercel

Go to Project Settings → Environment Variables and add:

### Production Environment
```
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_POSTHOG_KEY=your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Preview Environment
(Copy the same values as Production)

## Step 4: Get Vercel Credentials

### Get VERCEL_TOKEN
1. Go to Vercel Dashboard → Settings → Tokens
2. Click "Create Token"
3. Give it a name (e.g., "GitHub Actions")
4. Copy the token

### Get VERCEL_ORG_ID and VERCEL_PROJECT_ID
1. Go to your Project Settings → General
2. Scroll down to "Project ID" section
3. Copy both the Organization ID and Project ID

## Step 5: Add GitHub Secrets

1. Go to your GitHub repository
2. Click Settings → Secrets and variables → Actions
3. Click "New repository secret" and add these three secrets:

```
Name: VERCEL_TOKEN
Value: [paste the token from Step 4]

Name: VERCEL_ORG_ID
Value: [paste the org ID from Step 4]

Name: VERCEL_PROJECT_ID
Value: [paste the project ID from Step 4]
```

## Step 6: Configure Branch Protection

### In Vercel
Project Settings → Git:
- ✅ Enable production deployments for `main` branch
- ✅ Enable preview deployments for all branches

### In GitHub
Settings → Branches → Add branch protection rule for `main`:
- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging
- ✅ Select "CI Pipeline" as required status check
- ✅ Require branches to be up to date before merging

## Step 7: Test the Deployment

### Test CI Pipeline
```bash
# Create a new branch
git checkout -b test-ci

# Make a small change
echo "# Test" >> README.md
git add README.md
git commit -m "test: CI pipeline"
git push origin test-ci

# Create a pull request on GitHub
# Watch the CI pipeline run automatically
```

### Test Production Deployment
```bash
# After PR is approved and merged
# The deploy workflow will automatically run
# Check Actions tab on GitHub to see progress
# Check Vercel dashboard for deployment status
```

## Step 8: Verify Deployment

After deployment completes:

1. **Check Production URL**: Visit your Vercel production URL
2. **Test PWA**: Try installing the app on mobile/desktop
3. **Check Security Headers**: Visit https://securityheaders.com
4. **Run Lighthouse**: Check performance scores
5. **Verify Analytics**: Check if PostHog is tracking events

## Troubleshooting

### Build Fails
- Check Vercel deployment logs
- Ensure all dependencies are in package.json
- Test build locally: `pnpm -w build`

### CI Pipeline Fails
- Check GitHub Actions logs
- Run locally: `pnpm -w lint && pnpm -w typecheck && pnpm -w test`

### Environment Variables Not Working
- Ensure variables start with `NEXT_PUBLIC_` for client-side
- Redeploy after adding new variables
- Check correct environment (Production/Preview/Development)

## Next Steps

- [ ] Set up custom domain in Vercel
- [ ] Configure PostHog analytics
- [ ] Set up Sentry error tracking
- [ ] Add more comprehensive tests
- [ ] Configure monitoring alerts

## Useful Commands

```bash
# Deploy manually to Vercel
npx vercel --prod

# Check deployment status
npx vercel ls

# View deployment logs
npx vercel logs

# Rollback deployment
npx vercel rollback
```

## Support

- Vercel Docs: https://vercel.com/docs
- GitHub Actions: https://docs.github.com/actions
- Next.js: https://nextjs.org/docs
