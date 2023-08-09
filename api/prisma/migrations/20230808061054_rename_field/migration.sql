/*
  Warnings:

  - You are about to drop the column `firstname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - Added the required column `deviceToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" RENAME COLUMN "firstname" TO "firstName";
ALTER TABLE "User" RENAME COLUMN "lastname" TO "lastName";
ALTER TABLE "User" RENAME COLUMN "token" TO "deviceToken";
