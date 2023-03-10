import crypto from 'crypto';

export const hashUserName = (userName:string) => {
    const hash = crypto.createHash('sha256');
    hash.update(userName);
    return hash.digest('hex');
}
