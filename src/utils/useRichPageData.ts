import { useState, useEffect } from 'react';
const gql = String.raw;
const useRichPageData = function (_id) {
  const [remoteRichContent, setrichContent] = useState({});

  useEffect(() => {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            Page(id: "${_id}") {
              richcontentRaw
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setrichContent(res);
      })
      .catch((err) => {
        console.log('SHOOOOOT');
        console.log(err);
      });
  }, [_id]);

  return {
    remoteRichContent,
  };
};

export default useRichPageData;
