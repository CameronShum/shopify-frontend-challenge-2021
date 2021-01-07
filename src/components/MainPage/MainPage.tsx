import React, { useState } from 'react';
import styled from 'styled-components/macro';
import {
  Banner, ListBox, SearchBar, SearchResultRows,
} from 'components';
import useOmdbApi from 'hooks';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bannerVisible, setBannerVisible] = useState(true);
  const searchResults = useOmdbApi({ searchTerm, type: 'Search' });

  return (
    <Container>
      {bannerVisible && (
      <Banner
        type="info"
        message="You have nominated 5 items."
        setBannerVisible={setBannerVisible}
      />
      )}
      <ComponnentsContainer>
        <Title>The Shoppies</Title>
        <SearchBar searchType="Search" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ListBox
          titleText={searchResults.length !== 0 ? `Results for "${searchTerm}"` : 'No results found.'}
          rows={searchResults.map((result) => (
            <SearchResultRows
              title={result.Title}
              year={result.Year}
              imdbId={result.imdbID}
            />
          ))}
        />
      </ComponnentsContainer>
    </Container>
  );
};

export default React.memo(MainPage);

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ComponnentsContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.div`
  padding-bottom: 20px;
  font-size: 48px;
`;
