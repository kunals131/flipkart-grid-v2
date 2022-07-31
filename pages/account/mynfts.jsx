import React, { useEffect, useState } from 'react'
import AccountLayout from '../../components/AccountLayout'
import {useMoralis} from 'react-moralis';
import {useWeb3Contract} from 'react-moralis'
import { verifyAuthentication } from '../../utils/verifyAuth';
import WarrantyABI from '../../constants/WarrantyNFTABI.json';
import { fetchSellerWarrantyAddresses } from '../../APIs/auth';
import { sellerAddress } from '../../constants/sellerAddresses';
import { CreditCard } from 'web3uikit';
import axios from 'axios';
import Image from 'next/image';
export const getServerSideProps = async(ctx) => {
  const auth = verifyAuthentication(ctx.req);
  if (auth.state) {
    try {
        return {props : {user : auth.decodedData.user }};
    }catch(err) {
      console.log(err);
      return {notFound : true};
    }
  }
  return {
    redirect : {
      destination : '/auth'
    }
  }
};


const NFTCard = ({details})=>{
  return (
    <div className=''>
    <div className='w-[350px] h-[300px] relative rounded-xl'>
      <Image src={details.image} layout='fill'  objectFit='contain'/>
    </div>
    </div>
   )
}

const NFTFromSeller = ({seller})=>{
  const [nfts,setNfts] = useState([]);
  const [nftData,setNftData] = useState([]);
  const {runContractFunction : fetchNFT} = useWeb3Contract({
    abi: WarrantyABI,
    contractAddress: seller,
    functionName: "getCustomersTokens",
    params: {
    },
  });

  useEffect(()=>{
    const run = async()=>{
      if (nfts.length>0) {

        for(let i=0; i<nfts.length; ++i) {
          // console.log(nfts[1]);
          // console.log(`https://ipfs.io/${nfts[0].replace("ipfs://","ipfs/")}`)
          try {
          const result  =await axios.get(`https://ipfs.io/${nfts[i].replace("ipfs://","ipfs/")}`, {timeout : '5000'});
          console.log(result);
          setNftData(prev=>[...prev,result.data]);
          }catch(err) {console.log(err);}
        }
       
      }
  }
  run();
  }, [nfts])

  useEffect(()=>{
    const run = async()=>{
    const nfts = await fetchNFT({
      onSuccess : (e)=>setNfts(e),
      onError : (e)=>console.log(e)
    })
  }
  run();
  }, [])
  
  return (
    <div className=''>
      <div className='text-xl font-[600]'>Warranty of Products Bought From seller {seller}</div>
      <div className='mt-5 grid grid-cols-3'>
        {nftData.filter(n=>n.name!=='shiba-inu').map((n,idx)=><div key={idx}><NFTCard details={n}/></div>)}
      </div>
    </div>
  )
}

const MyNFTs = ({user}) => {
  const [loading,setLoading] = useState(false);
  const {account,chainId,isWeb3Enabled} = useMoralis();
  const [warrantyContracts,setWarrantyContracts] = useState([]);
  const [message,setMessage] = useState('');

  useEffect(()=>{
    if (isWeb3Enabled) {
      setMessage(`Showing NFTs for the account ${account}`);
    }
    else {
      setMessage(`Please Connect your Wallet to Continue`);
    }
  }, [isWeb3Enabled]);



  useEffect(()=>{
    const run = async()=>{
    if (isWeb3Enabled) {
      setLoading(true);
      try {
        const result = await fetchSellerWarrantyAddresses(account);
        setWarrantyContracts(result.data);
      }catch(err) {
        console.log(err);
      }finally {
        setLoading(false);
      }
    }
  }

  run();
  }, [isWeb3Enabled])

  // const {runContractFunction : getCustomersTokens} = useWeb3Contract({
  //   abi : WarrantyABI,
  //   contractAddress : 
  // });
  return (
    <AccountLayout>
      <div className='p-5'>
      <div className='text-2xl font-semibold'>Warranty NFTs</div>
      <p className='text-gray-600 mt-1 text-sm'>{message}</p>
      </div>
      {loading?<div className='mt-5'>Loading...</div>:warrantyContracts.length===0?<div>No NFT's were found with this wallet</div>:<div>
      {warrantyContracts.map(w=><NFTFromSeller key={w} seller={w}/>)}  
      </div>}


    </AccountLayout>
  )
}

export default MyNFTs