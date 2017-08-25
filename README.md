# FlexibleSearch

A node module to run flexiblesearch hybris queries without a browser.

## Example Usage

```
const f = require('flexible_search');

const options = {
    username: "admin",
    password: "nimda",
    url: "https://localhost:9002/admin",
};

f.initialize(options);
f.query("SELECT * FROM {GroceryProduct}")
.then(console.log);
```

## TODO

- Return more than first 10 results
- Clean up code
