# FlexibleSearch

A node module to run flexiblesearch hybris queries without a browser.

## Example Usage

```
const f = require('flexible_search');
f.initialize('admin', 'admin', 'https://localhost:9002/admin');
f.query("SELECT * FROM {GroceryProduct}")
.then(console.log);
```
