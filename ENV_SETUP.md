# Environment Variables Setup Guide

## Quick Reference

### For Local Development

#### Backend (.env in `server/` folder)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/event_management
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

#### Frontend (.env in `client/` folder)
```env
VITE_API_URL=http://localhost:5000
```

---

## For Production Deployment

### Render (Backend)

Set these environment variables in your Render dashboard:

| Variable | Value | Description |
|----------|-------|-------------|
| `PORT` | `5000` | Server port |
| `MONGO_URI` | `mongodb+srv://<user>:<pass>@cluster.mongodb.net/event_management` | MongoDB Atlas connection string |
| `JWT_SECRET` | Generate using crypto | Strong random secret for JWT |
| `NODE_ENV` | `production` | Environment mode |

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Vercel (Frontend)

Set this environment variable in your Vercel project settings:

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_URL` | `https://your-app.onrender.com` | Your Render backend URL |

---

## MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with username and password
4. Whitelist all IPs: `0.0.0.0/0` (for Render access)
5. Get connection string from "Connect" → "Connect your application"
6. Replace `<username>`, `<password>`, and database name

**Connection String Format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/event_management?retryWrites=true&w=majority
```

---

## Deployment Checklist

- [ ] Create MongoDB Atlas cluster
- [ ] Get MongoDB connection string
- [ ] Generate strong JWT secret
- [ ] Deploy backend to Render with environment variables
- [ ] Get Render backend URL
- [ ] Deploy frontend to Vercel with backend URL
- [ ] Test the deployed application
- [ ] Update README with live demo link

---

## Security Notes

⚠️ **Never commit `.env` files to Git!**

✅ `.env` files are already in `.gitignore`

✅ Use `.env.example` files as templates (without sensitive data)

✅ Generate a new JWT secret for production (don't use the example)

✅ Use strong passwords for MongoDB Atlas users
