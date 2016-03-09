'use strict';

function first(v) {
  return v[0];
}

const CH_SLASH = 47;

var chs = [];
chs.push(97,227,224,225,226,194,65,193,192); // a
chs.push(101,7869,232,233,234,202,69,201,200); // e
chs.push(105,297,236,237,238,206,73,204,205); // i
chs.push(111,245,242,243,244,212,79,211,210); // o
chs.push(117,361,249,250,251,219,85,218,217); // u
chs.push(121,7929,7923,253,375,374,89,221,7922); // y
chs.push(99,231,67,199); // ç

/*var str = 'yỹỳýŷŶYÝỲ';
for(var i = 0; i < str.length; i++) {
  console.log(`ch == ${str.charCodeAt(i)} ||`);
}*/

module.exports = function(regex) {
  var i,
      ch,
      str = regex.toString(),
      incr,
      tokens = str.split('');

  var flags = [];

  for(i = 0; i < tokens.length; i++) {
    ch = tokens[i].charCodeAt(0);

    if(ch == CH_SLASH) {
      tokens.splice(i, 1);

      if(i === 0) {
        continue;
      }

      while(i < tokens.length) {
        flags.push(first(tokens.splice(i, 1)));
      }
    }
  }

  for(i = 0; i < tokens.length; i++) {
    ch = tokens[i].charCodeAt(0);

    if(ch == 91) {
      // skip [
      while(i < tokens.length && tokens[i] !== ']') {
        i++;
      }
      if(tokens[i] !== ']') {
        throw new Error('Invalid regexp');
      }
    } else if(chs.indexOf(ch) > -1) {
      incr = 11;

      if(ch == 111 || ch == 245 ||
          ch == 242 || ch == 243 ||
          ch == 244 || ch == 212 ||
          ch == 79 || ch == 211 ||
          ch == 210) {
        tokens.splice(i, 1, '[', 'o', 'õ', 'ò', 'ó', 'ô', 'Ô', 'O', 'Ó', 'Ò', ']');
      } else if (ch == 97 || ch == 227 ||
                  ch == 224 || ch == 225 ||
                  ch == 226 || ch == 194 ||
                  ch == 65 || ch == 193 ||
                  ch == 192) {
        tokens.splice(i, 1, '[', 'a', 'ã', 'à', 'á', 'â', 'Â', 'A', 'Á', 'À', ']');
      } else if(ch == 117 || ch == 361 ||
                ch == 249 || ch == 250 ||
                ch == 251 || ch == 219 ||
                ch == 85 || ch == 218 ||
                ch == 217) {
        tokens.splice(i, 1, '[', 'u', 'ũ', 'ù', 'ú', 'û', 'Û', 'U', 'Ú', 'Ù', ']');
      } else if (ch == 101 || ch == 7869 ||
                ch == 232 || ch == 233 ||
                ch == 234 || ch == 202 ||
                ch == 69 || ch == 201 ||
                ch == 200) {
        tokens.splice(i, 1, '[', 'e', 'ẽ', 'è', 'é', 'ê', 'Ê', 'E', 'É', 'È', ']');
      } else if (ch == 105 || ch == 297 ||
                ch == 236 || ch == 237 ||
                ch == 238 || ch == 206 ||
                ch == 73 || ch == 204 ||
                ch == 205) {
        tokens.splice(i, 1, '[', 'i', 'ĩ', 'ì', 'í', 'î', 'Î', 'I', 'Ì', 'Í', ']');
      } else if(ch == 99 || ch == 231 ||
                ch == 67 || ch == 199) {
        incr = 5;
        tokens.splice(i, 1, '[', 'c', 'ç', 'C', 'Ç', ']');
      } else if(ch == 121 || ch == 7929 ||
                ch == 7923 || ch == 253 ||
                ch == 375 || ch == 374 ||
                ch == 89 || ch == 221 ||
                ch == 7922) {
        tokens.splice(i, 1, '[', 'y', 'ỹ', 'ỳ', 'ý', 'ŷ', 'Ŷ', 'Y', 'Ý', 'Ỳ', ']');
      }

      // skip the added elements
      i += incr;
    }
  }

  return new RegExp(tokens.join(''), flags.join(''));
};