/**
 * @Author: huweijian
 * @Date: 2024-05-24 12:21:05
 * @Desc: action user
 */
'use server'
import { revalidatePath } from 'next/cache';
import prisma from "@/app/lib/prisma";

export async function actionToAddUser(fromData: FormData){
  const name = fromData.get('name') as string
  if (!name) return
  try {
    await prisma.user.create({data: {name}})
    revalidatePath('/')
  } catch (error) {
    console.error(error)
    throw new Error("创建用户失败");
  }
}
