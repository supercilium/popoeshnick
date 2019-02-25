const validUser = {
  email: 'alkash@top.one',
  password: 'buhlishko',
  session: 'de847348-f3b3-4da1-93ce-4dd7a7db11c4',
};

const alkashProfile = {
  name: 'Vasya',
  email: 'alkash@top.one',
  lygrylity: 12,
  rank: 'Newbie',
  popoykaList: [
    {
      dateStart: '2019-02-25T04:06:10.570Z',
      dateEnd: '2019-02-26T04:06:10.570Z',
      location: 'outdoor',
      budget: 3000,
      currency: 'RUR',
      mode: 'single',
      lygrylityAmount: 30,
      note: 'string note',
      buhlishkoList: [
        {
          name: 'wine',
          amount: 0.7,
          lygrylity: 4,
        },
      ],
    },
  ],
};

module.exports = { validUser, alkashProfile };
