import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
  } from "@solana/web3.js";
  import "dotenv/config"
  import { getKeypairFromEnvironment } from "@solana-developers/helpers";
  
  const suppliedToPubkey = process.argv[2] || null;
  
  if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    // 通常情况下，process.exit() 用于在程序达到某个条件时，无论是正常情况下还是异常情况下，立即退出程序。例如，在处理一个错误时，你可能会调用 process.exit(1) 来表示程序退出并返回一个非零的状态码，表示程序执行失败。
    // process.exit() 的调用是同步的，这意味着它会立即终止当前的 Node.js 进程，而不会等待当前事件循环中的任务完成。因此，在调用 process.exit() 后，不会执行任何后续的代码。
    process.exit(1);
  }
  
  const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
  
  console.log(`suppliedToPubkey: ${suppliedToPubkey}`);
  
  const toPubkey = new PublicKey(suppliedToPubkey);
  
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  
  console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
  );


  /**
   * 创建事务
   */

  // @solana/web3.js提供了用于创建事务和指令的辅助函数。您可以使用构造函数new Transaction()创建一个新事务。
  // 创建后，您可以使用add()方法向交易添加指令
  const transaction = new Transaction();
  
  const LAMPORTS_TO_SEND = 5000;
  
  // 这些辅助函数之一是SystemProgram.transfer() ，它为SystemProgram发出一条指令来传输一些 SOL：
  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
  });
  
  transaction.add(sendSolInstruction);
  
  // 添加所有指令后，需要将事务发送到集群并确认
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
  ]);
  
  console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
  );
  console.log(`Transaction signature is ${signature}!`);

  /**
   * 交易费用内置于 Solana 经济中，作为对验证器网络处理交易所需的 CPU 和 GPU 资源的补偿。 Solana 交易费用是确定性的。
   * 交易签名者数组中包含的第一个签名者负责支付交易费用。如果该签名者的帐户中没有足够的 SOL 来支付交易费用，则交易将被丢弃，并出现如下错误：
   * Transaction simulation failed: Attempt to debit an account but found no record of a prior credit.
   * 如果您收到此错误，那是因为您的密钥对是全新的，并且没有任何 SOL 来支付交易费用。让我们在设置连接后添加以下几行来解决此问题：
        await airdropIfRequired(
        connection,
        keypair.publicKey,
        1 * LAMPORTS_PER_SOL,
        0.5 * LAMPORTS_PER_SOL,
        );
    * 这会将 1 SOL 存入您的帐户，您可以将其用于测试。这在主网上不起作用，而它实际上具有价值。但对于本地和 Devnet 上的测试来说，它非常方便。
    * 您还可以在测试时使用 Solana CLI 命令solana airdrop 1在您的帐户中获取免费的测试 SOL，无论是在本地还是在 devnet 上。
   */

    // 转移需要多少 SOL？这是多少美元？

    // 您可以在https://explorer.solana.com上找到您的交易吗？请记住我们正在使用devnet网络。
    
    // 转账需要多长时间？
    
    // 您认为“确认”是什么意思？