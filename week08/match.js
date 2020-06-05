let classNames = [];
let id = "";
let attrs = {};
let attrName = "";
let attrValue = "";

function match(selector, element) {
  const selectorList = selector.split(" ");
  const lastSelector = selectorList[selectorList.length - 1];

  let state = startSelector;
  for (let i of lastSelector) {
    state = state(i);
  }
  console.log(classNames, id, attrs);

  const eleClass = element.getAttribute("class");
  const eleId = element.getAttribute("id");
  const key = element.getAttribute("key");
  console.log(eleClass, eleId, key);
  // return true;
}

function startSelector(c) {
  if (c === ".") {
    return isStartClass;
  } else if (c === "#") {
    return isId;
  } else if (c === "[") {
    return isStartAttr;
  } else {
    return isTag;
  }
}

function isStartClass(c) {
  classNames.push("");
  return isClass(c);
}

function isClass(c) {
  if (c === ".") {
    return isStartClass;
  } else if (c === "#") {
    return isId;
  } else if (c === "[") {
    return isStartAttr;
  } else {
    classNames[classNames.length - 1] = classNames[classNames.length - 1] + c;
    return isClass;
  }
}

function isId(c) {
  if (c === ".") {
    return isStartClass;
  } else if (c === "[") {
    return isStartAttr;
  } else {
    id = id + c;
    return isId;
  }
}

function isStartAttr(c) {
  attrName = "";
  return isAttrKey(c);
}

function isAttrKey(c) {
  if (c === "=") {
    return isStartValue;
  } else if (c === "]") {
    attrs[attrName] = true;
    return isEndAttr;
  } else {
    attrName = attrName + c;
    return isAttrKey;
  }
}

function isStartValue(c) {
  attrValue = "";
  return isValue(c);
}

function isValue(c) {
  if (c === "]") {
    attrs[attrName] = attrValue;
    return isEndAttr;
  } else {
    attrValue = attrValue + c;
    return isValue;
  }
}

function isEndAttr(c) {
  return startSelector(c);
}

// match("div .class0#id.class[key2].class2[key=value]", {});
