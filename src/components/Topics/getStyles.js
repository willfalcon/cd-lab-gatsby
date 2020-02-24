import theme from '../theme';

const {
  topics: { expandedWidth, topicSize, selectedTopicSize },
} = theme;

function getStyles(viewport, expanded, expandedIndex, topicIndex) {
  const { height: viewHeight } = viewport;

  var right, top, transform, width, height;

  const isExpanded = expanded === 'true';

  if (viewport.width < expandedWidth + 150) {
    right = isExpanded
      ? `${viewport.width - selectedTopicSize - 75 - 20}px`
      : '10px';
  } else {
    right = isExpanded
      ? `${(viewport.width - expandedWidth) / 2 +
          expandedWidth -
          selectedTopicSize -
          100}px`
      : // : '10px';
        `${(viewport.width - expandedWidth) / 2 - topicSize / 2}px`;
  }

  width = isExpanded ? `${selectedTopicSize}px` : `${topicSize}px`;
  height = isExpanded ? `${selectedTopicSize}px` : `${topicSize}px`;

  switch (topicIndex) {
    case 0:
      top = isExpanded ? '0px' : `${viewHeight / 2 - topicSize - 10}px`;
      transform = 'none';
      break;

    case 1:
    default:
      top = isExpanded ? '0px' : `${viewHeight / 2 - topicSize / 2}px`;
      transform = isExpanded
        ? `translateY(0)`
        : expandedIndex === 0
        ? `translateY(-${topicSize / 2 + 10}px)`
        : `translateY(${topicSize / 2}px)`;
      break;

    case 2:
      top = isExpanded
        ? '0px'
        : `${viewHeight / 2 - topicSize / 2 + topicSize}px`;
      transform = isExpanded
        ? `translateY(0)`
        : `translateY(-${topicSize / 2}px)`;
      break;
  }

  return { right, top, transform, width, height };
}

export default getStyles;
