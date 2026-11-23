// Only non-identifying display preferences persist across browser sessions.
// GPS, names, branding images and project identifiers remain session-only.
export const STORED_PREFERENCES = Object.freeze([
  'colourPreset', 'accent', 'strong', 'perPage', 'orientation',
  'fit', 'quality', 'includeDate', 'includeFilename',
]);
export function sanitizeSettings(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(STORED_PREFERENCES
    .filter(key => (typeof value[key] === 'string' || typeof value[key] === 'boolean'))
    .map(key => [key, value[key]]));
}
export const gpsCsvWarning =
  'GPS CSV can include precise coordinates, filenames, captions, dates and map links for every photo. Save it only to an approved project location. Continue exporting?';
