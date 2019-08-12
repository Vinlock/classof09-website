import React from 'react';
import { graphql } from 'gatsby';
import CoreLayout from './CoreLayout';
import styled from 'styled-components';

const PageContainer = styled.div`
`;

const PostContainer = styled.div`
  a {
    color: black;
  }
`;

const MarkdownLayout = ({ data }) => {
  const { markdownRemark } = data;
  const { html } = markdownRemark;
  return (
    <CoreLayout>
      <PageContainer className="container">
          <PostContainer
            dangerouslySetInnerHTML={{ __html: html }}
          />
      </PageContainer>
    </CoreLayout>
  );
};

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;

export default MarkdownLayout;
