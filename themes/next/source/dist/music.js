const ap = new APlayer({
  container: document.getElementById('aplayer'),
  fixed: true,
  autoplay: true,
  audio: [
    {
      name: "我的一个道姑朋友",
      artist: '柚子茶',
      url: 'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBZ204d3BjSVhDanNnNHRuV2VyWDNxWk9BM0JBcUE=.mp3',
      cover: 'http://pvhw87c6e.bkt.clouddn.com/audio/%E6%9F%9A%E5%AD%90%E8%8C%B6%20-%20%E6%88%91%E7%9A%84%E4%B8%80%E4%B8%AA%E9%81%93%E5%A7%91%E6%9C%8B%E5%8F%8B%EF%BC%88Cover%20LON%20%EF%BC%8F%20%E3%82%BF%E3%82%A4%E3%83%8A%E3%82%AB%E5%BD%A9%E6%99%BA%EF%BC%89.jpg',
    },
    // {
    //   name: "夜宴风波",
    //   artist: '泠鸢yousa',
    //   url: 'http://pvhw87c6e.bkt.clouddn.com/audio/%E6%B3%A0%E9%B8%A2yousa%20-%20%E5%A4%9C%E5%AE%B4%E9%A3%8E%E6%B3%A2%E3%80%90%E6%B3%A0%E9%B8%A2%C2%B7%E7%BF%BB%E5%94%B1%E3%80%91%EF%BC%88Cover%EF%BC%9A%E9%9F%B3%E9%98%99%E8%AF%97%E5%90%AC%EF%BC%89.mp3',
    //   cover: 'http://pvhw87c6e.bkt.clouddn.com/audio/%E6%B3%A0%E9%B8%A2yousa%20-%20%E5%A4%9C%E5%AE%B4%E9%A3%8E%E6%B3%A2%E3%80%90%E6%B3%A0%E9%B8%A2%C2%B7%E7%BF%BB%E5%94%B1%E3%80%91%EF%BC%88Cover%EF%BC%9A%E9%9F%B3%E9%98%99%E8%AF%97%E5%90%AC%EF%BC%89.jpg',
    // }
  ]
});