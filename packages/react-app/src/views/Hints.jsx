import { Button } from 'antd';
import { React, useState } from 'react';
import { ZDK } from '@zoralabs/zdk';

export default function Hints() {
  /* @DEV: Use this page to display listings for a specific collection 
  
  
  
  */
  const API_ENDPOINT = 'https://api.zora.co/graphql';
  const zdk = new ZDK(API_ENDPOINT);

  const [Collection, setCollection] = useState();

  const args = {
    where: {
      collectionAddresses: Collection,
    },
  };

  function getCollection() {
    zdk.markets(args).then(res => {
      console.log(res);
    });
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
      </Button>
    </div>
  );
}
