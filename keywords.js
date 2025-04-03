var keywords = [
  'taufik hidayat',
  'Taufik Hidayat',
  'TAUFIK HIDAYAT',
  'tfkhdyt',
  'TFKHDYT',
  'TFKHDYT Portfolio',
  'tfkhdyt portfolio',
  'Taufik Hidayat Portfolio',
  'taufik hidayat portfolio',
  'TFKHDYT Web',
  'tfkhdyt web',
  'Taufik Hidayat Web',
  'taufik hidayat web',
  'TFKHDYT Web Portfolio',
  'tfkhdyt web portfolio',
  'Taufik Hidayat Web Portfolio',
  'taufik hidayat web portfolio',
  'tafanizer',
  'tfkhdyt my id',
  'taufik web',
  'taufik portofolio',
  'taufik web portofolio',
  'Taufik Web',
  'Taufik Portofolio',
  'Taufik Web Portofolio',
  'taufik portfolio',
  'taufik web portfolio',
  'portofolio taufik',
  'web taufik',
  'portofolio web taufik',
  'taufik programmer',
  'taufik programer',
];
//var html = '<meta name="keywords" content="';
var html = '';
for (var i = 0; i < keywords.length; i++) {
  var separator = i < keywords.length - 1 ? ', ' : '';
  html += keywords[i] + separator;
}
//tmll += '">';
//console.log(html);
document.querySelector('meta[name="keywords"]').setAttribute('content', html);
