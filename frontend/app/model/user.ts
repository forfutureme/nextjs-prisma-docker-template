/**
 * @Author: huweijian
 * @Date: 2024-05-23 21:06:40
 * @Desc: 获取数据
 */
import prisma from "@/app/lib/prisma";

export async function getUserList(){
  try {
    console.log('getUserList-请求数据')
    const res = await prisma.user.findMany()
    return res
  } catch (error) {
    // console.log(error)
    
    console.error("查询用户列表失败");
    return error
  }
}
