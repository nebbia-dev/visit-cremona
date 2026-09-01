import 'server-only';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.NEXT_SESSION_SECRET;

function getEncodedKey() {
    if (!secretKey) {
        throw new Error('NEXT_SESSION_SECRET is not configured');
    }

    return new TextEncoder().encode(secretKey);
}

export async function encrypt(payload: JWTPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(getEncodedKey())
}

export async function decrypt<T extends JWTPayload>(
    session: string | undefined = '',
) {
    if(!session) {
        return undefined;
    }

    try {
        const { payload } = await jwtVerify(session, getEncodedKey(), {
            algorithms: ['HS256'],
        })
        return payload as T
    } catch {
        console.log('Failed to verify session')
    }
}
