/**
 * @jest-environment jsdom
 */

import { describe, test, expect } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';

import { Button } from '@/__sample__/ui/Button';

describe('Button のイベントを検証する', () => {
  test('Button を1回クリックした場合の検証', () => {
    // 準備
    const button = render(<Button />);

    // 実行
    fireEvent.click(button.getByText('Count: 0'));

    // 確認
    expect(button.getByText('Count: 1')).toBeTruthy;
  });

  test('Button を2回クリックした場合の検証', () => {
    // 準備
    const button = render(<Button />);

    // 実行
    fireEvent.click(button.getByText('Count: 0'));
    fireEvent.click(button.getByText('Count: 1'));

    // 確認
    expect(button.getByText('Count: 2')).toBeTruthy;
  });
});
