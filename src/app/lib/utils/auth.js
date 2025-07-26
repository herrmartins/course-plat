import { getUserModel } from "@/app/models/User";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const username = credentials.username;
        const password = credentials.password;

        if (!username || !password) {
          return null;
        }

        const User = await getUserModel();
        const user = await User.findOne({
          username: credentials.username,
        }).lean();

        if (!user) {
          console.log("No user found with that username.");
          return null;
        }
        
        if (!user.passwordHash) {
          console.log("User found, but no password is set.");
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (isPasswordValid) {
          return {
            id: user._id.toString(),
            name: user.fullName || user.username,
            email: user.email,
            roles: user.roles,
          };
        } else {
          console.log("Password validation failed.");
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.roles = token.roles;
      }
      return session;
    },
  },
});