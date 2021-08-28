function Container() {
  const [like, setLiked] = React.useState(false);
  return (
    <div>
      <button onClick={setLiked(!like)}>
        좋아요 버튼
      </button>
    </div>
  )
}