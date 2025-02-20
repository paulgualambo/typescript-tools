describe("config", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("debe parsear correctamente las variables de entorno válidas", () => {
    process.env.APP_NAME = "APP-TEST"
    process.env.APP_CODE = "APP-CODE"
    process.env.CURRENCY_CHANGE_TYPE = "123.45";
    process.env.SETTINGS_DB = '{"host": "localhost", "port": 3306}';
    process.env.END_POINT = "http://example.com";

    const Config = require('../../src/common/config').default;
    const env = Config.getInstance();
    expect(env.CURRENCY_CHANGE_TYPE).toEqual("123.45");
    expect(env.SETTINGS_DB).toEqual({ host: "localhost", port: 3306 });
    expect(env.END_POINT).toBe("http://example.com");
  });


});