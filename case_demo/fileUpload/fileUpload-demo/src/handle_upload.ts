import * as path from 'path'
import {uploadFile,upToQiniu,removeTemFile} from './upload'
/**
 * 上传海报
 */

export const upload = async (ctx:any) => {
	const serverPath = path.join(__dirname, '../uploadtemp/');
	console.log(serverPath,'serverPath');
	// 获取上传图片
  const result:any = await uploadFile(ctx, {
    fileType: 'poster',
    path: serverPath
	})
	const imgPath = path.join(serverPath, result.imgPath)
	// 上传到七牛
	console.log(imgPath,result,'xxxx');
	const qiniu = await upToQiniu(imgPath, result.imgKey)	
  // 上传到七牛之后 删除原来的缓存文件
	removeTemFile(imgPath)
	return qiniu
}