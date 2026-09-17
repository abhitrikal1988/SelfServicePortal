# Self-healing fixes

Generated 2026-09-16T14:36:14.146Z by `tamash-playwright apply-heals` (--dry-run, nothing written).

## Applied (2)

### `tests\MemberAccount\LandingPage.spec.js:33`

**Before:**
```ts
.getByText('View', { exact: true })
```

**After:**
```ts
.getByRole("gridcell", { name: "View" })
```

### `tests\MemberAccount\LandingPage.spec.js:29`

**Before:**
```ts
.getByRole('textbox', { name: 'Medicare' })
```

**After:**
```ts
.getByRole("textbox", { name: "MBI (Min Length 6)" })
```

## Tests to re-verify

Every test observed exercising a location that got fixed above — pass these straight to `npx playwright test` to re-run exactly them (not the whole suite, and not even the whole file unless the exact test couldn't be pinned to a line) with healing disabled, to prove the fix works standalone:

- `tests\MemberAccount\LandingPage.spec.js:22`
