import { existsSync, lstatSync, unlinkSync, symlinkSync } from 'node:fs';
import path from 'node:path';
const { dirname, relative, realpathSync, resolve } = path;

const prismaClientLogical = resolve('node_modules', '@prisma', 'client');
if (!existsSync(prismaClientLogical)) {
  process.exit(0);
}

let prismaClientPhysical;
try {
  prismaClientPhysical = realpathSync(prismaClientLogical);
} catch {
  process.exit(0);
}

const prismaDirPhysical = resolve(prismaClientPhysical, '..', '..', '.prisma');
if (!existsSync(prismaDirPhysical)) {
  console.warn('Prisma symlink fixer: target .prisma directory not found at', prismaDirPhysical);
  process.exit(0);
}

const linkPhysical = resolve(prismaClientPhysical, '.prisma');
const relativeTarget = relative(dirname(linkPhysical), prismaDirPhysical);

try {
  if (existsSync(linkPhysical) || (lstatSync(linkPhysical)?.isSymbolicLink())) {
    unlinkSync(linkPhysical);
  }
} catch {
  // Ignore cleanup errors.
}

symlinkSync(relativeTarget, linkPhysical);
console.log('Prisma symlink fixer created:', linkPhysical, '→', relativeTarget);
