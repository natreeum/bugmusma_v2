const axios = require('axios');
const { api, bugcityApiKey } = require('../envVariables');
class BankManager {
  async depositBTC(userId, amount) {
    if (!userId || !amount) {
      console.log('Wrong Params');
      return;
    }
    const body = {
      storageName: 'BUGkshireHathaway',
      amount: String(amount),
      userId,
      token: bugcityApiKey,
      memo: 'deposit to BUGkshireHathaway',
    };
    await axios({
      method: 'post',
      url: `${api}/bugcity/storage/deposit`,
      data: body,
    })
      .then((res) => {
        if (res.data.data.state === 'success') {
          console.log(`deposit SUCCESS, ${userId} : ${amount} BTC`);
        } else {
          console.log(`deposit FAILED, ${userId} : ${amount} BTC`);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }
  async withdrawBTC(userId, amount) {
    if (!userId || !amount) {
      console.log('Wrong Params');
      return;
    }
    const body = {
      storageName: 'BUGkshireHathaway',
      amount: String(amount),
      userId,
      token: bugcityApiKey,
      memo: 'deposit to BUGkshireHathaway',
    };
    await axios({
      method: 'post',
      url: `${api}/bugcity/storage/withdraw`,
      data: body,
    }).then((res) => {
      if (res.data.data.state === 'success') {
        console.log(`withdraw SUCCESS, ${userId} : ${amount} BTC`);
      } else {
        console.log(`withdraw FAILED, ${userId} : ${amount} BTC`);
      }
    });
  }
  async getBalance(userId) {
    if (!userId) {
      console.log('Wrong Params');
      return;
    }
    return await axios({
      method: 'get',
      url: `${api}/v2/users/${userId}/points/bugtc`,
      headers: {
        'X-Auth-Token': bugcityApiKey,
      },
    }).then((res) => res.data.point.current);
  }
}

module.exports = BankManager;
