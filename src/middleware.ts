import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { unShortenServiceByFetch } from "./service/unShorten";

const reg = /.+\/r\/(\w+)/

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    // unit test
    const shortenUrl = request.url.replace(reg, '$1')
    if (shortenUrl) {
      const { originUrl } = await unShortenServiceByFetch(shortenUrl)
      console.log(originUrl)    
      return NextResponse.redirect(originUrl);
    } else {
      throw new Error('ShortenUrl is invalid')
    }
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/r/:path*",
};
