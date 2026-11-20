# Security policy

## Reporting a vulnerability

Please do not open a public issue for a security problem. Write to
[mail@aqardex.com](mailto:mail@aqardex.com) with "Security" in the subject, and include:

- the affected URL or file,
- steps to reproduce,
- what an attacker could do with it.

We aim to reply within five working days and will tell you when the fix is live.

## Scope

- The widget pages: `skylineindex.com/*/pulse/embed`, `cranescore.com/*/progress/embed`,
  `myunitworth.com/*/benchmarks/embed`.
- The gallery page in `docs/` and the snippets in this repository.

Out of scope: denial-of-service tests, automated scanning at high volume, social
engineering and physical attacks.

## What this repository contains

Only static snippets and a static gallery page. It holds no server code, no API keys and
no credentials, and it accepts no secrets in issues or pull requests.
