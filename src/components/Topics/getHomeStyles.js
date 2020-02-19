import theme from '../theme';

const {
  topics: { expandedWidth, topicSize, selectedTopicSize },
} = theme;

function getHomeStyles(
  viewport,
  expanded,
  expandedIndex,
  topicIndex,
  error = false
) {
  const { height: viewHeight, width: viewWidth } = viewport;

  var right, top, transform, width, height;

  const isExpanded = expanded === true;

  console.log(expandedIndex);

  // See if the viewport is wide enough to get the full "expanded width" with 75px on each side, which is the width of the nav column
  if (viewWidth < expandedWidth + 150) {
    // NOT wide enough for full expanded width
    right = isExpanded
      ? // If this topic is expanded
        `${viewWidth - 75 - selectedTopicSize - 20}px` // this is counting down from the left. View width - nav width - topic width - padding
      : // If not expanded
      expandedIndex !== -1
      ? // If any topic is expanded
        '10px' // 10px from the right
      : // If no topic is expanded
        `${error ? viewWidth * 0.2 : viewWidth * 0.4}px`; // 20% from right on error page, 40% from right on home page
  } else {
    // IS wide enough for full expanded width
    right = isExpanded
      ? // If this topic is expanded
        `${(viewWidth - expandedWidth) / 2 +
          expandedWidth -
          selectedTopicSize -
          100}px`
      : // If not expanded
      expandedIndex !== -1
      ? // If any topic is expanded
        `${(viewport.width - expandedWidth) / 2 - topicSize / 2}px`
      : // If no topic is expanded
        `${error ? viewWidth * 0.2 : viewWidth * 0.4}px`; // 20% from right on error page, 40% from right on home page
  }

  width = isExpanded ? `${selectedTopicSize}px` : `${topicSize}px`;
  height = isExpanded ? `${selectedTopicSize}px` : `${topicSize}px`;

  switch (topicIndex) {
    case 0:
      top = isExpanded
        ? '0px'
        : expandedIndex === -1
        ? `${viewHeight / 2 - topicSize / 2 - topicSize - 10}px`
        : `${viewHeight / 2 - topicSize - 10}px`;

      transform = 'none';
      break;

    case 1:
      top = isExpanded ? '0px' : `${viewHeight / 2 - topicSize / 2}px`;

      transform =
        isExpanded || expandedIndex === -1
          ? `translateY(0px)`
          : expandedIndex == 0
          ? `translateY(-${topicSize / 2 + 10}px)`
          : `translateY(${topicSize / 2}px)`;
      break;

    case 2:
      top = isExpanded
        ? '0px'
        : expandedIndex === -1
        ? `${viewHeight / 2 + topicSize + 10}px`
        : `${viewHeight / 2 - topicSize / 2 + topicSize}px`;

      transform = isExpanded
        ? `translateY(0)`
        : `translateY(-${topicSize / 2}px)`;
      break;
  }

  return { right, top, transform, width, height };
}

export default getHomeStyles;
