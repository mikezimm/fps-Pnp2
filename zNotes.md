# Removed from TrainingSample/package.json:

  "devDependencies": {
    "@types/react": "16.9.51",
    "@types/react-dom": "16.9.8",

  "dependencies": {
    "@pnp/common": "^2.14.0",
    "@pnp/graph": "^2.14.0",
    "@pnp/logging": "^2.14.0",
    "@pnp/odata": "^2.14.0",


## Before bundling final version to publish for production:

### in webpack.config.cjs

<!-- Time:  18:09 in /DevLearning/Training/Mentoring SPFx - Build npm package from ground up-20221114_140149-Meeting Recording   -->
change mode to production when pushing final version to minimize library and create single js or CDN

module.exports = {
  mode: 'development', // switch to production when you package for production - impacts final size of package you import


<!-- Time:  24:14 in /DevLearning/Training/Mentoring SPFx - Build npm package from ground up-20221114_140149-Meeting Recording   -->

For this library, things to NOT bundle here:
externals: { // Read webpack documentation - do not want to bundle these into the package
  "react": "React",
  "lodash-es": "lodash-es/*"
},

## While developing the library only
Refer to it with the file:.. reference.
When the library works, then the consumer should pull from the npm library

  "dependencies": {
    // Use file reference for local copies
    // 
    // "@mikezimm/sample-library": "^1.0.0",
    "@mikezimm/sample-library": "file:../trainingSample",