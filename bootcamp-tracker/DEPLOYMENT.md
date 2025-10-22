# 🚀 GitHub Pages Deployment Guide

## Your Project is now configured for GitHub Pages! 

### 📋 **What's Been Done**:
1. ✅ Added `gh-pages` package for deployment
2. ✅ Updated `package.json` with homepage and deploy scripts
3. ✅ Configured Vite for GitHub Pages base path
4. ✅ Added SPA routing support for GitHub Pages
5. ✅ Created GitHub Actions workflow for automatic deployment

---

## 🎯 **Deployment Steps**

### **Option 1: Manual Deployment (Immediate)**
```bash
# Build and deploy manually
npm run deploy
```

### **Option 2: Automatic Deployment (Recommended)**
1. **Push to GitHub**: Your repository will auto-deploy on every push to `main`
2. **Enable GitHub Pages**: 
   - Go to your repo: `https://github.com/burakgizlice/docker-kurulmusu-var`
   - Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `gh-pages` / `root`

---

## 🌐 **Your Live URLs**

Once deployed, your bootcamp will be available at:

### **📱 Main Bootcamp**: 
`https://burakgizlice.github.io/docker-kurulmusu-var/`

### **🔧 Admin Panel**: 
`https://burakgizlice.github.io/docker-kurulmusu-var/admin`
- **Username**: `nexusadmin`
- **Password**: `nexusadmin123`

---

## ⚙️ **Technical Configuration Summary**

### **Files Modified/Added**:
- `package.json` → Added homepage and deploy scripts
- `vite.config.js` → Added base path for production
- `src/App.jsx` → Added basename for Router
- `index.html` → Added SPA routing script
- `public/404.html` → Created for SPA routing
- `.github/workflows/deploy.yml` → GitHub Actions workflow

### **Environment Variables**:
Your Firebase config should work as-is since it's using environment variables. Make sure your `.env` file is **not** in version control.

### **Routing**:
- `/` → Main bootcamp interface
- `/admin` → Admin dashboard
- SPA routing fully supported with fallback handling

---

## 🔥 **Next Steps**

1. **Deploy Now**: Run `npm run deploy` 
2. **Push to GitHub**: Commits to `main` will auto-deploy
3. **Enable GitHub Pages** in repository settings
4. **Share the URL**: Your bootcamp will be live!

---

## 🛠️ **Troubleshooting**

### **If routing doesn't work**:
- Check GitHub Pages settings (source should be `gh-pages` branch)
- Verify the base URL in browser matches the homepage in `package.json`

### **If Firebase doesn't work**:
- Environment variables need to be set in GitHub Actions (if using auto-deploy)
- For manual deploy, make sure `.env` file exists locally

### **If build fails**:
- Run `npm run build` locally to test
- Check console for any import/export errors
- Ensure all dependencies are in `package.json`

---

## 🎉 **Ready to Deploy!**

Your Docker bootcamp is now ready for the world! 🐳🚀