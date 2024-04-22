/**
 * 要发送令牌、发送 NFTS 或读取和写入数据 Solana，您需要自己的密钥对。
 * 要创建新的密钥对，请使用@solana/web3.js中的 Keypair.generate()函数
 */

import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log(`The public key is: `, keypair.publicKey.toBase58());
console.log(`The secret key is: `, keypair.secretKey);
console.log(`✅ Finished!`);