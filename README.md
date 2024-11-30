
# NextJS 15 App Router Boilerplate
## Description
This boilerplate use...

- User auth and session management using [Auth.js (next-auth@beta)](https://authjs.dev/)
- Database using [Supabase](https://supabase.com/)
- ORM using [Prisma](https://www.prisma.io/)
- Server state management using [Tanstack Query(v5)](https://tanstack.com/query/latest/docs/framework/react/overview)
- CSS framework using [TailwindCSS](https://tailwindcss.com/)
- UI component library using [Shadcn UI](https://ui.shadcn.com/)
- Deployment using [Vercel](https://vercel.com/)
- Package manager using [pnpm](https://pnpm.io/)
- Bundler using [Turbopack](https://turbopack.dev/)

## Folder Structure
```
├── app
│   ├── api
│   │   └── auth
│   │       └── [...nextauth]
│   │           └── route.ts
│   └── fonts
├── components
├── hooks
│   └── mutate
│   └── query
├── lib
│   └── prisma-client.ts
├── prisma
│   └── schema.prisma
├── public
├── types
├── middleware.ts
└── auth.ts
```
- `api`: for route handler in nextjs
- `components`: for common or route-specific components
- `hooks`: for custom hook, mutate hook, query hook
- `lib`: for reusable function
- `types`: for commont types
- `middleware.ts, auth.ts`: required for next-auth(if you don't use next-auth, you can modify middleware.ts and remove auth.ts)

## Environment Variables
```md
# If you use Next Auth (Auth.js)
AUTH_SECRET="Your auth secret" # Added by `npx auth secret`. Read more: https://cli.authjs.dev
AUTH_URL="Your auth url"
# If you use Next Auth Provider Google, Github Sample
AUTH_GOOGLE_ID="Your Google Client ID"
AUTH_GOOGLE_SECRET="Your Google Client Secret"
AUTH_GITHUB_ID="Your Github Client ID"
AUTH_GITHUB_SECRET="Your Github Client Secret"

# Prisma 
DATABASE_URL="Your Supabase Database URL"
DIRECT_URL="Your Supabase Direct URL"

# Supabase
NEXT_PUBLIC_SUPABASE_PROJECT_URL="Your Supabase Project URL"
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY="Your Supabase Service Role Key"
NEXT_PUBLIC_SUPABASE_ANON_KEY="Your Supabase Anon Key"
NEXT_PUBLIC_SUPABASE_JWT_SECRET="Your Supabase JWT Secret"
```

## Installation
1. Clone this repo
2. Create your own `.env` file be referring to `.env.sample`
3. Run the command below
```bash
pnpm install
```
### ⛔️ An error may occur...
```
Error: 
You don't have any models defined in your schema.prisma, so nothing will be generated.
You can define a model like this:

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```
After Step 3, the above error may occur. This is caused by the `postinstall` script because there is no table in the schema of your currently connected supabase. 
If you create a table, this error will not occur.

## Additional Notes
If you don't use **Auth.js(next-auth)**, you can delete below files
- `app/api/auth/[...nextauth]/route.ts` (or delete api folder)
- `auth.ts`
- `middleware.ts`

If you don't use **prisma**, you can delete below files, dependencies 
- prisma/schema.prisma (file)
- @prisma/client (dependency)
- prisma (devDependency)

If you don't use **Modal Context & Provider**, you can delete below files
- `app/providers.tsx` (associated with Modal Context & Provider)
- `components/modal.tsx`
- `types/modal.types.ts`

Be aware of the **custom scripts** in package.json
- db-update: For pulling table from Supabase and generating prisma schema
- gen-type: For generating table(or schema) types from Supabase

For vercel deployment, you need to change regions (or delete files)
```json
{
    "regions": ["icn1"] // your prefered region
}
```

you can modify tanstack query configuration in...
- `app/providers.tsx`
- `getQueryClient.ts` (for singleton query client)

you should import prisma client from `@/lib/prisma-client` or an error will occur in deployment
