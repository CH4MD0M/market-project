const categories = [
  {
    name: '노트북',
    image:
      'https://res.cloudinary.com/dfdnn20e7/image/upload/v1685122342/laptop_lcicg3.png',
    attrs: [
      {
        key: '제조회사',
        value: ['삼성전자', '레노버', 'LG전자', 'ASUS', 'APPLE', 'DELL', 'MSI'],
      },
      { key: 'ram', value: ['8 gb', '16 gb', '32 gb'] },
      { key: 'ssd', value: ['128 gb', '256 gb', '512 gb'] },
      { key: '색상', value: ['black', 'silver', 'white', 'spaceGray'] },
      { key: 'cpu제조사', value: ['amd', 'intel', 'apple'] },
      {
        key: '운영체제(OS)',
        value: ['미포함(프리도스)', 'windows10', 'windows11', 'macOS'],
      },
    ],
  },

  {
    name: '모니터',
    image: '/images/monitors-category.png',
    attrs: [
      {
        key: '제조회사',
        value: [
          '삼성전자',
          '알파스캔',
          'LG전자',
          '한성컴퓨터',
          '크로스오버',
          'DELL',
        ],
      },
      { key: '화면크기', value: ['24인치', '27인치', '32인치'] },
      {
        key: '해상도',
        value: ['1920 x 1080(FHD)', '2560 x 1440(QHD)', '3840X2160(4K UHD)'],
      },
      {
        key: '패널타입',
        value: ['IPS', 'VA', 'TN', 'PLS', 'OLED', 'QLED', 'LED'],
      },
      { key: '패널형태', value: ['평면', '커브드'] },
      { key: '최대주사율', value: ['60hz', '144hz', '240hz'] },
    ],
  },
  {
    name: '냉장고',
    image:
      'https://res.cloudinary.com/dfdnn20e7/image/upload/v1685122346/refrigerator_ickfhx.png',
    attrs: [
      {
        key: '제조회사',
        value: ['삼성전자', 'LG전자', '캐리어', '위니아'],
      },
      {
        key: '에너지효율',
        value: ['1등급', '2등급', '3등급', '4등급', '5등급'],
      },
      {
        key: '총용량',
        value: [
          '300L',
          '400L',
          '500L',
          '600L',
          '700L',
          '800L',
          '900L',
          '1000L',
        ],
      },
    ],
  },
  {
    name: '에어컨',
    image:
      'https://res.cloudinary.com/dfdnn20e7/image/upload/v1685122376/air-conditioner_nougg8.png',
    attrs: [
      { key: '제조회사', value: ['삼성전자', 'LG전자', '캐리어', '위니아'] },
      {
        key: '에너지효율',
        value: ['1등급', '2등급', '3등급', '4등급', '5등급'],
      },
      { key: '타입', value: ['스탠드형', '벽걸이형', '창문형'] },
      { key: '절전기능', value: ['인버터', '듀얼인버터', '정속형'] },
    ],
  },
  {
    name: '태블릿',
    image:
      'https://res.cloudinary.com/dfdnn20e7/image/upload/v1685122346/tablet_kdwf6t.png',
    attrs: [
      {
        key: '제조회사',
        value: ['삼성전자', 'APPLE', '레노버', 'Microsoft'],
      },
      { key: '화면크기', value: ['8인치', '10인치', '11인치', '12인치'] },
      { key: 'ram', value: ['4 gb', '6 gb', '8 gb', '16 gb', '32 gb'] },
      { key: '저장용량', value: ['64 gb', '128 gb', '256 gb', '512 gb'] },
      { key: '운영체제', value: ['안드로이드', '아이패드OS', '윈도우'] },
    ],
  },
  {
    name: 'DLSR',
    image:
      'https://res.cloudinary.com/dfdnn20e7/image/upload/v1685122338/camera_dfdaau.png',
    attrs: [
      {
        key: '제조회사',
        value: ['캐논', '니콘', '펜탁스', '후지필름', '올림푸스'],
      },
      {
        key: '센서분류',
        value: ['풀프레임', 'APS-C'],
      },
      {
        key: 'LCD화면형태',
        value: ['고정형', '회전형', '틸트형'],
      },
      {
        key: '최고감도',
        value: ['ISO 12800', 'ISO 25600', 'ISO 32000', 'ISO 51200'],
      },
    ],
  },
];

module.exports = categories;
