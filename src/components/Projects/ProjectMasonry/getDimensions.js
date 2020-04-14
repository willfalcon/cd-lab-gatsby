function getDimensions(aspect, viewport) {
  let width, height;

  if (aspect > 1) {
    width = viewport.width * 0.75;
    height = width / aspect;

    if (height >= viewport.height) {
      height = viewport.height * 0.75;
      width = viewport.height * 0.75 * aspect;
    }
  } else {
    height = viewport.height * 0.75;
    width = height * aspect;
  }

  if (width > 1000) {
    width = 1000;
    height = 1000 / aspect;
  }

  return { width, height };
}

export default getDimensions;
