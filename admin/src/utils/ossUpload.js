import moment from 'moment';
import OSS from 'ali-oss';
import store from '../store'
import Compressor from 'compressorjs';

export default class OSSUpload {
    client;
    path;
    constructor(path, token) {
        this.path = path
        this.client = new OSS({
            secure: true,
            region: 'xxx',
            accessKeyId: 'xxx',
            accessKeySecret: 'xxx',
            stsToken: 'xxx',
            bucket: 'xxx',
        });
    }
    randomFileName() {
        let result = [];
        for (let i = 0; i < 6; i++) {
            // 生成一个0到25的数字，向上取整
            let ranNum = Math.ceil(Math.random() * 25);
            // 大写字母'A'的ASCII是65，A~Z的ASCII码就是65 + 0~25，然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
            result.push(String.fromCharCode(65 + ranNum));
        }
        // 上传时间的时间，年月日时分秒的字符串
        const dateStr = moment().format('YYYYMMDDhhmmss');
        // 随机的六位大写英文单词
        const randomStr = result.join('');
        return randomStr + dateStr;
    }
    async _upload(compressFile, resolve, reject) {
        try {
            const { file, beforeSize } = compressFile
            const url = `${this.path}/${this.randomFileName()}.${file.type.split('/')[1]}`
            let result = await this.client.multipartUpload(url, file);
            if (result.res.status === 200) {
                let uploadUrl = result.res.requestUrls[0];
                if (uploadUrl.includes('https://')) {
                    let url = uploadUrl.replace('xx.aliyuncs', 'xxx').split('?')[0]
                    resolve({
                        url,
                        beforeSize,
                        afterSize: file.size
                    })
                } else {
                    let url = uploadUrl.replace('http://', 'https://').replace('xx.aliyuncs', 'xxx').split('?')[0]
                    resolve({
                        url,
                        beforeSize,
                        afterSize: file.size
                    })
                }
            } else {
                reject(result.status)
            }
            console.log('dialog success', result);
        } catch (error) {
            console.log('dialog error', error);
            reject(error)
        }
    }
    ossUpload(raw, compressFile = true) {
        const file = raw.file
        let that = this
        return new Promise(async (resolve, reject) => {
            if (file.type != 'image/gif') {
                try {
                    if (compressFile) {
                        new Compressor(file, {
                            quality: 0.8,
                            success(result) {
                                console.log('result:', result)
                                console.log('Image size after compression:', result.size);
                                console.log('mime type:', result.type);
                                console.log('Actual compression ratio:', ((file.size-result.size) / file.size * 100).toFixed(2) +'%');
                                that._upload({file: result, beforeSize: file.size}, resolve, reject)
                            },
                            error(err) {
                                console.log(err.message);
                            },
                        });
                    } else {
                        this._upload({file, beforeSize: file.size}, resolve, reject)
                    }
                } catch (error) {
                    console.log('lrz', error)
                    this._upload({file, beforeSize: file.size}, resolve, reject)
                }
            } else {
                this._upload({file, beforeSize: file.size}, resolve, reject)
            }

        })

    }
}