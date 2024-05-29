/**
 * @Author: huweijian
 * @Date: 2024-05-23 15:45:25
 * @Desc: 操作user表
 */
'use server';

import prisma from '@/app/lib/prisma';
/**
 * 查询用户列表
 * @param id 
 * @returns 
 */
export async function searchUsers(){
  try {
    const res = await prisma.user.findMany({
      select: {
        id: true,
        name: true
      },
    })
    return res
  } catch (error:any) {
    throw new Error(`查询用户列表失败-${error.message}`)
  }
}

/**
 * 查询用户信息
 * @param id 
 * @returns 
 */
export async function searchUserInfo(id: number) {
  if (!id) return {}
  try {
    const res = await prisma.user.findFirst({where: {id}})
    return res
  } catch (error) {
    console.error(error)
    throw new Error('查询用户信息失败')
  }
}

/**
 * 创建用户
 * @param name string
 * @returns 
 */
export async function createUser(name: string){
  try {
    const res = await prisma.user.create({data: {
      name
    },select: {id: true}})
    return res
  } catch (error) {
    console.error(error)
    throw new Error('创建用户失败')
  }
}