const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());

  return config
};

/*
const fs = require('fs')

module.exports = (on, config) => {
  on('after:screenshot', (details) => {
    console.log(details) // print all details to terminal

    const newPath = './new/path/to/screenshot.png'

    return new Promise((resolve, reject) => {
      // fs.rename moves the file to the existing directory 'new/path/to'
      // and renames the image to 'screenshot.png'
      fs.rename(details.path, newPath, (err) => {
        if (err) return reject(err)

        // because we renamed and moved the image, resolve with the new path
        // so it is accurate in the test results
        resolve({ path: newPath })
      })
    })
  })
}
*/