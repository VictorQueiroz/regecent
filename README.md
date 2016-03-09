# regecent

Some accents for your Regular Expressions

### Installation
```
npm install --save regecent
```

### Usage
```js
var assert = require('assert'),
    regecent = require('regecent');

const PRODUCT_NAME = regecent(/(maçã|apple)/gim),
      RESULT_REGEX = /(m[aãàáâÂAÁÀ]ç[aãàáâÂAÁÀ]|[aãàáâÂAÁÀ]ppl[eẽèéêÊEÉÈ])/;

assert.deepEqual(PRODUCT_NAME, RESULT_REGEX);

var cursor = db.collection('products').find({
  name: {
    $regex: PRODUCT_NAME
  }
});
```