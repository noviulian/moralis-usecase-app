import { moralis } from '@/configs/moralis';
import NextAuth, { SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'MoralisAuth',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials: any) {
        if (!credentials) return null;
        try {
          const { message, signature } = credentials;



          const results = await moralis.authApi.verify({
            message,
            signature,
            network: 'evm',
          });
          const { address, profileId, id, expirationTime } = results.raw;

          const user = {
            id,
            address,
            profileId,
            signature,
            expirationTime,
          };
          
          return user;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // TODO: fix the type later
    // @ts-ignore
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    // TODO: fix the type later
    // @ts-ignore
    async session({ session, token }) {
      session.expires = token.user.expirationTime;
      session.user = token.user;
      return session;
    },
  },
  session: { strategy: 'jwt' as SessionStrategy },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
