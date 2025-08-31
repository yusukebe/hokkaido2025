type Shop = {
  id: string
  name: string
  taste: '家系' | '醤油' | '味噌' | '煮干し'
  rate: number
}

export const index: { shops: Shop[] } = {
  shops: [
    {
      id: 'yoshimuraya',
      name: '吉村家',
      taste: '家系',
      rate: 5
    },
    {
      id: 'sugitaya',
      name: '杉田家',
      taste: '家系',
      rate: 4
    },
    {
      id: 'takasagoya',
      name: 'たかさご家',
      taste: '家系',
      rate: 5
    },
    {
      id: 'jyoujyouya',
      name: '上々家',
      taste: '家系',
      rate: 3
    },
    {
      id: 'torakichiya',
      name: 'とらきち家',
      taste: '家系',
      rate: 2
    },
    {
      id: 'rasuta',
      name: 'らすた',
      taste: '家系',
      rate: 4
    },
    {
      id: 'rokkakuya-totsuka',
      name: '六角家 戸塚店',
      taste: '家系',
      rate: 1
    },
    {
      id: 'ishinshouten',
      name: '維新商店',
      taste: '醤油',
      rate: 4
    },
    {
      id: 'koguma',
      name: '札幌ラーメン こぐま',
      taste: '味噌',
      rate: 4
    },
    {
      id: 'matsuya',
      name: 'らーめん まつや',
      taste: '煮干し',
      rate: 3
    }
  ]
}

type Details = {
  address: string
  photos: Photo[]
}

type Photo = {
  name: string
  width: number
  height: number
  authorId: string
  url: string
}

export const details: Record<string, Details> = {
  yoshimuraya: {
    address: '神奈川県横浜市西区岡野１丁目６−４',
    photos: [
      {
        name: 'yoshimuraya-001.jpg',
        width: 1200,
        height: 900,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/yoshimuraya/yoshimuraya-001.jpg'
      }
    ]
  },
  sugitaya: {
    address: '神奈川県横浜市磯子区新杉田町３−５',
    photos: [
      {
        name: 'sugitaya-001.jpg',
        width: 1200,
        height: 900,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/sugitaya/sugitaya-001.jpg'
      }
    ]
  },
  takasagoya: {
    address: '神奈川県横浜市中区常盤町２丁目１４ １階',
    photos: [
      {
        name: 'takasagoya-001.jpg',
        width: 1200,
        height: 900,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/takasagoya/takasagoya-001.jpg'
      }
    ]
  },
  jyoujyouya: {
    address: '東京都大田区萩中３丁目４−４',
    photos: [
      {
        name: 'jyoujyouya-001.jpg',
        width: 1200,
        height: 900,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/jyoujyouya/jyoujyouya-001.jpg'
      }
    ]
  },
  torakichiya: {
    address: '神奈川県横浜市神奈川区西神奈川3-1-1',
    photos: [
      {
        name: 'torakichiya-001.jpg',
        width: 1200,
        height: 900,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/torakichiya/torakichiya-001.jpg'
      },
      {
        name: 'torakichiya-002.jpg',
        width: 1200,
        height: 900,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/torakichiya/torakichiya-002.jpg'
      }
    ]
  },
  rasuta: {
    address: '神奈川県横浜市港北区日吉本町1-5-41 坂口屋日吉ビル　１Ｆ',
    photos: [
      {
        name: 'rasuta-001.jpg',
        width: 1200,
        height: 900,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/rasuta/rasuta-001.jpg'
      }
    ]
  },
  'rokkakuya-totsuka': {
    address: '神奈川県横浜市戸塚区戸塚町16-1 トツカーナモールGARDEN 1F',
    photos: [
      {
        name: 'rokkakuya-totsuka-001.jpg',
        width: 1200,
        height: 900,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/rokkakuya-totsuka/rokkakuya-totsuka-001.jpg'
      },
      {
        name: 'rokkakuya-totsuka-002.jpg',
        width: 1200,
        height: 900,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/rokkakuya-totsuka/rokkakuya-totsuka-002.jpg'
      },
      {
        name: 'rokkakuya-totsuka-003.jpg',
        width: 1200,
        height: 900,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/rokkakuya-totsuka/rokkakuya-totsuka-003.jpg'
      },
      {
        name: 'rokkakuya-totsuka-004.jpg',
        width: 1200,
        height: 900,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/rokkakuya-totsuka/rokkakuya-totsuka-004.jpg'
      }
    ]
  },
  ishinshouten: {
    address: '神奈川県横浜市西区北幸２丁目１０−２１ 横浜太陽ビル 1f',
    photos: [
      {
        name: 'ishinshouten-001.jpg',
        width: 1200,
        height: 900,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/ishinshouten/ishinshouten-001.jpg'
      }
    ]
  },
  koguma: {
    address: '神奈川県藤沢市藤沢１１０ 遊行通り５-１１０',
    photos: [
      {
        name: 'koguma-001.jpg',
        width: 1200,
        height: 900,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/koguma/koguma-001.jpg'
      }
    ]
  },
  matsuya: {
    address: '神奈川県茅ケ崎市堤７３−５',
    photos: [
      {
        name: 'matsuya-001.jpg',
        width: 1200,
        height: 900,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/matsuya/matsuya-001.jpg'
      },
      {
        name: 'matsuya-002.jpg',
        width: 800,
        height: 600,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/matsuya/matsuya-002.jpg'
      },
      {
        name: 'matsuya-003.jpg',
        width: 800,
        height: 600,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/matsuya/matsuya-003.jpg'
      },
      {
        name: 'matsuya-004.jpg',
        width: 800,
        height: 600,
        authorId: 'yusukebe',
        url: 'https://ramen-api.dev/images/matsuya/matsuya-004.jpg'
      }
    ]
  }
}
