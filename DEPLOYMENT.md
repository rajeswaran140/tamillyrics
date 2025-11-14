# Tamil Lyrics Music Player - AWS Amplify Deployment Guide

## 📋 Prerequisites

- AWS Account
- GitHub account with this repository
- Basic understanding of AWS Amplify

## 🚀 Deployment Steps

### Option 1: Deploy via AWS Amplify Console (Recommended)

1. **Login to AWS Console**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "Get Started" under "Amplify Hosting"

2. **Connect Your Repository**
   - Select "GitHub" as your Git provider
   - Authorize AWS Amplify to access your GitHub account
   - Select the repository: `rajeswaran140/tamillyrics`
   - Choose the branch: `claude/optimize-performance-01BvqKcjsHD1Qf4fBBytsWGQ` (or your main branch)

3. **Configure Build Settings**
   - AWS Amplify will automatically detect the `amplify.yml` file
   - Review the configuration (no changes needed)
   - Click "Next"

4. **Review and Deploy**
   - Review all settings
   - Click "Save and Deploy"
   - Wait for the build to complete (usually 2-3 minutes)

5. **Access Your Site**
   - Once deployed, you'll get a URL like: `https://xxxxx.amplifyapp.com`
   - Your music player is now live!

### Option 2: Deploy via AWS CLI

```bash
# Install AWS Amplify CLI if not already installed
npm install -g @aws-amplify/cli

# Configure AWS credentials
amplify configure

# Initialize Amplify in your project
amplify init

# Add hosting
amplify add hosting

# Publish your app
amplify publish
```

## 📁 Project Structure

```
tamillyrics/
├── index.html              # Main entry point
├── audioPlayer.js          # Optimized music player script
├── style.css              # Optimized styles
├── amplify.yml            # Amplify build configuration
├── _redirects             # Routing configuration
├── audio/
│   └── Vaasam1.mp3        # Audio file (13 MB)
└── image/
    ├── Vaasam veesum100.jpg
    ├── Rajeswaran Image1.jpg
    └── favicon.png
```

## ⚙️ Configuration Files

### amplify.yml
This file tells AWS Amplify how to build and deploy your app. Since this is a static site, no build process is required.

### _redirects
This file ensures all routes are handled by `index.html`, enabling proper navigation.

## 🎯 Performance Optimizations Applied

- ✅ requestAnimationFrame for smooth 60fps animations
- ✅ DOM element caching
- ✅ Throttled event listeners
- ✅ GPU-accelerated CSS3 transforms
- ✅ Pre-generated color pool
- ✅ Proper memory cleanup
- ✅ Removed duplicate files (356 lines)

## 🔧 Environment Variables (if needed)

If you need to add environment variables:

1. In AWS Amplify Console, go to your app
2. Click "Environment variables" in the left menu
3. Add your variables (currently none required)

## 📊 Monitoring

AWS Amplify provides:
- Build logs
- Access logs
- Performance metrics
- Custom domain support
- SSL certificates (automatic)

## 🌐 Custom Domain (Optional)

To add a custom domain:

1. In AWS Amplify Console, select your app
2. Click "Domain management"
3. Click "Add domain"
4. Follow the DNS configuration steps
5. SSL certificate is automatically provisioned

## 🔄 Continuous Deployment

AWS Amplify automatically:
- Monitors your Git branch
- Deploys on every push
- Runs build process (defined in amplify.yml)
- Provides deployment previews for PRs

## 📱 Access Your App

After deployment, your app will be available at:
- **Amplify URL**: `https://[app-id].amplifyapp.com`
- **Custom Domain**: (if configured)

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Amplify Console
- Verify `amplify.yml` syntax
- Ensure all files are committed to Git

### Assets Not Loading
- Verify file paths are correct (use absolute paths starting with `/`)
- Check file names match exactly (case-sensitive)
- Ensure files are committed to Git

### Audio/Images Not Playing
- Check file formats are supported (MP3, JPG, PNG)
- Verify CORS headers if using external resources
- Check browser console for errors

## 📞 Support

For AWS Amplify issues:
- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [AWS Support](https://console.aws.amazon.com/support/)

## 📄 License

This project contains Tamil lyrics and music. Ensure you have proper rights before deployment.

---

**Note**: The optimized version removes unnecessary code, uses modern performance APIs, and is production-ready for AWS Amplify deployment.
