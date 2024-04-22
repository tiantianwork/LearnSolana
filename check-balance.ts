/**
 * 我们使用名为@solana/web3.js的 npm 包来完成 Solana 的大部分工作。我们还将安装 TypeScript 和esrun，以便我们可以在命令行上运行.ts文件：
 * npm install typescript @solana/web3.js esrun
 * 
 * 使用@solana/web3.js与 Solana 网络的每次交互都将通过Connection对象进行。 Connection对象与特定 Solana 网络（称为“集群” ）建立连接。
 * 现在我们将使用Devnet集群而不是Mainnet。Devnet是为开发人员使用和测试而设计的，DevNet代币没有真正的价值。
 */

import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
console.log(`✅ Connected!`);


/**
 * 从网络读取账户余额
 */
const address = new PublicKey('CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN');
const balance = await connection.getBalance(address);

console.log(`The balance of the account at ${address} is ${balance} lamports`); 
console.log(`✅ Finished!`)


/**
 * 如前所述，返回的余额位于lamports中。 Web3.js 提供了常量LAMPORTS_PER_SOL用于将 Lamports 显示为 SOL：
 */
const balanceInSol = balance / LAMPORTS_PER_SOL;

console.log(`The balance of the account at ${address} is ${balanceInSol} SOL`); 
console.log(`✅ Finished!`)