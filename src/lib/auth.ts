import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Find user by email
        const user = await db.user.findUnique({
          where: {
            email: String(credentials.email)
          }
        })

        if (!user) {
          return null
        }

        // For demo: Accept any password (REMOVE THIS IN PRODUCTION)
        // In production, you should verify password with bcrypt
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role || "user"
        }
      }
    )
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          role: (user as any).role,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...token,
        }
      }
    }
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login"
  }
}
