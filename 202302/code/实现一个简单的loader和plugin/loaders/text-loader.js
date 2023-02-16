
module.exports = function(source) {
  const options = this.getOptions();
  console.log(options)
  return `export default ${JSON.stringify(source)}`
}