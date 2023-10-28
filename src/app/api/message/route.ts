
import { moralis } from '@/configs/moralis';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  const { address, chain } = await request.json();

  if (!address || !chain) {
    return new Response('Invalid address or chain', { status: 500 });
  }
  try {
    const response = await moralis.authApi.requestMessage({
      address,
      chain,
      networkType: 'evm',
      domain: process.env.APP_DOMAIN as string,
      statement: 'Please sign this message to authenticate.',
      uri: process.env.NEXTAUTH_URL as string,
      timeout: 60,
      notBefore: new Date(Date.now()).toISOString(),
      //   expiration time is 3 days from now
      expirationTime: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    });

    const message = response.raw.message;

    return NextResponse.json(message);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
