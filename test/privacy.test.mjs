import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {sanitizeSettings, gpsCsvWarning} from '../privacy.js';

test('only generic appearance/export preferences survive browser persistence', () => {
  const raw={
    projectName:'Private client and site', companyName:'Work company', brandName:'Employer',
    appendixTitle:'Project drawing', outputName:'Secret reference', logo:'data:image/png;base64,secret',
    reportDate:'Secret date',includeGps:true,includeMaps:true,useDeviceGps:true,
    quality:'high',includeDate:true,perPage:'2',colourPreset:'blue',includeFilename:false,
  };
  const safe=sanitizeSettings(raw);
  assert.deepEqual(safe,{colourPreset:'blue',perPage:'2',quality:'high',includeDate:true,includeFilename:false});
  for (const forbidden of ['Private client','Employer','secret','includeGps','includeMaps','useDeviceGps','Project drawing'])
    assert.ok(!JSON.stringify(safe).includes(forbidden));
  assert.deepEqual(sanitizeSettings(null),{});
  assert.deepEqual(sanitizeSettings([]),{});
});
test('GPS export warns about precise site data', () => {
  assert.match(gpsCsvWarning,/precise coordinates/);
  assert.match(gpsCsvWarning,/approved project location/);
});
test('runtime defaults keep geolocation and outbound maps opt-in', () => {
  const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
  for(const id of ['includeGps','includeMaps','useDeviceGps']){
    assert.match(html,new RegExp('id="'+id+'" type="checkbox"\\s*/>'));
  }
  assert.match(html,/sanitizeSettings\(JSON\.parse/);
  assert.match(html,/state\.lastLocation = null/);
  assert.match(html,/state\.lastHtml = ""/);
  assert.match(html,/confirm\(gpsCsvWarning\)/);
});

test('image fallback re-encodes pixels rather than embedding original EXIF bytes', () => {
  const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(html,/imageDataFromLocalImage\(file\)/);
  assert.doesNotMatch(html,/return await readFileAsDataUrl\(file\)/);
  assert.match(html,/URL\.revokeObjectURL\(url\)/);
});
