function Container() {
  const [liked, setLiked] = React.useState(false);
  const text = liked ? '좋아요 취소' : '좋아요';
  return (
    <div>
      <button onClick={() => setLiked(!lied)}>{text}</button>
    </div>
  )
}