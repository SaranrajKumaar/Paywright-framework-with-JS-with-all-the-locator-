# Playwright + TypeScript Automation Framework

## Project Structure

```text
PlaywrightAutomation/
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
├── env_setup.bat
│
├── api/
│   ├── endpoints/
│   │   └── routes.ts
│   │
│   └── schemas/
│       ├── product_api_schema.json
│       ├── cart_api_schema.json
│       └── user_api_schema.json
│
├── pages/
│   ├── LoginPage.ts
│   ├── HomePage.ts
│   ├── ProductPage.ts
│   └── CartPage.ts
│
├── fixtures/
│   └── testFixtures.ts
│
├── tests/
│   ├── web/
│   │   ├── login.spec.ts
│   │   ├── product.spec.ts
│   │   └── cart.spec.ts
│   │
│   ├── api/
│   │   ├── product.spec.ts
│   │   ├── cart.spec.ts
│   │   └── user.spec.ts
│   │
│   └── db/
│       └── database.spec.ts
│
├── testdata/
│   ├── opencart_logindata.json
│   ├── opencart_logindata.csv
│   └── opencart_logindata.xlsx
│
├── utils/
│   ├── CustomReporter.ts
│   ├── dataGenerator.ts
│   ├── DataReader.ts
│   ├── dbClient.ts
│   └── helper.ts
│
├── prompts/
│   ├── opencart_web_test_prompts.md
│   ├── fakestore_api_test_prompts.md
│   ├── db_test_prompt.md
│   └── utilitis_prompt.md
│
├── reports/
│   ├── index.html
│   └── results.xml
│
├── custom-report/
│
├── allure-results/
│
├── allure-report/
│
├── test-results/
│
├── docs/
│   ├── Framework-Step-By-Step.md
│   └── Docker-Setup.md
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── Dockerfile
├── docker-compose.yml
├── docker-entrypoint.sh
├── .dockerignore
│
└── Jenkinsfile
```

---

# Folder Responsibilities

## 1. `tests/`

Contains all Playwright test specifications.

```text
tests/
├── web/
├── api/
└── db/
```

### `tests/web/`

Contains browser/UI automation tests.

Example:

```text
tests/web/login.spec.ts
tests/web/product.spec.ts
tests/web/cart.spec.ts
```

### `tests/api/`

Contains API automation tests.

Example:

```text
tests/api/product.spec.ts
tests/api/cart.spec.ts
tests/api/user.spec.ts
```

### `tests/db/`

Contains database validation tests.

Example:

```text
tests/db/database.spec.ts
```

---

# 2. `pages/`

Contains **Page Object Model (POM)** classes.

```text
pages/
├── LoginPage.ts
├── HomePage.ts
├── ProductPage.ts
└── CartPage.ts
```

Each page class contains:

* Locators
* Page actions
* Reusable methods
* Page-specific functionality

Example:

```typescript
export class LoginPage {
    constructor(private page: Page) {}

    async login(username: string, password: string) {
        await this.page.getByPlaceholder('Username').fill(username);
        await this.page.getByPlaceholder('Password').fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }
}
```

---

# 3. `fixtures/`

Contains reusable Playwright fixtures.

```text
fixtures/
└── testFixtures.ts
```

Fixtures can provide:

* Logged-in users
* Page objects
* API clients
* Test setup
* Test cleanup

---

# 4. `testdata/`

Contains external test data.

```text
testdata/
├── opencart_logindata.json
├── opencart_logindata.csv
└── opencart_logindata.xlsx
```

Keeping test data outside test scripts makes the tests easier to maintain and reuse.

---

# 5. `api/`

Contains API-specific framework components.

```text
api/
├── endpoints/
│   └── routes.ts
│
└── schemas/
    ├── product_api_schema.json
    ├── cart_api_schema.json
    └── user_api_schema.json
```

### `endpoints/`

Centralized API endpoint definitions.

### `schemas/`

JSON schemas used for API response validation.

---

# 6. `utils/`

Contains reusable helper functions.

```text
utils/
├── CustomReporter.ts
├── dataGenerator.ts
├── DataReader.ts
├── dbClient.ts
└── helper.ts
```

Examples:


| Utility             | Purpose                         |
| ------------------- | ------------------------------- |
| `CustomReporter.ts` | Custom test reporting           |
| `dataGenerator.ts`  | Generate test data              |
| `DataReader.ts`     | Read JSON/CSV/Excel data        |
| `dbClient.ts`       | Database connection and queries |
| `helper.ts`         | Common reusable functions       |

---

# 7. `prompts/`

Contains AI coding-agent prompts.

```text
prompts/
├── opencart_web_test_prompts.md
├── fakestore_api_test_prompts.md
├── db_test_prompt.md
└── utilitis_prompt.md
```

These prompts can be used with AI coding agents to generate or update tests and utilities.

---

# 8. Reports

The framework generates multiple types of reports.

```text
reports/
custom-report/
allure-results/
allure-report/
test-results/
```

### Playwright HTML Report

```bash
npx playwright show-report reports
```

### Allure Report

```bash
allure generate ./allure-results -o ./allure-report --clean
```

```bash
allure open ./allure-report
```

The source framework config registers HTML, JUnit, custom, and Allure reporters.

---

# 9. Configuration Files

```text
playwright.config.ts
tsconfig.json
.env
.env.example
```

### `playwright.config.ts`

Controls:

* Test directory
* Timeout
* Browsers
* Projects
* Reporters
* Screenshots
* Videos
* Traces
* Parallel execution
* Test tags

### `tsconfig.json`

Controls TypeScript compilation and project settings.

### `.env`

Contains environment-specific values such as:

```text
WEB_APP_URL
APP_EMAIL
APP_PASSWORD
API_BASE_URL
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
```

Never commit the real `.env` file to Git. The source guide specifically recommends keeping `.env` in `.gitignore` and using `.env.example` for placeholders.

---

# 10. CI/CD

## GitHub Actions

```text
.github/
└── workflows/
    └── playwright.yml
```

Used to automatically execute Playwright tests through GitHub Actions.

## Jenkins

```text
Jenkinsfile
```

Used to execute tests through Jenkins and publish:

* JUnit reports
* Playwright HTML reports
* Allure reports
* Custom reports

---

# 11. Docker

```text
Dockerfile
docker-compose.yml
docker-entrypoint.sh
.dockerignore
```

Docker provides a consistent environment for running the Playwright framework. The source guide uses the Playwright `v1.62.0-noble` image and mounts reports/results back to the host.

---

# Framework Execution Flow

```text
                    ┌──────────────────┐
                    │   Test Scenario  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Test Spec      │
                    │   tests/         │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
          Web Tests      API Tests       DB Tests
              │              │              │
              ▼              ▼              ▼
           POM/Page       Endpoints      DB Client
           Objects        Schemas        Utilities
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                    ┌──────────────────┐
                    │ Playwright/Test  │
                    │     Runner       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Assertions/Test  │
                    │     Results      │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        HTML Report      Allure Report   JUnit XML
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                    ┌──────────────────┐
                    │ CI/CD: Jenkins / │
                    │ GitHub Actions   │
                    └──────────────────┘
```

# Recommended Development Order

1. Install Node.js and VS Code
2. Initialize Playwright + TypeScript
3. Install framework dependencies
4. Create project folder structure
5. Configure `playwright.config.ts`
6. Configure `tsconfig.json`
7. Configure `.env`
8. Create test data
9. Create API endpoints and schemas
10. Create utilities
11. Create fixtures
12. Create Page Objects
13. Create Web tests
14. Create API tests
15. Create DB tests
16. Configure reports
17. Configure npm test scripts
18. Push project to GitHub
19. Configure GitHub Actions
20. Configure Docker
21. Configure Jenkins CI/CD

```

This matches the structure and sequence of the uploaded framework guide rather than introducing an unrelated structure.
```
