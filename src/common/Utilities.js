/**
 * Trims a String to a given number of characters, and then appends an ellipsis.
 * If the String is less than the max number of characters, the original String is returned.
 * 
 * @param textToTrim The String to be trimmed (if necessary)
 * @param maxLength The maximum allowed characters before being trimmed
 * @returns {string} The trimmed String
 */
export function _trimTextLength(textToTrim, maxLength = 50) {
  if (!textToTrim) return textToTrim;
  return textToTrim.length > maxLength ? textToTrim.slice(0, maxLength).concat('...') : textToTrim;
}

/**
 * Trims a String to a given number of words, and then appends an ellipsis.
 * If the String is less than the max number of words, the original String is returned.
 * 
 * @param textToTrim The String to be trimmed (if necessary)
 * @param maxWordCount The maximum allowed words before being trimmed
 * @returns {string} The trimmed String
 */
export function _trimWordLength(textToTrim, maxWordCount = 100) {
  if (!textToTrim) return textToTrim;
  
  const wordsArr = textToTrim.split(' ');
  return wordsArr.length > maxWordCount ? wordsArr.splice(0, maxWordCount).join(' ').concat('...') : textToTrim;
}

/**
 * Determines if a list contains a target Id
 * 
 * @param list The list to search
 * @param id The id to search for
 * @returns {boolean} Whether or not the Id exists in the list
 */
export function _getIsIdInList(list, id) {
  return list.findIndex(listItem => listItem.id === id) >= 0;
}

/**
 * Indicates whether or not the user is viewing on a mobile device
 *
 * @type {boolean}
 */
export const IS_MOBILE_DEVICE = (/Mobi|Android/i.test(navigator.userAgent));