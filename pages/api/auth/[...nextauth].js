import NextAuth from "next-auth"
// import AppleProvider from "next-auth/providers/apple"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import mongoose from "mongoose"


export default NextAuth({
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(mongoose.connection.getClient()),
  providers: [
    // // OAuth authentication providers
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Sign in with passwordless email link
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // theme: {
  //   colorScheme: "auto", // "auto" | "dark" | "light"
  //   brandColor: "", // Hex color code
  //   logo: "" // Absolute URL to image
  // }
})