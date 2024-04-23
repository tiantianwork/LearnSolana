npm init -y

npm install typescript @solana/web3.js esrun @solana-developers/helpers

npx generate-keypair.ts // 创建公钥私钥
npx generate-env.ts // 本地读取私钥

npx esrun check-balance.ts                         // 从网络读取账户余额
npx esrun check-balance2.ts                        // 从网络读取账户余额
npx esrun check-balance3.ts (some wallet address)  // 从网络读取账户余额-命令行

npx esrun transfer.ts (destination wallet address) // 发送数据到网络