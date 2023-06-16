
/**
 * @param ob Object                 The object to flatten
 * @param prefix String (Optional)  The prefix to add before each key, also used for recursion
 **/
export function flattenObject(ob, prefix = "", result = {}) {
    // Preserve empty objects and arrays, they are lost otherwise
    if (
      prefix &&
      typeof ob === "object" &&
      ob !== null &&
      Object.keys(ob).length === 0
    ) {
      result[prefix] = Array.isArray(ob) ? [] : {};
      return result;
    }
  
    prefix = prefix ? `${prefix}.` : "";
  
    for (const i in ob) {
      if (Object.prototype.hasOwnProperty.call(ob, i)) {
        if (typeof ob[i] === "object" && ob[i] !== null) {
          // Recursion on deeper objects
          flattenObject(ob[i], prefix + i, result);
        } else {
          result[prefix + i] = ob[i];
        }
      }
    }
    return result;
  }
