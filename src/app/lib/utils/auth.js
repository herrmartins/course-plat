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
          console.error("Authorize function: Missing username or password.");
          return null;
        }

        const User = await getUserModel();
        const user = await User.findOne({
          username: credentials.username,
        }).lean();
        console.log("usuário achado", user);

        if (!user.passwordHash) {
          console.error(
            `Authorize function: User '${username}' has no password hash stored.`
          );
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.passwordHash
        );

        console.log("Senha válida: ", isPasswordValid);

        if (isPasswordValid) {
          console.log(
            `Authorize function: Password valid for user '${username}'.`
          );
          return {
            id: user._id.toString(),
            name: user.fullName || user.username,
            email: user.email,
            role: user.role,
          };
        } else {
          console.log(
            `Authorize function: Invalid password for user '${username}'.`
          );
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
