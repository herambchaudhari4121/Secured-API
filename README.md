# SecureURL API Documentation
https://cozy-choux-fa9c1d.netlify.app/
## Automatic Documentation Generation Tools

This project includes comprehensive API documentation with support for automatic generation. Here are the recommended tools and setup:

### 1. OpenAPI/Swagger Documentation

**Files:**
- `src/docs/swagger.yaml` - OpenAPI 3.0 specification
- `src/docs/api-documentation.md` - Markdown documentation

**Recommended Tools:**
- **Swagger UI**: Interactive API documentation
- **Redoc**: Clean, responsive API documentation
- **Swagger Codegen**: Generate client SDKs automatically

**Setup:**
```bash
# Install Swagger UI
npm install -g swagger-ui-dist

# Generate static documentation
swagger-codegen generate -i src/docs/swagger.yaml -l html2 -o docs/

# Serve interactive docs
swagger-ui-serve src/docs/swagger.yaml
```

### 2. Postman Collection

**File:** `src/docs/postman-collection.json`

**Features:**
- Pre-configured requests with examples
- Environment variables for API keys
- Automated testing capabilities

**Import to Postman:**
1. Open Postman
2. Click "Import"
3. Select `src/docs/postman-collection.json`
4. Set environment variables (api_key, base_url)

### 3. Automated Documentation Generation

**Recommended Tools:**

#### A. **Swagger/OpenAPI Tools**
```bash
# Install globally
npm install -g @apidevtools/swagger-cli
npm install -g swagger-ui-dist
npm install -g redoc-cli

# Validate OpenAPI spec
swagger-cli validate src/docs/swagger.yaml

# Generate HTML documentation
redoc-cli build src/docs/swagger.yaml --output docs/api.html
```

#### B. **API Blueprint + Aglio**
```bash
npm install -g aglio

# Convert OpenAPI to API Blueprint (if needed)
# Generate beautiful HTML docs
aglio -i api.apib -o docs/api.html --theme-template triple
```

#### C. **GitBook Integration**
```bash
npm install -g gitbook-cli

# Initialize GitBook
gitbook init docs/
gitbook serve docs/
```

### 4. Continuous Integration Setup

**GitHub Actions Example** (`.github/workflows/docs.yml`):
```yaml
name: Generate API Documentation

on:
  push:
    branches: [main]
    paths: ['src/docs/**']

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: |
          npm install -g redoc-cli
          npm install -g swagger-ui-dist
          
      - name: Generate documentation
        run: |
          redoc-cli build src/docs/swagger.yaml --output docs/api.html
          
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
```

### 5. Documentation Structure

```
src/docs/
├── swagger.yaml              # OpenAPI specification
├── api-documentation.md      # Markdown documentation
├── postman-collection.json   # Postman collection
└── examples/                 # Code examples
    ├── javascript/
    ├── python/
    ├── php/
    └── curl/
```

### 6. Best Practices for API Documentation

#### A. **Keep Documentation in Sync**
- Use OpenAPI annotations in code
- Implement automated validation
- Version your API documentation

#### B. **Include Comprehensive Examples**
- Request/response examples for all endpoints
- Error response examples
- Code samples in multiple languages

#### C. **Interactive Documentation**
- Swagger UI for testing endpoints
- Postman collections for easy import
- Live API explorer

#### D. **Documentation Automation**
- Generate docs from code annotations
- Validate examples against actual API
- Auto-update on code changes

### 7. Recommended Documentation Tools

| Tool | Purpose | Pros | Cons |
|------|---------|------|------|
| **Swagger UI** | Interactive docs | Industry standard, testing capability | Can be slow with large APIs |
| **Redoc** | Static docs | Beautiful, fast, responsive | No testing capability |
| **Postman** | API testing | Great for testing, collaboration | Not suitable for public docs |
| **GitBook** | Comprehensive docs | Great for tutorials, guides | Overkill for simple APIs |
| **Slate** | Static docs | GitHub-friendly, customizable | Requires Ruby setup |

### 8. Implementation in Your Project

The current implementation includes:

1. **Interactive Documentation Component** (`src/components/APIDocumentation.tsx`)
2. **OpenAPI Specification** (`src/docs/swagger.yaml`)
3. **Postman Collection** (`src/docs/postman-collection.json`)
4. **Markdown Documentation** (`src/docs/api-documentation.md`)

**To extend the documentation:**

1. Update the OpenAPI spec in `swagger.yaml`
2. Add new endpoints to the React component
3. Update Postman collection with new requests
4. Generate static documentation using the tools above

### 9. Deployment Options

- **GitHub Pages**: Free hosting for static docs
- **Netlify**: Easy deployment with build automation
- **Vercel**: Fast deployment with preview URLs
- **AWS S3**: Scalable static hosting
- **Self-hosted**: Full control over documentation

This comprehensive documentation system ensures your API is well-documented, easily testable, and maintainable as it grows.
