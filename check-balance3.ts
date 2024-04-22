import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];  //  这行代码是在 Node.js 中使用 process.argv 来获取命令行参数的第三个元素，并将其赋值给变量 suppliedPublicKey。具体来说，process.argv[2] 表示获取命令行参数数组中索引为 2 的元素，即第三个命令行参数。这通常用于从命令行中向 Node.js 脚本传递参数。
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const publicKey = new PublicKey(suppliedPublicKey);

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
);

// 添加处理无效钱包地址的说明。
// 修改脚本以连接主网并查找一些著名的 Solana 钱包。尝试toly.sol、shaq.sol或mccann.sol。