
/**
* 根据客户端传过来的出错的行列
* 根据 sourcemap 获取源文件行列
*
* Inspired by http://www.cnblogs.com/yexiaochai/p/6246490.html
*/
var fs = require('fs')

var sourceMap = require('source-map')
var SourceMapConsumer = sourceMap.SourceMapConsumer

function readSourceMapFile(filePath, callback) {
  var file = fs.createReadStream(filePath)
  var map = ''

  file.on('data', function(chunk) {
    map += chunk
  })

  file.on('end', function() {
    callback(JSON.parse(map));
  })
}

function getOriginalRowCol(map, row, col, callback) {
  var smc = new SourceMapConsumer(map);
  var res = smc.originalPositionFor({
    line: row,
    column: col
  })
  // todo 
  // 统计该处报错的次数(某个版本内)
  callback(res)
}

/**
 * [parseSourceMapFile description]
 * @param  {[type]} opts [description]
 *                       filePath
 *                       row
 *                       col
 *                       callback
 */
function parseSourceMapFile(opts) {
  readSourceMapFile(opts.filePath, function(map) {
    getOriginalRowCol(map, opts.row, opts.col, function(res) {
      opts.callback && opts.callback(res)
    })
  })
}

module.exports = parseSourceMapFile