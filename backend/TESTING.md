# Tests — how to run

I added unit tests for controllers, routes, models and middleware using Jest + Supertest.

Quick commands:

```powershell
npm install
npm test             # run all tests
npm run test:coverage # run tests with coverage
```

Notes:
- Tests live under `src/test` and use Jest ESM features (node --experimental-vm-modules). The existing npm scripts already cover the setup.
- Tests use lightweight mocking of Sequelize model modules (see `src/mock/*`) so they run fast and don't require a database.

CI (GitHub Actions)
- A GitHub Actions workflow was added at `.github/workflows/nodejs-ci.yml` that runs the unit tests and produces a coverage artifact. When you push branches or open PRs the workflow will run automatically on GitHub.

Extra tests
- I added edge-case tests for `Alojamiento` endpoints (delete & edit flows) and improved validation/edge-case coverage throughout the test suite.
