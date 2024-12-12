export function isConfigEnabled(configOption: any): boolean {
  switch (typeof configOption) {
    case 'boolean':
      return configOption;
    case 'string':
      return configOption === '1';
    case 'number':
      return configOption === 1;
    default:
      return false;
  }
};

export function isValidItemsPerPage(itemsPerPage: any) {
  switch (typeof itemsPerPage) {
    case 'string':
      const convertedNumber = parseInt(itemsPerPage);
      return isNaN(convertedNumber) ? false : convertedNumber > 0;
    case 'number':
      return isNaN(itemsPerPage) ? false : Math.trunc(itemsPerPage) > 0;
    default:
      return false;
  }
}