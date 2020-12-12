---
title: 'FAQ'
date: '2020-12-08'
author: ''
---

<Info>Didn't find an answer? Join the <a href="https://discord.gg/yFsjhuQ7Kj">community Discord</a> to get support</Info>

# What is Elite Swap?

Elite Swap is a protocol for exchanging ERC-20 tokens on Ethereum. It eliminates trusted intermediaries and unnecessary forms of rent extraction, allowing for fast, efficient trading. Where it makes tradeoffs decentralization, censorship resistance, and security are prioritized. Elite Swap is open-source software licensed under GPL.

# How does Elite Swap work?

Elite Swap is an automated liquidity protocol. In practical terms this means there are template smart contracts that define a standard way to make liquidity pools and corresponding markets that are compatible with eachother. There is no orderbook, no centralized party and no central facilitator of trade. Each pool is defined by a smart contract that includes a few functions to enable swapping tokens, adding liquidity and more. At its core each pool uses the function `x*y=k` to maintain a curve along which trades can happen.

# How are prices determined?

Prices are determined by the amount of each token in a pool. The smart contract maintains a constant using the following function: `x*y=k`. In this case `x = token0`, `y = token1`, `k = constant`. For each trade a certain amount of tokens are removed from the pool for an amount of the other token. To maintain `k`, the balances held by the smart contract are adjusted during the execution of the trade, therefore changing the price.

# Why is my swap failing or stuck?

You might be trying to swap a fee on transfer or deflationary token. If so, you have to increase your allowed slippage to account for the fee taken during the swap. Click on the gear for settings and adjust Slippage tolerance accordingly.

Otherwise if your transaction is taking forever or stuck pending the gas included might be too low and the transaction will not be processed. You probably need to speed up or cancel the transaction in you wallet.

- Fix stuck transactions in MetaMask: [https://metamask.zendesk.com/hc/en-us/articles/360015489251-How-to-Speed-Up-or-Cancel-a-Pending-Transaction](https://metamask.zendesk.com/hc/en-us/articles/360015489251-How-to-Speed-Up-or-Cancel-a-Pending-Transaction)

- Fix stuck transactions in trust wallet: [https://www.publish0x.com/the-crypt/quick-guide-to-fixing-stuck-ethereum-transactions-xgdvgkv](https://www.publish0x.com/the-crypt/quick-guide-to-fixing-stuck-ethereum-transactions-xgdvgkv)

# Why is my approve stuck?

If you speed up an approve, Elite Swap can't detect the new transaction. Open your wallet in the interface and click "clear all" then try refreshing the page.

# How do I find X token?

If you can't find a token in the default list, find the token address using etherscan and paste that address into the search field.

# How do I add a logo for a token?

Elite Swap pulls from the trustwallet asset repository on github. [https://github.com/trustwallet/assets](https://github.com/trustwallet/assets) Add your token icon to that repo and it will appear on the frontend and on info.

# How can I add a token to Elite Swap?

Elite Swap is compatible with any ERC-20 token in the ethereum ecosystem. If you want your project to be searchable in their interface you should seek to be added to a reputable token list or share a link to your token using query parameters. Once loaded via link, the token will be added to their interface.

Another option is to open a request using github [issues](https://github.com/EthereumEliteswap/eliteswap-interface/issues/new?assignees=&labels=token+request&template=token-request.md&title=).

The Elite Swap team makes no guarantees or provides any timeline.

# Why does my transaction cost X?

Ethereum requires gas to execute each transaction. You can also check ETH gas station for the current prices required to complete transactions. Creating a Elite Swap pool is a slightly costlier transaction because you are executing a more complex smart contract. Read more about how gas works in ethereum.

# What is the liquidity provider fees?

There is a **0.3%** fee for swapping tokens. **This fee is split by liquidity providers proportional to their contribution to liquidity reserves.**

Swapping fees are immediately deposited into liquidity reserves. This increases the value of liquidity tokens, functioning as a payout to all liquidity providers proportional to their share of the pool. Fees are collected by burning liquidity tokens to remove a proportional share of the underlying reserves.

Since fees are added to liquidity pools, the invariant increases at the end of every trade. Within a single transaction, the invariant represents `token0_pool / token1_pool` at the end of the previous transaction.

# What is the protocol fees?

At the moment there are no protocol fees.

# How are prices determined?

Each pair on Elite Swap is actually underpinned by a liquidity pool. Liquidity pools are smart contracts that hold balances of two unique tokens and enforces rules around depositing and withdrawing them. The primary rule is the constant product formula (x * y = k). When a token is withdrawn (bought), a proportional amount must be deposited (sold) to maintain the constant. The ratio of tokens in the pool, in combination with the constant product formula, ultimately determine the price that a swap executes at.

When swapping tokens on Elite Swap, it's common to want to receive as many output tokens as possible for an _exact input amount_, or to pay as few input tokens as possible for an _exact output amount_. In order to calculate these amounts, a contract must look up the _current reserves_ of a pair, in order to understand what the current price is. However, it is _not safe to perform this lookup and rely on the results without access to an external price_.

Say a smart contract naively wants to send 10 DAI to the DAI/WETH pair and receive as much WETH as it can get, given the current reserve ratio. If, when called, the naive smart contract simply looks up the current price and executes the trade, it is _vulnerable to front-running and will likely suffer an economic loss_. To see why, consider a malicious actor who sees this transaction before it is confirmed. They could execute a swap which dramatically changes the DAI/WETH price immediately before the naive swap goes through, wait for the naive swap to execute at a bad rate, and then swap to change the price back to what it was before the naive swap. This attack is fairly cheap and low-risk, and can typically be performed for a profit.

To prevent these types of attacks, it's vital to submit swaps _that have access to knowledge about the "fair" price their swap should execute at_. In other words, swaps need access to an _oracle_, to be sure that the best execution they can get from Elite Swap is close enough to what the oracle considers the "true" price. While this may sound complicated, the oracle can be as simple as an _off-chain observation of the current market price of a pair_. Because of arbitrage, it's typically the case that the ratio of the intra-block reserves of a pair is close to the "true" market price. So, if a user submits a trade with this knowledge in mind, they can ensure that the losses due to front-running are tightly bounded. This is how, for example, the Elite Swap frontend ensure trade safety. It calculates the optimal input/output amounts given observed intra-block prices, and uses the router to perform the swap, which guarantees the swap will execute at a rate no less that `x`% worse than the observed intra-block rate, where `x` is a user-specified slippage tolerance (0.5% by default).

# I updated my token via a proxy contract, but the Elite Swap information page is showing the old symbol / name!

[Elite Swap Info](https://eliteswap.io/info) reads the details of new tokens when they're added to the subgraph. There may be some circumstances where an old symbol or name isn't updated if the token was updated with a proxy contract.
