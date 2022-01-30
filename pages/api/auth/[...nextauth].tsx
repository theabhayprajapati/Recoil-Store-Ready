import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      // @ts-ignore
      clientId: '369756692669-l5eh68f0633gk8n4p3s122jvsdh76p57.apps.googleusercontent.com',
      // @ts-ignore
      clientSecret: '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',
    }),
    // ...add more providers here
  ],
})