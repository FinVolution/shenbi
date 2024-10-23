const fs = require('fs')
const path = require('path')

const mimes = {
  'css': 'text/css',
  'less': 'text/css',
  'gif': 'image/gif',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'text/javascript',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'swf': 'application/x-shockwave-flash',
  'tiff': 'image/tiff',
  'txt': 'text/plain',
  'log': 'text/plain',
  'wav': 'audio/x-wav',
  'wma': 'audio/x-ms-wma',
  'wmv': 'video/x-ms-wmv',
  'xml': 'text/xml'
}
/**
 * 获取静态资源内容
 * @param  {object} ctx koa上下文
 * @param  {string} 静态资源目录在本地的绝对路径
 * @return  {string} 请求获取到的本地内容
 */
async function content(fullStaticPath ) {
  // 判断请求路径是否为存在目录或者文件
  let exist = fs.existsSync( fullStaticPath )
  // 返回请求内容， 默认为空
  let content = ''
  if( !exist ) {
    //如果请求路径不存在，返回404
    content = '404 Not Found! o(╯□╰)o！'
  } else {
    //判断访问地址是文件夹还是文件
    let stat = fs.statSync( fullStaticPath )
    if(stat.isFile()) {
      // 如果请求为文件，则读取文件内容
      content = await fs.readFileSync(fullStaticPath, 'utf8', 'binary' )
    }
  }
  return content
}

// 解析资源类型
const parseMime = ( url )=> {
  let extName = path.extname( url )
  extName = extName ?  extName.slice(1) : 'unknown'
  return  mimes[ extName ]
}

export {
  content,
  mimes,
  parseMime
}