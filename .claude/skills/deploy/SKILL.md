Deploy the app to staging by running quality checks, building, and pushing.

## Steps

1. **Run quality checks** — this project has no test suite, so run lint instead:
   ```
   npm run lint
   ```
   If lint fails, stop and report the errors. Do not proceed to build.

2. **Build the production bundle**:
   ```
   npm run build
   ```
   If the build fails, stop and report the errors.

3. **Push to staging** — deploy the `dist/` output to the staging area:
   ```
   npm run deploy:staging
   ```
   If no `deploy:staging` script exists in `package.json`, check for alternatives (e.g. `gh-pages`, `wrangler`, `netlify deploy --dir=dist --alias staging`) and use whichever is configured. If none are configured, report that staging deployment is not yet set up and suggest adding a `deploy:staging` script to `package.json`.

## Reporting

After each step, report pass/fail with a one-line summary. At the end, summarize the overall result: all checks passed and deployed, or which step failed and why.
