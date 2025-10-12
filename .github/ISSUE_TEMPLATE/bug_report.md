---
name: Bug report
about: Report a reproducible bug in the system
labels: bug
---

**Build/Commit**:
Branch: ci/api-workflow  
Commit: ( daf4e85)

**Environment**:
CI / GitHub Actions workflow `.github/workflows/api-tests.yml`

**Steps to Reproduce**:
1. Push branch `ci/api-workflow` containing the new workflow file  
2. GitHub Actions automatically runs “API Service Tests”  
3. Observe failure message in the Actions tab: “Invalid workflow file – You have an error in your YAML syntax on line 18.”

**Linked Test Case ID(s)**:
TC-API-CI-001

**Expected / Actual Behavior**:
- **Expected:** The CI pipeline should parse the workflow and run `pytest` successfully.  
- **Actual:** The workflow fails to start due to YAML syntax error on line 18.

```
Check failure on line 18 in .github/workflows/api-tests.yml
Invalid workflow file
You have an error in your yaml syntax on line 18
        with: { python-version: ${{ matrix.python-version }} }
```

---

**Fix Implemented:**
The YAML syntax was incorrect — GitHub Actions does not accept inline braces `{}` in the `with:` section.  
**Fixed code:**
```yaml
 - uses: actions/setup-python@v5
   with:
        python-version: ${{ matrix.python-version }}

```


---

**Linked PR:** #16 (`ci(api): add tests workflow (+ artifact upload)`)  
**Failing CI Run:** https://github.com/elizabethmazuca/491-project-group1/actions/runs/18443092793 
**Passing CI Run:** https://github.com/elizabethmazuca/491-project-group1/actions/runs/18443190063
