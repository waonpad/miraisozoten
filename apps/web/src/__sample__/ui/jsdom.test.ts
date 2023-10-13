import fs from 'fs';
import path from 'path';

import { describe, test, expect, beforeEach } from '@jest/globals';
import { JSDOM, DOMWindow } from 'jsdom';

const html = fs.readFileSync(path.resolve('src/__sample__/ui/jsdom.html'), 'utf8');

describe('JSDOM を使って HTML を読み込む', () => {
  let window: DOMWindow;
  let document: Document;
  let element: HTMLElement;
  let button: HTMLElement;

  beforeEach(() => {
    window = new JSDOM(html, { runScripts: 'dangerously' }).window;
    document = window.document;
    element = document.querySelector('#message') as HTMLElement;
    button = document.querySelector('#button') as HTMLElement;
  });

  test('初期表示状態のメッセージを検証する', () => {
    expect(element.textContent).toEqual('');
  });

  test('ボタンクリック後のメッセージを検証する', () => {
    button.click();
    expect(element.textContent).toEqual('Hello, world!');
  });
});
