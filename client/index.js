
(function() {

  var serverAddr = 'http://bugreport.com';

  function uploadErrorMessage(addr, param) {
    var img = new Image();
    img.onload = img.onerror = function() {
      img = null;
    }
    img.src = addr + '?' + param;
  }

  function handleGlobalError(errMsg, row, col) {
    var param = 'errMsg=' + errMsg + '&row=' + row + '&col=' + col + '&t=' + (+new Date());
    uploadErrorMessage(serverAddr, param);
  }

  /**
   * 捕捉全局错误
   * @param  {[type]} errMsg     错误信息
   * @param  {[type]} url        脚本地址
   * @param  {[type]} roe        行
   * @param  {[type]} col        列
   * @param  {[type]} stack      调用栈
   */
  window.onerror = function(errMsg, url, row, col, stack) {
    handleGlobalError(errMsg, row, col);
  }

})();