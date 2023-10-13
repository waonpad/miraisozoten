/**
 * @jest-environment jsdom
 */
import { describe, test, expect } from '@jest/globals';
import { render } from '@testing-library/react';

import { Hooks } from '@/__sample__/ui/Hooks';

describe('React Hooks を検証する', () => {
  test('useEffect が実行されているか検証する', () => {
    // 準備&実行
    const hooks = render(<Hooks />);

    // 確認
    expect(hooks.getByText('Hello, world!')).toBeTruthy;
  });
});
