/**
 * Build script for packaging the GraphQL source files as nodejs modules
 *
 * @package: HoloREA
 * @since:   2019-05-22
 * @flow
 */

const fs = require('fs')
const path = require('path')

const SOURCE_FILES = [
  'structs',
  'agent',
  'observation',
  'planning',
  'knowledge',
  'query',
  'mutation',
]

const TEMPLATE = `
// Generated by scripts/build.js - edit the *.gql file instead!

module.exports = \`
$SCHEMA_DOCUMENT
\`

`;

const typeDefs = SOURCE_FILES
  .forEach(f => {
    const doc = fs.readFileSync(path.resolve(__dirname, `../schemas/${f}.gql`))
    fs.writeFileSync(
      path.resolve(__dirname, `../build/${f}.js`),
      TEMPLATE.replace('$SCHEMA_DOCUMENT', doc.toString().replace(/`/g, '\\`'))
    )
  })