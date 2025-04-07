/**
 * Format JSON data with proper indentation
 * @param jsonData - The JSON data to format
 * @returns Formatted JSON string
 */
export const formatJson = (jsonData: unknown): string => {
  return JSON.stringify(jsonData, null, 2);
};
