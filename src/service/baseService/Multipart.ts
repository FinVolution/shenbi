
const sendToWormhole = require('stream-wormhole')
const Service = require('egg').Service
const toArray = require('stream-to-array')

export default class Multipart extends Service {
  // 获取mulripart数据
  async getMultipartData(ctx = null) {
    if (ctx) {
      const parts = await ctx.multipart()
      let part;
      let data = []
      while ((part = await parts()) != null) {
        if (part.length) {
          // 新增一个对象，field就是key名，data就是上传的数据，压入data对象数组中。
          data.push({
            field: part[0].replace(/ /g, ''),
            data: part[1]
          })

        } else {
          if (!part.filename) {
            return
          }
          // 转成buffer数组
          const partData = await toArray(part).then(
            function (parts) {
              const buffers = []
              for (let i = 0, l = parts.length; i < l; ++i) {
                const part = parts[i]
                buffers.push((part instanceof Buffer) ? part : new Buffer(part))
              }
              return Buffer.concat(buffers)
            }
          )
          // 新增一个对象，field就是上传key名，data就是buffer数据,fileName上传的文件名（有用），压入data对象数组中。
          data.push({
            field: part.fieldname,
            data: partData,
            fileName: part.filename
          })
          await sendToWormhole(part);
        }
      }
      return data
    }
    return null
  }
}