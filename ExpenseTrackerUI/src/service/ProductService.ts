export const ProductService = {
  getProductsData() {
    return [
      {
        id: '1000',
        description: 'Drinks',
        amount: 65,
        date: "2023-01-01",
        category: 'Drinks',
        place: 'Pub Komedija',
        comment: "Negroni and Aperol Spritz"
      },
      {
        id: '1001',
        description: 'Groceries',
        amount: 72,
        date: "1 June",
        category: 'Groceries',
        place: 'Vero',
        comment: "Apple, bread, juice"
      },
      {
        id: '1002',
        description: 'Blue Band',
        amount: 79,
        category: 'Fitness',
      },
      {
        id: '1003',
        description: 'Blue T-Shirt',
        amount: 29,
        category: 'Clothing',
      },
      {
        id: '1004',
        description: 'Bracelet',
        amount: 15,
        category: 'Accessories',
      },
      {
        id: '1005',
        description: 'Brown Purse',
        amount: 120,
        category: 'Accessories',
      },
      {
        id: '1006',
        description: 'Chakra Bracelet',
        amount: 32,
        category: 'Accessories',
      },
      {
        id: '1007',
        description: 'Galaxy Earrings',
        amount: 34,
        category: 'Accessories',
      },
      {
        id: '1008',
        description: 'Game Controller',
        amount: 99,
        category: 'Electronics',
      },
      {
        id: '1009',
        description: 'Gaming Set',
        amount: 299,
        category: 'Electronics',
      },
      {
        id: '1010',
        description: 'Gold Phone Case',
        amount: 24,
        category: 'Accessories',
      },
      {
        id: '1011',
        description: 'Green Earbuds',
        amount: 89,
        category: 'Electronics',
      },
      {
        id: '1012',
        description: 'Green T-Shirt',
        amount: 49,
        category: 'Clothing',
      },
      {
        id: '1013',
        description: 'Grey T-Shirt',
        amount: 48,
        category: 'Clothing',
      },
      {
        id: '1014',
        description: 'Headphones',
        amount: 175,
        category: 'Electronics',
      },
      {
        id: '1015',
        description: 'Light Green T-Shirt',
        amount: 49,
        category: 'Clothing',
      },
      {
        id: '1016',
        description: 'Lime Band',
        amount: 79,
        category: 'Fitness',
      },
      {
        id: '1017',
        description: 'Mini Speakers',
        amount: 85,
        category: 'Clothing',
      },
      {
        id: '1018',
        description: 'Painted Phone Case',
        amount: 56,
        category: 'Accessories',
      },
      {
        id: '1019',
        description: 'Pink Band',
        amount: 79,
        category: 'Fitness',
      },
      {
        id: '1020',
        description: 'Pink Purse',
        amount: 110,
        category: 'Accessories',
      },
      {
        id: '1021',
        description: 'Purple Band',
        amount: 79,
        category: 'Fitness',
      },
      {
        id: '1022',
        description: 'Purple Gemstone Necklace',
        amount: 45,
        category: 'Accessories',
      },
      {
        id: '1023',
        description: 'Purple T-Shirt',
        amount: 49,
        category: 'Clothing',
      },
      {
        id: '1024',
        description: 'Shoes',
        amount: 64,
        category: 'Clothing',
      },
      {
        id: '1025',
        description: 'Sneakers',
        amount: 78,
        category: 'Clothing',
      },
      {
        id: '1026',
        description: 'Teal T-Shirt',
        amount: 49,
        category: 'Clothing',
      },
      {
        id: '1027',
        description: 'Yellow Earbuds',
        amount: 89,
        category: 'Electronics',
      },
      {
        id: '1028',
        description: 'Yoga Mat',
        amount: 20,
        category: 'Fitness',
      },
      {
        id: '1029',
        description: 'Yoga Set',
        amount: 20,
        category: 'Fitness',
      }
    ];
  },

  getProductsWithOrdersData() {
    return [
      {
        id: '1000',
        description: 'Bamboo Watch',
        amount: 65,
        category: 'Accessories',
        orders: [
          {
            id: '1000-0',
            productCode: 'f230fh0g3',
            date: '2020-09-13',
            amount: 65,
            customer: 'David James',
            status: 'PENDING'
          },
          {
            id: '1000-1',
            productCode: 'f230fh0g3',
            date: '2020-05-14',
            amount: 130,
            customer: 'Leon Rodrigues',
            status: 'DELIVERED'
          },
          {
            id: '1000-2',
            productCode: 'f230fh0g3',
            date: '2019-01-04',
            amount: 65,
            customer: 'Juan Alejandro',
            status: 'RETURNED'
          },
          {
            id: '1000-3',
            productCode: 'f230fh0g3',
            date: '2020-09-13',
            amount: 195,
            customer: 'Claire Morrow',
            status: 'CANCELLED'
          }
        ]
      },
      {
        id: '1001',
        description: 'Black Watch',
        amount: 72,
        category: 'Accessories',
        orders: [
          {
            id: '1001-0',
            productCode: 'nvklal433',
            date: '2020-05-14',
            amount: 72,
            customer: 'Maisha Jefferson',
            status: 'DELIVERED'
          },
          {
            id: '1001-1',
            productCode: 'nvklal433',
            date: '2020-02-28',
            amount: 144,
            customer: 'Octavia Murillo',
            status: 'PENDING'
          }
        ]
      },
      {
        id: '1002',
        description: 'Blue Band',
        amount: 79,
        category: 'Fitness',
        orders: [
          {
            id: '1002-0',
            productCode: 'zz21cz3c1',
            date: '2020-07-05',
            amount: 79,
            customer: 'Stacey Leja',
            status: 'DELIVERED'
          },
          {
            id: '1002-1',
            productCode: 'zz21cz3c1',
            date: '2020-02-06',
            amount: 79,
            customer: 'Ashley Wickens',
            status: 'DELIVERED'
          }
        ]
      },
      {
        id: '1003',
        description: 'Blue T-Shirt',
        amount: 29,
        category: 'Clothing',
        orders: []
      },
      {
        id: '1004',
        description: 'Bracelet',
        amount: 15,
        category: 'Accessories',
        orders: [
          {
            id: '1004-0',
            productCode: 'h456wer53',
            date: '2020-09-05',
            amount: 60,
            customer: 'Mayumi Misaki',
            status: 'PENDING'
          },
          {
            id: '1004-1',
            productCode: 'h456wer53',
            date: '2019-04-16',
            amount: 2,
            customer: 'Francesco Salvatore',
            status: 'DELIVERED'
          }
        ]
      },
      {
        id: '1005',
        description: 'Brown Purse',
        amount: 120,
        category: 'Accessories',
        orders: [
          {
            id: '1005-0',
            productCode: 'av2231fwg',
            date: '2020-01-25',
            amount: 120,
            customer: 'Isabel Sinclair',
            status: 'RETURNED'
          },
          {
            id: '1005-1',
            productCode: 'av2231fwg',
            date: '2019-03-12',
            amount: 240,
            customer: 'Lionel Clifford',
            status: 'DELIVERED'
          },
          {
            id: '1005-2',
            productCode: 'av2231fwg',
            date: '2019-05-05',
            amount: 120,
            customer: 'Cody Chavez',
            status: 'DELIVERED'
          }
        ]
      },
      {
        id: '1006',
        description: 'Chakra Bracelet',
        amount: 32,
        category: 'Accessories',
        orders: [
          {
            id: '1006-0',
            productCode: 'bib36pfvm',
            date: '2020-02-24',
            amount: 32,
            customer: 'Arvin Darci',
            status: 'DELIVERED'
          },
          {
            id: '1006-1',
            productCode: 'bib36pfvm',
            date: '2020-01-14',
            amount: 64,
            customer: 'Izzy Jones',
            status: 'PENDING'
          }
        ]
      },
      {
        id: '1007',
        description: 'Galaxy Earrings',
        amount: 34,
        category: 'Accessories',
        orders: [
          {
            id: '1007-0',
            productCode: 'mbvjkgip5',
            date: '2020-06-19',
            amount: 34,
            customer: 'Jennifer Smith',
            status: 'DELIVERED'
          }
        ]
      },
      {
        id: '1008',
        description: 'Game Controller',
        amount: 99,
        category: 'Electronics',
        orders: [
          {
            id: '1008-0',
            productCode: 'vbb124btr',
            date: '2020-01-05',
            amount: 99,
            customer: 'Jeanfrancois David',
            status: 'DELIVERED'
          },
          {
            id: '1008-1',
            productCode: 'vbb124btr',
            date: '2020-01-19',
            amount: 198,
            customer: 'Ivar Greenwood',
            status: 'RETURNED'
          }
        ]
      },
      {
        id: '1009',
        description: 'Gaming Set',
        amount: 299,
        category: 'Electronics',
        orders: [
          {
            id: '1009-0',
            productCode: 'cm230f032',
            date: '2020-06-24',
            amount: 299,
            customer: 'Kadeem Mujtaba',
            status: 'PENDING'
          },
          {
            id: '1009-1',
            productCode: 'cm230f032',
            date: '2020-05-11',
            amount: 299,
            customer: 'Ashley Wickens',
            status: 'DELIVERED'
          },
          {
            id: '1009-2',
            productCode: 'cm230f032',
            date: '2019-02-07',
            amount: 299,
            customer: 'Julie Johnson',
            status: 'DELIVERED'
          },
          {
            id: '1009-3',
            productCode: 'cm230f032',
            date: '2020-04-26',
            amount: 299,
            customer: 'Tony Costa',
            status: 'CANCELLED'
          }
        ]
      },
      {
        id: '1010',
        description: 'Gold Phone Case',
        amount: 24,
        category: 'Accessories',
        orders: [
          {
            id: '1010-0',
            productCode: 'plb34234v',
            date: '2020-02-04',
            amount: 24,
            customer: 'James Butt',
            status: 'DELIVERED'
          },
          {
            id: '1010-1',
            productCode: 'plb34234v',
            date: '2020-05-05',
            amount: 48,
            customer: 'Josephine Darakjy',
            status: 'DELIVERED'
          }
        ]
      },
      {
        id: '1011',
        description: 'Green Earbuds',
        amount: 89,
        category: 'Electronics',
        orders: [
          {
            id: '1011-0',
            productCode: '4920nnc2d',
            date: '2020-06-01',
            amount: 89,
            customer: 'Art Venere',
            status: 'DELIVERED'
          }
        ]
      },
      {
        id: '1012',
        description: 'Green T-Shirt',
        amount: 49,
        category: 'Clothing',
        orders: [
          {
            id: '1012-0',
            productCode: '250vm23cc',
            date: '2020-02-05',
            amount: 49,
            customer: 'Lenna Paprocki',
            status: 'DELIVERED'
          },
          {
            id: '1012-1',
            productCode: '250vm23cc',
            date: '2020-02-15',
            amount: 49,
            customer: 'Donette Foller',
            status: 'PENDING'
          }
        ]
      },
      {
        id: '1013',
        description: 'Grey T-Shirt',
        amount: 48,
        category: 'Clothing',
        orders: [
          {
            id: '1013-0',
            productCode: 'fldsmn31b',
            date: '2020-04-01',
            amount: 48,
            customer: 'Simona Morasca',
            status: 'DELIVERED'
          }
        ]
      },
      {
        id: '1014',
        description: 'Headphones',
        amount: 175,
        category: 'Electronics',
        orders: [
          {
            id: '1014-0',
            productCode: 'waas1x2as',
            date: '2020-05-15',
            amount: 175,
            customer: 'Lenna Paprocki',
            status: 'DELIVERED'
          },
          {
            id: '1014-1',
            productCode: 'waas1x2as',
            date: '2020-01-02',
            amount: 175,
            customer: 'Donette Foller',
            status: 'CANCELLED'
          }
        ]
      },
      {
        id: '1015',
        description: 'Light Green T-Shirt',
        amount: 49,
        category: 'Clothing',
        orders: [
          {
            id: '1015-0',
            productCode: 'vb34btbg5',
            date: '2020-07-02',
            amount: 98,
            customer: 'Mitsue Tollner',
            status: 'DELIVERED'
          }
        ]
      },
      {
        id: '1016',
        description: 'Lime Band',
        amount: 79,
        category: 'Fitness',
        orders: []
      },
      {
        id: '1017',
        description: 'Mini Speakers',
        amount: 85,
        category: 'Clothing',
        orders: [
          {
            id: '1017-0',
            productCode: 'v435nn85n',
            date: '2020-07-12',
            amount: 85,
            customer: 'Minna Amigon',
            status: 'DELIVERED'
          }
        ]
      },
      {
        id: '1018',
        description: 'Painted Phone Case',
        amount: 56,
        category: 'Accessories',
        orders: [
          {
            id: '1018-0',
            productCode: '09zx9c0zc',
            date: '2020-07-01',
            amount: 56,
            customer: 'Abel Maclead',
            status: 'DELIVERED'
          },
          {
            id: '1018-1',
            productCode: '09zx9c0zc',
            date: '2020-05-02',
            amount: 56,
            customer: 'Minna Amigon',
            status: 'RETURNED'
          }
        ]
      },
      {
        id: '1019',
        description: 'Pink Band',
        amount: 79,
        category: 'Fitness',
        orders: []
      },
      {
        id: '1020',
        description: 'Pink Purse',
        amount: 110,
        category: 'Accessories',
        orders: [
          {
            id: '1020-0',
            productCode: 'r23fwf2w3',
            date: '2020-05-29',
            amount: 110,
            customer: 'Kiley Caldarera',
            status: 'DELIVERED'
          },
          {
            id: '1020-1',
            productCode: 'r23fwf2w3',
            date: '2020-02-11',
            amount: 220,
            customer: 'Graciela Ruta',
            status: 'DELIVERED'
          }
        ]
      },
      {
        id: '1021',
        description: 'Purple Band',
        amount: 79,
        category: 'Fitness',
        orders: [
          {
            id: '1021-0',
            productCode: 'pxpzczo23',
            date: '2020-02-02',
            amount: 79,
            customer: 'Cammy Albares',
            status: 'DELIVERED'
          }
        ]
      },
      {
        id: '1022',
        description: 'Purple Gemstone Necklace',
        amount: 45,
        category: 'Accessories',
        orders: [
          {
            id: '1022-0',
            productCode: '2c42cb5cb',
            date: '2020-06-29',
            amount: 45,
            customer: 'Mattie Poquette',
            status: 'DELIVERED'
          },
          {
            id: '1022-1',
            productCode: '2c42cb5cb',
            date: '2020-02-11',
            amount: 135,
            customer: 'Meaghan Garufi',
            status: 'DELIVERED'
          }
        ]
      },
      {
        id: '1023',
        description: 'Purple T-Shirt',
        amount: 49,
        category: 'Clothing',
        orders: [
          {
            id: '1023-0',
            productCode: '5k43kkk23',
            date: '2020-04-15',
            amount: 49,
            customer: 'Gladys Rim',
            status: 'RETURNED'
          }
        ]
      },
      {
        id: '1024',
        description: 'Shoes',
        amount: 64,
        category: 'Clothing',
        orders: []
      },
      {
        id: '1025',
        description: 'Sneakers',
        amount: 78,
        category: 'Clothing',
        orders: [
          {
            id: '1025-0',
            productCode: 'nbm5mv45n',
            date: '2020-02-19',
            amount: 78,
            customer: 'Yuki Whobrey',
            status: 'DELIVERED'
          },
          {
            id: '1025-1',
            productCode: 'nbm5mv45n',
            date: '2020-05-21',
            amount: 78,
            customer: 'Fletcher Flosi',
            status: 'PENDING'
          }
        ]
      },
      {
        id: '1026',
        description: 'Teal T-Shirt',
        amount: 49,
        category: 'Clothing',
        orders: [
          {
            id: '1026-0',
            productCode: 'zx23zc42c',
            date: '2020-04-24',
            amount: 98,
            customer: 'Bette Nicka',
            status: 'DELIVERED'
          }
        ]
      },
      {
        id: '1027',
        description: 'Yellow Earbuds',
        amount: 89,
        category: 'Electronics',
        orders: [
          {
            id: '1027-0',
            productCode: 'acvx872gc',
            date: '2020-01-29',
            amount: 89,
            customer: 'Veronika Inouye',
            status: 'DELIVERED'
          },
          {
            id: '1027-1',
            productCode: 'acvx872gc',
            date: '2020-06-11',
            amount: 89,
            customer: 'Willard Kolmetz',
            status: 'DELIVERED'
          }
        ]
      },
      {
        id: '1028',
        description: 'Yoga Mat',
        amount: 20,
        category: 'Fitness',
        orders: []
      },
      {
        id: '1029',
        description: 'Yoga Set',
        amount: 20,
        category: 'Fitness',
        orders: [
          {
            id: '1029-0',
            productCode: 'gwuby345v',
            date: '2020-02-14',
            amount: 4,
            customer: 'Maryann Royster',
            status: 'DELIVERED'
          }
        ]
      }
    ];
  },

  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  },

  getProductsSmall() {
    return Promise.resolve(this.getProductsData().slice(0, 10));
  },

  getProducts() {
    return Promise.resolve(this.getProductsData());
  },

  getProductsWithOrdersSmall() {
    return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
  },

  getProductsWithOrders() {
    return Promise.resolve(this.getProductsWithOrdersData());
  }
};

