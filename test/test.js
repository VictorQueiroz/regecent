var assert = require('assert'),
    regecent = require('../index');

describe('regecent', function() {
  it('should transform all accents into multiple regexp pattern', function() {
    assert.deepEqual(regecent('/á/gim'), /[aãàáâÂAÁÀ]/gim);
  });

  it('should deal with Ç and C', function() {
    assert.deepEqual(regecent(/ç/), /[cçCÇ]/);
  });

  it('should deal with Y', function() {
    assert.deepEqual(regecent(/Y/), /[yỹỳýŷŶYÝỲ]/);
  });

  it('should ignore [] pattern statements', function() {
    assert.deepEqual(regecent(/[A]/), /[A]/);
  });

  it('should handle () pattern statements', function() {
    assert.deepEqual(regecent(/(A|o)/), /([aãàáâÂAÁÀ]|[oõòóôÔOÓÒ])/);
  });
});