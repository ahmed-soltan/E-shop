import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../libs/prismadb";
import bcrypt from "bcrypt";

export const nextOptions : AuthOptions={
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string }) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Email and password are required.");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return console.log("User not found")
        }
        
        // Check if user.hashedPassword is null before comparing
        if (!user.hashedPassword) {
          return console.log("User password not set.")
        }

        const correctPassword = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!correctPassword) {
          throw new Error("Incorrect password.");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
}
export default NextAuth(
  nextOptions
);
