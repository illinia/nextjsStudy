function Container() {
  const [like, setLiked] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: setLiked(!like)
  }, "\uC88B\uC544\uC694 \uBC84\uD2BC"));
}