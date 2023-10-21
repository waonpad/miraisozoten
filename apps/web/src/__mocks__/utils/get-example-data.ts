import yml from '../../../../api/openapi.yml';

export const getMockData = <T>(
  schemaPath: string,
  {
    overrideProperties,
  }: {
    overrideProperties?: Partial<T>;
  } = {}
): T => {
  const properties =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    yml.paths[`/${schemaPath}/-schema-`].get.responses['200'].content[
      'application/json; charset=utf-8'
    ].schema.properties;

  const examples = Object.fromEntries(
    Object.entries(properties).map(([key, value]) => [key, (value as { example: unknown }).example])
  );

  return { ...examples, ...overrideProperties } as T;
};
