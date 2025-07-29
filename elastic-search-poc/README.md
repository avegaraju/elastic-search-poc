# Elastic Search POC

This project is a very small proof of concept that demonstrates how to query an
Elastic Search instance from a React application. The UI exposes a single search
box and displays the hits returned from your cluster ordered by score.

## Setup

1. Copy `.env.example` to `.env` in this folder and fill in your connection
   information.
2. Install dependencies with `npm install`.
3. Start the development server with `npm start`.

### Running tests

Tests can be executed with:

```bash
npm test
```

The test suite simply verifies that the search page renders correctly.
