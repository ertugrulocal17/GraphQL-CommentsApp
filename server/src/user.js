const users = [
  {
    id: '1',
    fullName: 'Mehmet Seven',
    profile_photo: 'https://randomuser.me/api/portraits/men/42.jpg',
    age: 29,
  },
  {
    id: '2',
    fullName: 'Ahmet Günal',
    profile_photo: 'https://randomuser.me/api/portraits/men/22.jpg',
    age: 32,
  },
];

const posts = [
  {
    id: '1',
    title: 'Mehmetin Gönderisi',
    short_description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto architecto commodi provident nihil laudantium at.Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    user_id: '1',
    cover:
      'https://goinswriter.com/wp-content/uploads/2021/03/gw-keyboard-coffee-beans.jpeg',
  },
  {
    id: '2',
    title: 'Mehmetin Diğer Gönderisi',
    short_description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto architecto commodi provident nihil laudantium at.',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    user_id: '1',
    cover:
      'https://my-dreamscape.com/wp-content/uploads/2021/11/girlgoneabroad.jpg',
  },
  {
    id: '3',
    title: 'Ahmetin Gönderisi',
    short_description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto architecto commodi provident nihil laudantium at.',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    user_id: '2',
    cover:
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/R%C3%B6e_g%C3%A5rd_caf%C3%A9_2.jpg',
  },
];

const comments = [
  {
    id: '1',
    text: 'Bu Ahmetin Yorumudur',
    post_id: '1',
    user_id: '2',
  },
  {
    id: '2',
    text: 'Bu Mehmetin Yorumudur',
    post_id: '1',
    user_id: '1',
  },
  {
    id: '3',
    text: 'Bu da Ahmetin Yorumudur',
    post_id: '2',
    user_id: '2',
  },
  {
    id: '4',
    text: 'foo bar baz',
    post_id: '3',
    user_id: '1',
  },
];

module.exports = {
  users,
  posts,
  comments,
};
