---
title: 'Security'
date: '2020-12-09'
author: ''
---

# Considerations when building on Elite Swap

There are two primary categories of risk associated with Elit Swap. The first involves so-called "static" errors: accidentally sending too many tokens to a pair during a swap (or requesting too few tokens back), allowing transactions to linger in the mempool long enough for the sender's expectations about prices to no longer be true, etc. These errors are typically addressed with fairly straightforward logic checks. _Performing these checks is the primary reason for the existence of routers_. Those who interact directly with pairs must perform these checks themselves.

The second risk category is "dynamic", and involves runtime pricing. Because Ethereum transactions occur in an adversarial environment, naively written smart contracts _can be exploited for profit_. For example, if a smart contract checks the asset ratio in a Elite Swap pool at runtime and trades against it, assuming that the ratio represents the "fair" or "market" price of these assets, _it is highly vulnerable to manipulation_. A malicious actor could e.g. trivially insert transactions before and after the naive transaction (a so-called "sandwich" attack) causing the smart contract to trade at a radically worse price, profit from this at the trader's expense, and then return the contracts to their original state, all at a low cost. One important caveat is that these types of attacks are mitigated by trading in extremely liquid pools, and/or at low values.

The best way to protect against these attacks is to introduce a price oracle. The best "oracle" is simply _traders' off-chain observation of the prevailing price_, which can be passed into the trade as a safety check. This strategy is best suited to retail trading venues _where users initiate trades on their own behalf_. However, it is often the case that a trusted price observation cannot be obtained (e.g. in multi-step, programmatic interactions involving Elite Swap). Without a price oracle, these interactions are forced to trade at whatever the (potentially manipulated) rate on Elite Swap is. However, an oracle can bound manipulation, and is a sine qua non.
