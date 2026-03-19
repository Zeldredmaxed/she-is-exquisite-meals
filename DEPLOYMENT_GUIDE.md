# She Is Exquisite Meals - Deployment Guide

This guide will help you deploy the website to a permanent hosting platform. The website is built with modern web technologies and can be deployed to various platforms.

## Prerequisites

- GitHub account (repository already set up)
- Vercel or Netlify account (free tier available)
- Node.js 18+ (for local development)

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is the recommended platform as it's optimized for this tech stack and offers a generous free tier.

### Steps:

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Sign Up" and choose "Continue with GitHub"
   - Authorize Vercel to access your GitHub repositories

2. **Import the Project**
   - Click "Add New..." → "Project"
   - Select `Zeldredmaxed/she-is-exquisite-meals` from your repositories
   - Click "Import"

3. **Configure Environment Variables**
   - In the "Environment Variables" section, add the following (if needed):
     - `OAUTH_SERVER_URL`: (Leave blank for now, or add your OAuth provider URL)
     - `DATABASE_URL`: (If using a database, add your connection string)
   - For this website, you can leave these blank initially

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site
   - You'll receive a live URL (e.g., `https://she-is-exquisite-meals.vercel.app`)

5. **Custom Domain (Optional)**
   - After deployment, go to "Settings" → "Domains"
   - Add your custom domain (e.g., `sheisexquisitemeals.com`)
   - Follow Vercel's instructions to update your domain's DNS settings

### Benefits:
- ✅ Free tier with generous limits
- ✅ Automatic deployments on every GitHub push
- ✅ Built-in SSL/HTTPS
- ✅ Global CDN for fast loading
- ✅ Easy rollbacks to previous versions

---

## Option 2: Deploy to Netlify

Netlify is another excellent option with similar features.

### Steps:

1. **Go to Netlify**
   - Visit https://netlify.com
   - Click "Sign Up" and choose "GitHub"
   - Authorize Netlify to access your repositories

2. **Create a New Site**
   - Click "Add new site" → "Import an existing project"
   - Select `Zeldredmaxed/she-is-exquisite-meals`

3. **Configure Build Settings**
   - Build command: `pnpm run build`
   - Publish directory: `dist/public`
   - Click "Deploy site"

4. **Add Environment Variables**
   - Go to "Site settings" → "Build & deploy" → "Environment"
   - Add any necessary environment variables (same as Vercel)

5. **Custom Domain**
   - Go to "Site settings" → "Domain management"
   - Add your custom domain and follow DNS configuration steps

---

## Option 3: Deploy to Your Own Server

If you prefer more control, you can deploy to your own server or VPS.

### Requirements:
- Node.js 18+ installed on your server
- PM2 or similar process manager
- Nginx or Apache for reverse proxy

### Steps:

1. **SSH into Your Server**
   ```bash
   ssh user@your-server.com
   ```

2. **Clone the Repository**
   ```bash
   git clone https://github.com/Zeldredmaxed/she-is-exquisite-meals.git
   cd she-is-exquisite-meals
   ```

3. **Install Dependencies**
   ```bash
   pnpm install
   ```

4. **Build the Project**
   ```bash
   pnpm run build
   ```

5. **Install PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   ```

6. **Start the Application**
   ```bash
   pm2 start dist/index.js --name "exquisite-meals"
   pm2 save
   pm2 startup
   ```

7. **Configure Nginx (Reverse Proxy)**
   Create `/etc/nginx/sites-available/exquisite-meals`:
   ```nginx
   server {
       listen 80;
       server_name sheisexquisitemeals.com www.sheisexquisitemeals.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Enable the Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/exquisite-meals /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **Set Up SSL (HTTPS) with Let's Encrypt**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d sheisexquisitemeals.com -d www.sheisexquisitemeals.com
   ```

---

## Post-Deployment Checklist

After deploying, verify the following:

- [ ] Website loads without errors
- [ ] All images display correctly
- [ ] Navigation links work properly
- [ ] Contact form submits successfully
- [ ] Mobile responsiveness is intact
- [ ] SSL/HTTPS is enabled
- [ ] Page loads quickly (test with Google PageSpeed Insights)

## Monitoring & Updates

### Automatic Deployments
Once deployed to Vercel or Netlify, any push to the `main` branch will automatically trigger a new deployment.

### Manual Updates
To update the website:
1. Make changes locally or in GitHub
2. Commit and push to `main`
3. The platform will automatically rebuild and deploy

### Rollbacks
If something goes wrong:
- **Vercel/Netlify**: Go to "Deployments" and click "Rollback" on a previous version
- **Self-hosted**: Use `pm2 restart exquisite-meals` or redeploy an older commit

---

## Troubleshooting

### Build Fails
- Check that all dependencies are installed: `pnpm install`
- Verify Node.js version: `node --version` (should be 18+)
- Check build logs for specific errors

### Website Won't Load
- Verify environment variables are set correctly
- Check server logs for errors
- Ensure the database is accessible (if applicable)

### Images Not Loading
- Verify image paths are correct in the code
- Check that images exist in `client/public/catering-images/`
- Ensure file permissions are correct on the server

---

## Support

For issues with:
- **Vercel**: https://vercel.com/support
- **Netlify**: https://www.netlify.com/support/
- **GitHub**: https://docs.github.com/

---

## Next Steps

1. Choose your deployment platform (Vercel recommended)
2. Follow the steps above
3. Test the live website thoroughly
4. Share the URL with your clients
5. Monitor performance and user feedback

Congratulations! Your elegant gourmet catering website is now live! 🎉
