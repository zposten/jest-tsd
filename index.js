const tsdImport = require('tsd-lite');
const tsd = tsdImport.default;

const { convertPathsToTypeDefTest } = require('./path-massager');

async function expectTypeTestsToPassAsync(...pathToTypeDefTest) {
  const testFiles = convertPathsToTypeDefTest(...pathToTypeDefTest);
  const { assertionsCount, tsdResults } = tsd(...testFiles);

  const results = tsdResults.map((r) => ({
    messageText: r.messageText,
    file: {
      pos: r.file.pos,
      end: r.file.end,
      fileName: r.file.fileName,
    },
  }));

  if (tsdResults.length) console.error(results);
  expect(results).toHaveLength(0);

  return { assertionsCount, tsdResults };
}

module.exports = {
  expectTypeTestsToPassAsync,

  expectType: tsdImport.expectType,
  expectError: tsdImport.expectError,
  expectAssignable: tsdImport.expectAssignable,
  expectDeprecated: tsdImport.expectDeprecated,
  expectNotAssignable: tsdImport.expectNotAssignable,
  expectNotDeprecated: tsdImport.expectNotDeprecated,
  expectNotType: tsdImport.expectNotType,
};
