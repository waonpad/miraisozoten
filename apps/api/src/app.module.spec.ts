// NOTICE: テストが1つも無いとエラーになってしまうので、エラー回避のために作成した

import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from './app.module';

describe('AppModule', () => {
  let app: TestingModule;

  beforeAll(async () => {
    // テスト用のAppModuleを作成する
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    // テスト用のAppModuleが作成できたか確認する
    expect(app).toBeDefined();
  });
});
