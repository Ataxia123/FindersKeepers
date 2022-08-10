import { Button, Grid } from 'antd';
import { React, useState } from 'react';
import { ZDK } from '@zoralabs/zdk';
import {NFTPreview} from '@zoralabs/nft-components';
import { Link } from 'react-router-dom';

export default function Hints(NFTPreview) {
  /* @DEV: Use this page to display listings for a specific collection 
  
  
  
  */
  const API_ENDPOINT = 'https://api.zora.co/graphql';
  const zdk = new ZDK(API_ENDPOINT);

  const [Collection, setCollection] = useState();
  const [Listings, setListings] = useState('...');

  const args = {
    where: {
      collectionAddresses: Collection,
    },
  };

  function getCollection() {
    zdk.markets(args).then(res => {
      console.log(res);
      setListings(res);
    });
    console.log('listings', Listings);
  }
  return (
    <div>
      <h1>Listings for {Collection}</h1>
      <div>
        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          First name
        </label>
        <input
          type="text"
          id="collection_address"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="0x..."
          required
          button="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={e => setCollection(e.target.value)}
        />
      </div>
      <Button type="primary" onClick={getCollection}>
        Submit
        {console.log('listings', Listings)}
      </Button>
      <div>
        {Listings.nodes?.map((item, index) => (
          <Grid>
            <NFTPreview contract={item.token?.collectionAddresses} id={item.token?.tokenId} />
            <div
              style={{
                backgroundColor: 'rgb(97, 255, 150)',
                display: 'inline-block',
                border: '1px solid black',
                borderRadius: '10px',
                padding: '42px',
                margin: '1.5%',
                overflow: 'hidden',
                textAlign: 'top center',
              }}
            ></div>
          </Grid>
        ))}
      </div>
    </div>
  );
}
