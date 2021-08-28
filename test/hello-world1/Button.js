function Container() {
  const [liked, setLiked] = React.useState(false);
  const text = liked ? '좋아요 취소' : '좋아요';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => setLiked(!lied)
  }, text));
}

const domContainer = document.querySelector('#react-root');
ReactDOM.render(React.createElement(Container), domContainer);