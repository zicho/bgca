import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserMetadata(id: string) {
    return await prisma.user.findUnique({
        where: {
            supabase_user_id: id
        }
    })
}

export async function findAssociatedEmail(username: string): Promise<string> {
    let user = await prisma.user.findUnique({
        where: {
            name: username
        }
    })

    if (user == null) return null;

    return user.email ? user.email : null;
}