# FlexibleSearch

A node module to run flexiblesearch hybris queries without a browser.

## API

### class flexiblesearch

The flexiblesearch module provides 2 methods:

#### flexiblesearch.initialize([options])

- `options` \<Object, optional\> An optional object to configure flexiblesearch instance
    - `username` \<String\> Username to log into Hybris admin console with. If `options` is not provided, this defaults to 'admin'
    - `password` \<String\> Password to log into Hybris admin console with. if `options` is not provided, this defaults to 'nimda'
    - `url` \<String\> Hybris admin console URL. If `options` is not provided, this defaults to 'https://localhost:9002/admin'

- returns null

#### flexiblesearch.query(querytext)

- `querytext` \<String\> [Flexiblesearch query](https://hybrismart.com/2016/11/06/what-you-dont-know-about-flexiblesearch/)
- returns \<Array\> containing objects. Keys in objects correspond to fields in hybris table.

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
