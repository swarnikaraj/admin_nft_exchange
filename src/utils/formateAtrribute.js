const crypto = require("crypto");

const formatCollectionAtrributes = (traits) => {
  var data = traits;
  keyList = Object.keys(data);

  finalTraits = [];
  for (let i = 0; i < keyList.length; i++) {
    var innerKeysList = Object.keys(data[keyList[i]]);

    var valueArray = [];
    for (let j = 0; j < innerKeysList.length; j++) {
      let obj = {
        id: crypto.randomUUID(),
        traitType: keyList[i],
        value: innerKeysList[j],
        count: data[keyList[i]][innerKeysList[j]],
      };

      valueArray.push(obj);
    }

    let mainObj = {
      traitType: keyList[i],
      values: valueArray,
    };
    finalTraits.push(mainObj);
  }

  return finalTraits;
};

const formatNftAttributes = (traits, nft) => {
  finalTraits = [];

  for (let i = 0; i < traits.length; i++) {
    let obj = {
      id: crypto.randomUUID(),
      traitType: traits[i].trait_type,
      value: traits[i].value,
    };

    finalTraits.push(obj);
  }

  nft.attributes = finalTraits;
};

const formatNftAtrributesTypeObject = (traits, nft) => {
  var keys = Object.keys(traits);
  var finalTraits = [];
  for (let i = 0; i < keys.length; i++) {
    let obj = {
      id: crypto.randomUUID(),
      traitType: keys[i],
      value: traits[keys[i]],
    };
    finalTraits.push(obj);
  }
  nft.attributes = finalTraits;
};

module.exports = {
  formatCollectionAtrributes,
  formatNftAttributes,
  formatNftAtrributesTypeObject,
};
