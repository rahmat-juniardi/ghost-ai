import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL ?? "";

  if (databaseUrl.startsWith("prisma+postgres://")) {
    // Accelerate connection — wraps the Accelerate URL in PrismaPg adapter.
    // When using Accelerate in production, also attach the accelerate extension:
    //   import { accelerate } from "@prisma/extension-accelerate";
    //   client = base.$extends(accelerate);
    const adapter = new PrismaPg(databaseUrl);
    return new PrismaClient({ adapter });
  }

  // Direct connection via @prisma/adapter-pg
  const adapter = new PrismaPg(databaseUrl);
  return new PrismaClient({ adapter });
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
