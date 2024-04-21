import {encoded, translations} from './data.js'

// console.log("Let's rock")
// console.log(encoded, translations)

const decodeFields = (encoded, translations) => {
  let decodedList = [];
  let uniqueIDs = new Set();
  encoded.forEach((item) => {
    let decodedItem = {};
    for (let key in item) {      
      const isNeedDecoded = key.endsWith('Id') && !['groupId', 'service', 'formatSize', 'ca'].includes(key);
      if (isNeedDecoded) {
        let translationKey = item[key];
        decodedItem[key] = translations[translationKey] || item[key];
        uniqueIDs.add(translationKey);
      }
      else decodedItem[key] = item[key];
      decodedList.push(decodedItem);
    };
  });
  let uniqueIDsArray = Array.from(uniqueIDs);
  return { decodedList, uniqueIDsArray };
};

let decoded = decodeFields(encoded, translations);
console.log(decoded)
