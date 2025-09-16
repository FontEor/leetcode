var compareVersion = function (version1, version2) {
  const version1List = version1.split(".");
  const version2List = version2.split(".");
  const len = Math.min(version1List.length, version2List.length);
  for (let i = 0; i < len; i++) {
    let v1 = version1List[i];
    let v2 = version2List[i];
    const len1 = v1.length;
    const len2 = v2.length;
    if (len1 > len2) {
      v2 = "0".repeat(len1 - len2) + v2;
    } else if (len1 < len2) {
      v1 = "0".repeat(len2 - len1) + v1;
    }
    for (let j = 0; j < len1; j++) {
      if (v1[j] > v2[j]) {
        return 1;
      } else if (v1[j] < v2[j]) {
        return -1;
      }
    }
  }
  if (version1List.length > version2List.length) {
    return 1;
  } else if (version1List.length < version2List.length) {
    return -1;
  }
  return 0;
};
