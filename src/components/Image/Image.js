import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const Image = ({ image, className, type = 'fluid' }) => {
  const data = useStaticQuery(graphql`
    query {
      ecr: file(relativePath: { eq: "ecr.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      ecr_banner: file(relativePath: { eq: "ecr-banner.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      dak_logo: file(relativePath: { eq: "1dak.png" }) {
        childImageSharp {
          fluid(maxWidth: 150) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return <Img className={className} fluid={data[image].childImageSharp[type]} />
};

export default Image
