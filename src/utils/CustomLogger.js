class CustomLogger {
  // NOTE: function to print log with title
  static logger(data, title, options = {}) {
    const { fontStyles = {} } = options;

    const defaultStyle = 'color: #2196f3; font-weight: 900; font-size: 18px';
    const stringifiedStyle =
      Object.keys(fontStyles).length > 0
        ? JSON.stringify(fontStyles)
        : defaultStyle;

    const startMessageTitle = CustomLogger.logTitle(title, 'START');
    const endMessageTitle = CustomLogger.logTitle(title, 'END');

    console.log(`%c ${startMessageTitle}`, stringifiedStyle);
    console.log(data);
    console.log(`%c ${endMessageTitle}`, stringifiedStyle);
  }

  static logTitle(title, subTitle, separator = '*') {
    const titleString = [];
    const noOfSep = 10;
    for (let i = 0; i < noOfSep; i += 1) {
      titleString.push(separator);
    }
    titleString.push(' ');
    titleString.push(`${title} ( ${subTitle} )`);
    titleString.push(' ');
    for (let i = 0; i < noOfSep; i += 1) {
      titleString.push(separator);
    }

    return titleString.join('');
  }
}

export default CustomLogger;
