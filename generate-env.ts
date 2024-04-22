/**
 * 从 .env 文件加载现有密钥对 为了确保您的密钥安全，我们建议使用.env文件注入密钥：
 * 使用您之前创建的密钥的内容创建一个名为.env的新文件：
 * 
 * 如果您已有想要使用的密钥对，则可以从文件系统或.env文件中存储的现有密钥加载密钥对。在node.js中， @solana-developers/helpers npm包包含一些额外的功能：
 * npm i @solana-developers/helpers
 * 使用.env文件，请使用getKeypairFromEnvironment()
 * 使用 Solana CLI 文件，请使用getKeypairFromFile()
 */

import "dotenv/config"
import { getKeypairFromEnvironment, getKeypairFromFile } from "@solana-developers/helpers";

const keypair = getKeypairFromEnvironment("SECRET_KEY");
const keypair_copy = getKeypairFromFile("File-path");

console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`
);