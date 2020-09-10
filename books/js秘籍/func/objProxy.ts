/**
 * getter 与 setter模拟私有属性
 */

import { report } from "../util";

 function Ninja(){
     let skillLevel;

     this.getSkillLevel=()=>skillLevel
     
     this.setSkillLevel=value=>{
         skillLevel=value;
     }
 }

 const nameCollection={
     names:['cc','wgs'],
     get firstName(){
         return this.names[0]
     },
     set firstName(value){
         this.name[0]=value;
     }
 }

 /**
  * es6 class 版本
  */

  class NameCollection{
    private names=[]
    constructor(){
        this.names=['cc','wgs'];
    }
    get firstName(){
        return this.names[0]
    }
    set firstName(value){
        this.names[0]=value;
    }
  }
  const nameCollection1=new NameCollection();

  /**
   * 代理（proxy)
   * 1. 代理是通用化的setter与 getter,区别在于每个setter与getter仅能控制单个对象
   * 代理用于对象交互的通用处理 
   */

   /**
    * 记录日志
    */
   function makeLoggable(target){
       return new Proxy(target,{
           get:(target,property)=>{
               report(`Writing value to ${String(property)}`)
               return target[property];
           },
           set:(target,property,value)=>{
               target[property] = value
            }
       });
   }