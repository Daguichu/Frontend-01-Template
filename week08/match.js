let classNames = [];
let id = "";
let attrs = {};
let attrName = "";
let attrValue = "";
let tagName = "";

//只匹配了复合选择器、后代复杂选择器，有待优化
//已经不知道写的是什么了
function match(selector, element) {
  const selectorList = selector.split(" ");
  const lastSelector = selectorList[selectorList.length - 1];
  let parent = element.parentNode;

  //首先查看最后一个选择器与当前元素是否完全匹配
  //使用状态机将当前选择器保存到初始化的变量里
  let state = startSelector;
  for (let i of lastSelector) {
    state = state(i);
  }
  const matchElem = check(element);
  //查看父元素是否与之前选择器匹配
  let len = selectorList.length,
    i;
  if (matchElem) {
    //只是复合选择器情况
    if (len === 1) {
      return true;
    }
    //从后往前遍历选择器列表，将每个选择器都与其父元素进行检查是否匹配，匹配了退出父元素循环，
    //只要父元素不为空就一直遍历选择器列表，最后判断选择器列表是否匹配完
    for (i = len - 2; i >= 0; i--) {
      //初始化变量
      classNames = [];
      id = "";
      attrs = {};
      attrName = "";
      attrValue = "";
      tagName = "";
      state = startSelector;
      let select = selectorList[i];
      for (let i of select) {
        state = state(i);
      }

      while (parent != null) {
        if (check(parent)) {
          parent = parent.parentNode;
          break;
        } else {
          parent = parent.parentNode;
        }
      }
      if (parent == null) {
        break;
      }
    }
  } else {
    return false;
  }
  classNames = [];
  id = "";
  attrs = {};
  attrName = "";
  attrValue = "";
  tagName = "";
  if (i === -1) {
    return true;
  } else {
    return false;
  }
  // return true;
}

//检查一个元素与当前选择器是否匹配
function check(element) {
  const attrKeys = Object.keys(attrs);
  if (classNames.length) {
    const eleClass = element.getAttribute("class");
    const arrayClass = eleClass.split(" ");
    for (let i = 0, len = classNames.length; i < len; i++) {
      if (!arrayClass.includes(classNames[i])) {
        return false;
      }
    }
  }
  if (id) {
    const eleId = element.getAttribute("id");
    if (eleId !== id) {
      return false;
    }
  }
  if (attrKeys.length) {
    for (let i = 0, len = attrKeys.length; i < len; i++) {
      const value = element.getAttribute(attrKeys[i]);
      if (value !== attrs[attrKeys[i]]) {
        return false;
      }
    }
  }
  if (tagName) {
    if (element.tagName !== tagName.toUpperCase()) {
      return false;
    }
  }
  return true;
}

function startSelector(c) {
  if (c === ".") {
    return isStartClass;
  } else if (c === "#") {
    return isId;
  } else if (c === "[") {
    return isStartAttr;
  } else {
    return isTag(c);
  }
}

function isTag(c) {
  if (c === ".") {
    return isStartClass;
  } else if (c === "#") {
    return isId;
  } else if (c === "[") {
    return isStartAttr;
  } else {
    tagName = tagName + c;
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
