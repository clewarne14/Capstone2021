const isIFrame = () => {
  try {
    return window.self === window.top;
  } catch (e) {
    return false;
  }
};

export default isIFrame;
