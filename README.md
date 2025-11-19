# ERP Frontend Application

A modern, professional ERP (Enterprise Resource Planning) frontend application built with React. Features modules for Dashboard, Inventory Management, Sales, Purchases, Accounting, HR, and Reports.

## 🚀 Features

- **Dashboard**: Overview with key metrics and analytics
- **Inventory Management**: Track products, stock levels, and inventory movements
- **Sales Management**: Process sales orders and customer transactions
- **Purchase Management**: Handle purchase orders and supplier relationships
- **Accounting**: Manage financial transactions and accounting entries
- **Human Resources**: Maintain employee records and HR operations
- **Reports & Analytics**: Generate business insights and analytics

## 🛠️ Tech Stack

- **Framework**: React 18
- **UI Components**: Custom component library
- **State Management**: React Hooks & Context API
- **HTTP Client**: Axios
- **Styling**: CSS Modules with CSS Variables
- **Build Tool**: Create React App

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Backend API server running (see backend README)

## 🔧 Environment Variables

Create a `.env` file in the `erp_frontend` directory with the following variables:

```env
# Backend API URL
REACT_APP_BACKEND_URL=http://localhost:3001

# Frontend URL (for CORS)
REACT_APP_FRONTEND_URL=http://localhost:3000

# WebSocket URL (if needed)
REACT_APP_WS_URL=ws://localhost:3001/ws

# Environment
REACT_APP_NODE_ENV=development

# Optional settings
REACT_APP_LOG_LEVEL=info
REACT_APP_ENABLE_SOURCE_MAPS=true
```

### Environment Variable Descriptions

- `REACT_APP_BACKEND_URL`: The base URL for the FastAPI backend server (default: http://localhost:3001)
- `REACT_APP_FRONTEND_URL`: The URL where the frontend is hosted
- `REACT_APP_WS_URL`: WebSocket URL for real-time features (if applicable)

## 📦 Installation

1. Navigate to the frontend directory:
```bash
cd modern-erp-frontend-suite-277248-277267/erp_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Verify your `.env` file is configured correctly

## 🚀 Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm start
```

The application will open at `http://localhost:3000`

### Production Build

Build the application for production:

```bash
npm run build
```

The optimized build will be in the `build/` directory.

### Serve Production Build Locally

```bash
npm install -g serve
serve -s build -l 3000
```

## 🔌 Backend Integration

### API Configuration

The frontend communicates with the FastAPI backend via the `REACT_APP_BACKEND_URL` environment variable. All API calls are prefixed with `/api/v1/`.

### Pagination

The backend uses `skip` and `limit` parameters for pagination:
- `skip`: Number of records to skip (default: 0)
- `limit`: Maximum number of records to return (default: 10)

Example API call:
```
GET /api/v1/inventory?skip=0&limit=10&category=Electronics&search=laptop
```

### Error Handling

The frontend handles backend errors gracefully:
- **Validation Errors (422)**: Display field-specific error messages
- **Not Found (404)**: Show user-friendly "not found" messages
- **Server Errors (500)**: Display general error toast notifications
- **Network Errors**: Show "backend unreachable" message

Backend error response format:
```json
{
  "detail": [
    {
      "loc": ["body", "field_name"],
      "msg": "Error message",
      "type": "validation_error"
    }
  ]
}
```

## 🧪 Testing

Run unit tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## 🏗️ Project Structure

```
erp_frontend/
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   │   ├── common/      # Reusable UI components
│   │   ├── layout/      # Layout components (AppLayout, Sidebar, etc.)
│   │   └── modules/     # Feature-specific components
│   ├── contexts/        # React contexts (Theme, Notification, User)
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API service layer
│   │   ├── api.js       # Axios instance configuration
│   │   ├── inventoryService.js
│   │   ├── salesService.js
│   │   ├── purchasesService.js
│   │   ├── accountingService.js
│   │   ├── hrService.js
│   │   └── reportsService.js
│   ├── utils/           # Utility functions
│   ├── data/            # Mock data (for development/fallback)
│   ├── App.js           # Main application component
│   └── index.js         # Entry point
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## 🔍 Troubleshooting

### Backend Connection Issues

**Problem**: "Network Error" or "Failed to fetch"

**Solutions**:
1. Verify backend is running: `curl http://localhost:3001/api/v1/health`
2. Check `REACT_APP_BACKEND_URL` in `.env` file
3. Ensure CORS is configured on backend (see backend README)
4. Check browser console for CORS errors

### CORS Errors

**Problem**: "Access to XMLHttpRequest has been blocked by CORS policy"

**Solutions**:
1. Ensure backend `ALLOWED_ORIGINS` includes your frontend URL
2. Backend `.env` should have: `ALLOWED_ORIGINS=http://localhost:3000`
3. Restart backend server after changing CORS settings

### Pagination Not Working

**Problem**: Data not loading correctly with pagination

**Solutions**:
1. Check that components are using `skip` and `limit` params (not `page` and `pageSize`)
2. Backend expects: `?skip=0&limit=10`
3. Frontend should convert page numbers to skip values: `skip = (page - 1) * pageSize`

### Environment Variables Not Loading

**Problem**: Backend URL shows as "undefined" or defaults

**Solutions**:
1. Ensure `.env` file is in `erp_frontend/` directory (not root)
2. Variable names must start with `REACT_APP_`
3. Restart development server after changing `.env`
4. Clear browser cache and reload

### Build Errors

**Problem**: Build fails with module errors

**Solutions**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear React cache
rm -rf node_modules/.cache
npm start
```

### API Response Format Issues

**Problem**: Data not displaying correctly from backend

**Solutions**:
1. Check backend returns paginated format:
```json
{
  "items": [...],
  "total": 100,
  "skip": 0,
  "limit": 10
}
```
2. Frontend expects this structure; verify in browser DevTools Network tab

## 📊 Performance Optimization

- Use React.memo for expensive components
- Implement code splitting for route-based lazy loading
- Optimize images and assets
- Enable production build for deployment

## 🔐 Security Considerations

- Never commit `.env` files with sensitive data
- Use HTTPS in production
- Implement proper authentication/authorization
- Sanitize user inputs
- Keep dependencies updated

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Additional Commands

```bash
# Lint code
npm run lint

# Format code
npm run format

# Analyze bundle size
npm run build
npm install -g source-map-explorer
source-map-explorer 'build/static/js/*.js'
```

## 🤝 Development Workflow

1. Ensure backend is running
2. Start frontend development server
3. Make changes to components/services
4. Test in browser (http://localhost:3000)
5. Check browser console for errors
6. Verify API calls in Network tab

## 📞 Support

For issues or questions:
- Check backend API documentation at: `http://localhost:3001/docs`
- Review backend OpenAPI spec at: `http://localhost:3001/openapi.json`
- Check browser console for detailed error messages

## 📄 License

Proprietary - All rights reserved
