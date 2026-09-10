```markdown
```md
name=DEPLOY.md

# Deploying Competitor Researcher to the Cloud

This project now includes a Dockerfile so you can run it on cloud platforms (Cloud Run, ECS, DigitalOcean App Platform, Heroku via container registry, etc.).

Quick steps (Cloud Run / generic container):

1. Build the image locally:

   docker build -t competitor-researcher:latest .

2. Test locally exposing port 3000:

   docker run -p 3000:3000 -e NODE_ENV=production competitor-researcher:latest

3. Push and deploy to your cloud container registry, then run on Cloud Run. Ensure you set runtime environment variables for API keys if you don't want to provide them from the browser. Example envs:

   - GEMINI_API_KEY
   - OPENAI_API_KEY
   - ANTHROPIC_API_KEY
   - COHERE_API_KEY
   - HUGGINGFACE_API_KEY

Security note: The frontend contains a Settings panel that stores API keys in browser localStorage and sends them to the server with analysis requests. For production workloads you should avoid storing highly sensitive long-lived keys in client-side storage — prefer server-side secrets with restricted scopes and an authenticated admin UI.
```
```
