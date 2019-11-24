import HttpException from './HttpException'

class NotFoundException extends HttpException{
    constructor(id:string){
        super(404,`id:${id},not found`);
    }
}
export default NotFoundException