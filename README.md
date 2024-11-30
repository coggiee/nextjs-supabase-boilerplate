If you don't use next-auth, you can delete below files
- app/api/auth/[...nextauth]/route.ts (or delete api folder)
- auth.ts
- middleware.ts

If you don't use prisma, you can delete below files, dependencies 
- prisma/schema.prisma (file)
- @prisma/client (dependency)
- prisma (devDependency)


