import React, { useEffect } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import Img from 'gatsby-image';

const CarouselProject = props => {
  console.log(props);
  const {
    id,
    images,
    title,
    _rawDescription,
    setExpandedProject,
    slug,
    initialProject,
    serviceOrCollection,
    expandedProject,
    setModalOpen,
    mainSlug,
    categories,
  } = props;

  useEffect(() => {
    if (initialProject && initialProject.id === id) {
      // const location = ref.current.getBoundingClientRect();
      setExpandedProject({
        // location,
        // ...project,
        id,
        images,
        title,
        _rawDescription,
        categories,
        // videoAspect: aspect,
        // video,
        // videoThumb,
        // thumbnail,
      });
      setModalOpen(true);
    }
  }, [id, images, title, _rawDescription, categories]);

  return (
    <StyledProjectCell
      className="projects-carousel__project carousel-project"
      onClick={() => {
        setExpandedProject({
          id,
          images,
          title,
          _rawDescription,
          slug,
          categories,
        });
        setModalOpen(true);
        window.history.pushState(
          {},
          '',
          `/${serviceOrCollection}/${mainSlug}/${slug.current}`
        );
      }}
    >
      {images[0].asset.extension === 'gif' ? (
        <img
          className="carousel-project__image"
          src={images[0].asset.fluid.src}
          srcset={images[0].asset.fluid.srcSet}
          sizes={images[0].asset.fluid.sizes}
          alt={title}
        />
      ) : (
        <Img
          className="carousel-project__image"
          fluid={images[0].asset.fluid}
          alt={title}
        />
      )}
      <h2 className="carousel-project__title project-cell__link">{title}</h2>
    </StyledProjectCell>
  );
};

const StyledProjectCell = styled.button`
  height: 100%;
  width: 100%;
  position: absolute;
  background: white;
  border: 0;
  margin: 0;
  padding: 0;
  outline: none;
  cursor: pointer;
  display: block;
  .project-cell {
    &__image {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    &__link {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 50px;
      background: ${({ theme }) => rgba(theme.orange, 0.75)};
      color: ${({ theme }) => theme.offWhite};
      text-decoration: none;
      padding: 0 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 60%;
      width: 55%;
      line-height: 1.15;
      font-size: 1.6rem;
    }
  }
`;

export default CarouselProject;
