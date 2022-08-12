# Finders Keepers 
![](https://i.imgur.com/7gTbXRd.jpg)
-> What does Finders Keepers do?

 Aggregate Zora finder's fee's by creating a platform to discover NFTs. Listings at Finder's Keepers marketplace create Lens posts that spread the word about the art being listed by being shared by the DAO. The dao is incentivized to generate a sale and keep the finder's fee to fund operations + growth.

![](https://i.imgur.com/APJVSaw.png)

## Project Status:

Help us by joining our development team here: 


## Tx Flow:
Step 1 ==> Create Lens post (gets address + TokenID[Are all lens posts on the same addr?])

Step 2====>List an NFT using Zora + make Lens post finder's fee recipient

const blitmapAddress = "0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63"; // Blitmap NFT Contract
const fillAmount = 

ethers.utils.parseEther("[TODO: INPUT FIELD]"); // [TODO: INPUT FIELD]
const finder = [OUTPUT OF LENS POST]; // Address of the Lens FInder's Post


await askModuleContract.fillAsk(

 blitmapAddress,

 "1", // Token Id

 "0x0000000000000000000000000000000000000000", // 0 address for ETH sale

 fillAmount,

 finder <- Replace with the owner of LensPost
);

-> Display Listed NFTs

-> Display listed listings (?)



## Step 3 ===> Claim finder's fee from FK SC





Lens API
Create a post: https://docs.lens.xyz/docs/creating-publications



Finder's keeper SC


-> Receives all finder's fees

-> allows LensPost owner to claim Fee once the listing is completed  by burning NFT

Obtain post metadata for listing info	
Check if the listing has been completed
Pay owner of the NFT
-> receive eth from Zora contract 	