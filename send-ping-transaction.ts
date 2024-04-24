import * as web3 from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment, airdropIfRequired } from "@solana-developers/helpers";

const payer = getKeypairFromEnvironment('SECRET_KEY')
const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

// 这将连接到 Solana Devnet 并在需要时请求一些测试 Lamport。
const newBalance = await airdropIfRequired(
  connection,
  payer.publicKey,
  1 * web3.LAMPORTS_PER_SOL,
  0.5 * web3.LAMPORTS_PER_SOL,
);

// 这里最具挑战性的部分是在说明中包含正确的信息。我们知道我们正在调用的程序的地址。我们还知道该程序将数据写入一个单独的帐户，我们也知道该帐户的地址。让我们将这两个版本的字符串版本作为常量添加到文件顶部：

const PING_PROGRAM_ADDRESS = new web3.PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa')
const PING_PROGRAM_DATA_ADDRESS =  new web3.PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod')

// 创建交易
// 现在让我们创建一个新交易，然后为程序帐户初始化一个PublicKey ，为数据帐户初始化另一个 PublicKey。
const transaction = new web3.Transaction()
const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS)
const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS)

// 创建指令
// 让我们创建指令。请记住，该指令需要包含 Ping 程序的公钥，还需要包含一个数组，其中包含将读取或写入的所有帐户。在此示例程序中，仅需要上面引用的数据帐户。
const instruction = new web3.TransactionInstruction({
    keys: [
      {
        pubkey: pingProgramDataId,
        isSigner: false,
        isWritable: true
      },
    ],
    programId
  })

// 将指令添加到交易中
// 接下来，让我们将指令添加到我们创建的交易中。然后，通过传入连接、交易和付款人来调用sendAndConfirmTransaction() 。最后，让我们记录该函数调用的结果，以便我们可以在 Solana Explorer 上查找它。
transaction.add(instruction)

const signature = await web3.sendAndConfirmTransaction(
  connection,
  transaction,
  [payer]
)

console.log(`✅ Transaction completed! Signature is ${signature}`)

// 发送交易 npx esrun send-ping-transaction.ts

console.log(`You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

// 继续从头开始创建一个脚本，该脚本将允许您将 SOL 从 Devnet 上的一个帐户转移到另一个帐户。请务必打印出交易签名，以便您可以在 Solana Explorer 上查看它。