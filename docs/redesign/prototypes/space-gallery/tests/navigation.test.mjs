import assert from 'node:assert/strict';
import { test } from 'node:test';
import { scrollDestination, scrollDuration, sectionFromHash } from '../src/navigation.ts';

test('section positions stay in the available scroll range', () => {
  assert.equal(scrollDestination(500, 5000, 900), 500);
  assert.equal(scrollDestination(4800, 5000, 900), 4100);
  assert.equal(scrollDestination(-88, 5000, 900), 0);
  assert.equal(scrollDestination(500, 700, 900), 0);
});

test('long navigation has bounded duration and reversals use the same timing', () => {
  assert.equal(scrollDuration(12000), .95);
  assert.equal(scrollDuration(12000), scrollDuration(-12000));
  assert.equal(scrollDuration(100), .45);
  assert.ok(scrollDuration(3000) > scrollDuration(1000));
});

test('project anchors target their containing chapter', () => {
  const chapter = { id: 'work' };
  const doc = { getElementById: id => id === 'bagyong' ? { closest: () => chapter } : null };
  assert.equal(sectionFromHash('#bagyong', doc), chapter);
  assert.equal(sectionFromHash('#missing', doc), null);
});

test('malformed hashes fail safely and encoded names are decoded', () => {
  const doc = { getElementById: id => id === 'my section' ? { closest: () => null, id } : null };
  assert.equal(sectionFromHash('#%E0%A4%A', doc), null);
  assert.equal(sectionFromHash('#my%20section', doc).id, 'my section');
});
