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

export async function generateSHA256(message: string) {
  // Encode the message as a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  // Use the SubtleCrypto API to compute the hash
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // Convert the hash buffer to a hex string
  return Array.from(new Uint8Array(hashBuffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function generateGravatar(email = '', size = 100) {
  const emailHash = await generateSHA256(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${emailHash}?s=${size}&d=identicon`;
}