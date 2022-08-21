const crypto = require('crypto');

const formatCollectionAtrributes = (traits) => {
  var data = traits;
  keyList = Object.keys(data);
  
  finalTraits = [];
  for (let i = 0; i < keyList.length; i++) {
    var innerKeysList = Object.keys(data[keyList[i]]);
    
    var valueArray=[];
    for (let j = 0; j < innerKeysList.length; j++) {
      let obj = {
        id:crypto.randomUUID(),
        traitType: keyList[i],
        value: innerKeysList[j],
        count: data[keyList[i]][innerKeysList[j]],
      };

      valueArray.push(obj);
    }

   let mainObj={
       traitType: keyList[i],
       values:valueArray
   }
   finalTraits.push(mainObj)

  }

  return finalTraits;
};

module.exports = { formatCollectionAtrributes };
