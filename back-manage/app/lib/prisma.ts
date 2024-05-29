/**
 * @Author: huweijian
 * @Date: 2024-04-23 13:19:19
 * @Desc: 初始化prisma
 */
import { PrismaClient } from '@prisma/client';
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
