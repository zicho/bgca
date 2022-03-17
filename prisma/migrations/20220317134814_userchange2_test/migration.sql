/*
  Warnings:

  - You are about to drop the column `supabase_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[supabase_user_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `supabase_user_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_supabase_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "supabase_id",
ADD COLUMN     "supabase_user_id" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_supabase_user_id_key" ON "User"("supabase_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
