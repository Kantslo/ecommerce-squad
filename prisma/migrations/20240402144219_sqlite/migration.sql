/*
  Warnings:

  - Added the required column `productId` to the `DownloadVerification` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DownloadVerification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT NOT NULL,
    CONSTRAINT "DownloadVerification_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DownloadVerification" ("createdAt", "expiresAt", "id") SELECT "createdAt", "expiresAt", "id" FROM "DownloadVerification";
DROP TABLE "DownloadVerification";
ALTER TABLE "new_DownloadVerification" RENAME TO "DownloadVerification";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
