const sanityClient = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');

const roundToNearest = (num, multiple) => {
  return Math.ceil(num / multiple) * multiple;
};

const client = new sanityClient({
  projectId: process.env.GATSBY_PROJECT_ID,
  dataset: process.env.GATSBY_PROJECT_DATASET,
  apiVersion: 1,
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function imgUrl(source) {
  return builder.image(source);
}

exports.handler = async function (event, context) {
  // your server-side functionality

  const { containerWidth, image } = JSON.parse(event.body);
  const width = roundToNearest(containerWidth, 100);
  const url = await imgUrl(image).width(width).url();

  return {
    statusCode: 200,
    body: JSON.stringify({ url }),
  };
};
