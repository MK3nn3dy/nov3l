import{_ as o,a as f,v as I,u as W,w as O,x as L,T as g,y as q,B as i,z as R,F as b,p as l,L as v,W as F,r as A,H as M,I as S,J as k,K as N,M as U,N as P,O as _,P as V,Q as x,S as z,U as H,V as Y,X as G,Y as K,Z as $,$ as Q,a0 as E,k as D,C as Z,a1 as J,o as C,A as X,c as j,a2 as tt,d as rt,e as et,G as at,i as nt,l as st,m as ot,a3 as it}from"./index.2d16d240.js";let m=function(y){return y[y.Direct=0]="Direct",y[y.Auction=1]="Auction",y}({});class ct{constructor(r,a){o(this,"contractWrapper",void 0),o(this,"storage",void 0),o(this,"createListing",f(async t=>{I(t);const n=await W(t.assetContractAddress),e=await W(t.currencyContractAddress);await O(this.contractWrapper,this.getAddress(),n,t.tokenId,await this.contractWrapper.getSignerAddress());const s=await L(this.contractWrapper.getProvider(),t.buyoutPricePerToken,e);let d=Math.floor(t.startTimestamp.getTime()/1e3);const p=(await this.contractWrapper.getProvider().getBlock("latest")).timestamp;return d<p&&(d=p),g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"createListing",args:[{assetContract:n,tokenId:t.tokenId,buyoutPricePerToken:s,currencyToAccept:q(e),listingType:m.Direct,quantityToList:t.quantity,reservePricePerToken:s,secondsUntilEndTime:t.listingDurationInSeconds,startTime:i.from(d)}],parse:h=>({id:this.contractWrapper.parseLogs("ListingAdded",h==null?void 0:h.logs)[0].args.listingId,receipt:h})})})),o(this,"createListingsBatch",f(async t=>{const n=await Promise.all(t.map(async e=>(await this.createListing.prepare(e)).encode()));return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"multicall",args:[n],parse:e=>this.contractWrapper.parseLogs("ListingAdded",e==null?void 0:e.logs).map(d=>({id:d.args.listingId,receipt:e}))})})),o(this,"makeOffer",f(async(t,n,e,s,d)=>{if(R(e))throw new Error("You must use the wrapped native token address when making an offer with a native token");const c=await L(this.contractWrapper.getProvider(),s,e);try{await this.getListing(t)}catch(T){throw console.error("Failed to get listing, err =",T),new Error(`Error getting the listing with id ${t}`)}const p=i.from(n),h=i.from(c).mul(p),u=await this.contractWrapper.getCallOverrides()||{};await b(this.contractWrapper,h,e,u);let w=$;return d&&(w=i.from(Math.floor(d.getTime()/1e3))),g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"offer",args:[t,n,e,c,w],overrides:u})})),o(this,"acceptOffer",f(async(t,n)=>{await this.validateListing(i.from(t));const e=await W(n),s=await this.contractWrapper.readContract.offers(t,e);return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"acceptOffer",args:[t,e,s.currency,s.pricePerToken]})})),o(this,"buyoutListing",f(async(t,n,e)=>{const s=await this.validateListing(i.from(t)),{valid:d,error:c}=await this.isStillValidListing(s,n);if(!d)throw new Error(`Listing ${t} is no longer valid. ${c}`);const p=e||await this.contractWrapper.getSignerAddress(),h=i.from(n),u=i.from(s.buyoutPrice).mul(h),w=await this.contractWrapper.getCallOverrides()||{};return await b(this.contractWrapper,u,s.currencyContractAddress,w),g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"buy",args:[t,p,h,s.currencyContractAddress,u],overrides:w})})),o(this,"updateListing",f(async t=>g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"updateListing",args:[t.id,t.quantity,t.buyoutPrice,t.buyoutPrice,await W(t.currencyContractAddress),t.startTimeInSeconds,t.secondsUntilEnd]}))),o(this,"cancelListing",f(async t=>g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"cancelDirectListing",args:[t]}))),this.contractWrapper=r,this.storage=a}getAddress(){return this.contractWrapper.readContract.address}async getListing(r){const a=await this.contractWrapper.readContract.listings(r);if(a.assetContract===l)throw new v(this.getAddress(),r.toString());if(a.listingType!==m.Direct)throw new F(this.getAddress(),r.toString(),"Auction","Direct");return await this.mapListing(a)}async getActiveOffer(r,a){await this.validateListing(i.from(r)),A(M(a),"Address must be a valid address");const t=await this.contractWrapper.readContract.offers(r,await W(a));if(t.offeror!==l)return await S(this.contractWrapper.getProvider(),i.from(r),t)}async validateListing(r){try{return await this.getListing(r)}catch(a){throw console.error(`Error getting the listing with id ${r}`),a}}async mapListing(r){return{assetContractAddress:r.assetContract,buyoutPrice:i.from(r.buyoutPricePerToken),currencyContractAddress:r.currency,buyoutCurrencyValuePerToken:await k(this.contractWrapper.getProvider(),r.currency,r.buyoutPricePerToken),id:r.listingId.toString(),tokenId:r.tokenId,quantity:r.quantity,startTimeInSeconds:r.startTime,asset:await N(r.assetContract,this.contractWrapper.getProvider(),r.tokenId,this.storage),secondsUntilEnd:r.endTime,sellerAddress:r.tokenOwner,type:m.Direct}}async isStillValidListing(r,a){if(!await U(this.contractWrapper.getProvider(),this.getAddress(),r.assetContractAddress,r.tokenId,r.sellerAddress))return{valid:!1,error:`Token '${r.tokenId}' from contract '${r.assetContractAddress}' is not approved for transfer`};const n=this.contractWrapper.getProvider(),e=new P(r.assetContractAddress,_,n),s=await e.supportsInterface(V),d=await e.supportsInterface(x);if(s){const c=new P(r.assetContractAddress,z,n);let p;try{p=await c.ownerOf(r.tokenId)}catch{}const h=(p==null?void 0:p.toLowerCase())===r.sellerAddress.toLowerCase();return{valid:h,error:h?void 0:`Seller is not the owner of Token '${r.tokenId}' from contract '${r.assetContractAddress} anymore'`}}else if(d){const h=(await new P(r.assetContractAddress,H,n).balanceOf(r.sellerAddress,r.tokenId)).gte(a||r.quantity);return{valid:h,error:h?void 0:`Seller does not have enough balance of Token '${r.tokenId}' from contract '${r.assetContractAddress} to fulfill the listing`}}else return{valid:!1,error:"Contract does not implement ERC 1155 or ERC 721."}}}class dt{constructor(r,a){o(this,"contractWrapper",void 0),o(this,"storage",void 0),o(this,"encoder",void 0),o(this,"createListing",f(async t=>{I(t);const n=await W(t.assetContractAddress),e=await W(t.currencyContractAddress);await O(this.contractWrapper,this.getAddress(),n,t.tokenId,await this.contractWrapper.getSignerAddress());const s=await L(this.contractWrapper.getProvider(),t.buyoutPricePerToken,e),d=await L(this.contractWrapper.getProvider(),t.reservePricePerToken,e);let c=Math.floor(t.startTimestamp.getTime()/1e3);const h=(await this.contractWrapper.getProvider().getBlock("latest")).timestamp;return c<h&&(c=h),g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"createListing",args:[{assetContract:n,tokenId:t.tokenId,buyoutPricePerToken:s,currencyToAccept:q(e),listingType:m.Auction,quantityToList:t.quantity,reservePricePerToken:d,secondsUntilEndTime:t.listingDurationInSeconds,startTime:i.from(c)}],parse:u=>({id:this.contractWrapper.parseLogs("ListingAdded",u==null?void 0:u.logs)[0].args.listingId,receipt:u})})})),o(this,"createListingsBatch",f(async t=>{const n=await Promise.all(t.map(async e=>(await this.createListing.prepare(e)).encode()));return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"multicall",args:[n],parse:e=>this.contractWrapper.parseLogs("ListingAdded",e==null?void 0:e.logs).map(d=>({id:d.args.listingId,receipt:e}))})})),o(this,"buyoutListing",f(async t=>{const n=await this.validateListing(i.from(t)),e=await Y(this.contractWrapper.getProvider(),n.currencyContractAddress);return this.makeBid.prepare(t,G(n.buyoutPrice,e.decimals))})),o(this,"makeBid",f(async(t,n)=>{const e=await this.validateListing(i.from(t)),s=await L(this.contractWrapper.getProvider(),n,e.currencyContractAddress);if(s.eq(i.from(0)))throw new Error("Cannot make a bid with 0 value");const d=await this.contractWrapper.readContract.bidBufferBps(),c=await this.getWinningBid(t);if(c){const w=K(c.pricePerToken,s,d);A(w,"Bid price is too low based on the current winning bid and the bid buffer")}else{const w=s,T=i.from(e.reservePrice);A(w.gte(T),"Bid price is too low based on reserve price")}const p=i.from(e.quantity),h=s.mul(p),u=await this.contractWrapper.getCallOverrides()||{};return await b(this.contractWrapper,h,e.currencyContractAddress,u),g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"offer",args:[t,e.quantity,e.currencyContractAddress,s,$],overrides:u})})),o(this,"cancelListing",f(async t=>{const n=await this.validateListing(i.from(t)),e=i.from(Math.floor(Date.now()/1e3)),s=i.from(n.startTimeInEpochSeconds),d=await this.contractWrapper.readContract.winningBid(t);if(e.gt(s)&&d.offeror!==l)throw new Q(t.toString());return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"closeAuction",args:[i.from(t),await this.contractWrapper.getSignerAddress()]})})),o(this,"closeListing",f(async(t,n)=>{n||(n=await this.contractWrapper.getSignerAddress());const e=await this.validateListing(i.from(t));try{return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"closeAuction",args:[i.from(t),n]})}catch(s){throw s.message.includes("cannot close auction before it has ended")?new E(t.toString(),e.endTimeInEpochSeconds.toString()):s}})),o(this,"executeSale",f(async t=>{const n=await this.validateListing(i.from(t));try{const e=await this.getWinningBid(t);A(e,"No winning bid found");const s=this.encoder.encode("closeAuction",[t,n.sellerAddress]),d=this.encoder.encode("closeAuction",[t,e.buyerAddress]);return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"multicall",args:[s,d]})}catch(e){throw e.message.includes("cannot close auction before it has ended")?new E(t.toString(),n.endTimeInEpochSeconds.toString()):e}})),o(this,"updateListing",f(async t=>g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"updateListing",args:[t.id,t.quantity,t.reservePrice,t.buyoutPrice,t.currencyContractAddress,t.startTimeInEpochSeconds,t.endTimeInEpochSeconds]}))),this.contractWrapper=r,this.storage=a,this.encoder=new D(r)}getAddress(){return this.contractWrapper.readContract.address}async getListing(r){const a=await this.contractWrapper.readContract.listings(r);if(a.listingId.toString()!==r.toString())throw new v(this.getAddress(),r.toString());if(a.listingType!==m.Auction)throw new F(this.getAddress(),r.toString(),"Direct","Auction");return await this.mapListing(a)}async getWinningBid(r){await this.validateListing(i.from(r));const a=await this.contractWrapper.readContract.winningBid(r);if(a.offeror!==l)return await S(this.contractWrapper.getProvider(),i.from(r),a)}async getWinner(r){const a=await this.validateListing(i.from(r)),t=await this.contractWrapper.readContract.winningBid(r),n=i.from(Math.floor(Date.now()/1e3)),e=i.from(a.endTimeInEpochSeconds);if(n.gt(e)&&t.offeror!==l)return t.offeror;const d=(await this.contractWrapper.readContract.queryFilter(this.contractWrapper.readContract.filters.AuctionClosed())).find(c=>c.args.listingId.eq(i.from(r)));if(!d)throw new Error(`Could not find auction with listingId ${r} in closed auctions`);return d.args.winningBidder}async getBidBufferBps(){return this.contractWrapper.readContract.bidBufferBps()}async getMinimumNextBid(r){const[a,t,n]=await Promise.all([this.getBidBufferBps(),this.getWinningBid(r),await this.validateListing(i.from(r))]),e=t?t.currencyValue.value:n.reservePrice,s=e.add(e.mul(a).div(1e4));return k(this.contractWrapper.getProvider(),n.currencyContractAddress,s)}async validateListing(r){try{return await this.getListing(r)}catch(a){throw console.error(`Error getting the listing with id ${r}`),a}}async mapListing(r){return{assetContractAddress:r.assetContract,buyoutPrice:i.from(r.buyoutPricePerToken),currencyContractAddress:r.currency,buyoutCurrencyValuePerToken:await k(this.contractWrapper.getProvider(),r.currency,r.buyoutPricePerToken),id:r.listingId.toString(),tokenId:r.tokenId,quantity:r.quantity,startTimeInEpochSeconds:r.startTime,asset:await N(r.assetContract,this.contractWrapper.getProvider(),r.tokenId,this.storage),reservePriceCurrencyValuePerToken:await k(this.contractWrapper.getProvider(),r.currency,r.reservePricePerToken),reservePrice:i.from(r.reservePricePerToken),endTimeInEpochSeconds:r.endTime,sellerAddress:r.tokenOwner,type:m.Auction}}}class B{get chainId(){return this._chainId}constructor(r,a,t){let n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},e=arguments.length>4?arguments[4]:void 0,s=arguments.length>5?arguments[5]:void 0,d=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new Z(r,a,e,n);o(this,"abi",void 0),o(this,"contractWrapper",void 0),o(this,"storage",void 0),o(this,"encoder",void 0),o(this,"events",void 0),o(this,"estimator",void 0),o(this,"platformFees",void 0),o(this,"metadata",void 0),o(this,"app",void 0),o(this,"roles",void 0),o(this,"interceptor",void 0),o(this,"direct",void 0),o(this,"auction",void 0),o(this,"_chainId",void 0),o(this,"getAll",this.getAllListings),o(this,"buyoutListing",f(async(c,p,h)=>{const u=await this.contractWrapper.readContract.listings(c);if(u.listingId.toString()!==c.toString())throw new v(this.getAddress(),c.toString());switch(u.listingType){case m.Direct:return A(p!==void 0,"quantityDesired is required when buying out a direct listing"),await this.direct.buyoutListing.prepare(c,p,h);case m.Auction:return await this.auction.buyoutListing.prepare(c);default:throw Error(`Unknown listing type: ${u.listingType}`)}})),o(this,"makeOffer",f(async(c,p,h)=>{const u=await this.contractWrapper.readContract.listings(c);if(u.listingId.toString()!==c.toString())throw new v(this.getAddress(),c.toString());const w=await this.contractWrapper.getChainID();switch(u.listingType){case m.Direct:return A(h,"quantity is required when making an offer on a direct listing"),await this.direct.makeOffer.prepare(c,h,R(u.currency)?J[w].wrapped.address:u.currency,p);case m.Auction:return await this.auction.makeBid.prepare(c,p);default:throw Error(`Unknown listing type: ${u.listingType}`)}})),o(this,"setBidBufferBps",f(async c=>{await this.roles.verify(["admin"],await this.contractWrapper.getSignerAddress());const p=await this.getTimeBufferInSeconds();return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"setAuctionBuffers",args:[p,i.from(c)]})})),o(this,"setTimeBufferInSeconds",f(async c=>{await this.roles.verify(["admin"],await this.contractWrapper.getSignerAddress());const p=await this.getBidBufferBps();return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"setAuctionBuffers",args:[i.from(c),p]})})),o(this,"allowListingFromSpecificAssetOnly",f(async c=>{const p=[];return(await this.roles.get("asset")).includes(l)&&p.push(this.encoder.encode("revokeRole",[C("asset"),l])),p.push(this.encoder.encode("grantRole",[C("asset"),c])),g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"multicall",args:[p]})})),o(this,"allowListingFromAnyAsset",f(async()=>{const c=[],p=await this.roles.get("asset");for(const h in p)c.push(this.encoder.encode("revokeRole",[C("asset"),h]));return c.push(this.encoder.encode("grantRole",[C("asset"),l])),g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"multicall",args:[c]})})),this._chainId=s,this.abi=X.parse(e||[]),this.contractWrapper=d,this.storage=t,this.metadata=new j(this.contractWrapper,tt,this.storage),this.app=new rt(this.contractWrapper,this.metadata,this.storage),this.roles=new et(this.contractWrapper,B.contractRoles),this.encoder=new D(this.contractWrapper),this.estimator=new at(this.contractWrapper),this.direct=new ct(this.contractWrapper,this.storage),this.auction=new dt(this.contractWrapper,this.storage),this.events=new nt(this.contractWrapper),this.platformFees=new st(this.contractWrapper),this.interceptor=new ot(this.contractWrapper)}onNetworkUpdated(r){this.contractWrapper.updateSignerOrProvider(r)}getAddress(){return this.contractWrapper.readContract.address}async getListing(r){const a=await this.contractWrapper.readContract.listings(r);if(a.assetContract===l)throw new v(this.getAddress(),r.toString());switch(a.listingType){case m.Auction:return await this.auction.mapListing(a);case m.Direct:return await this.direct.mapListing(a);default:throw new Error(`Unknown listing type: ${a.listingType}`)}}async getActiveListings(r){const a=await this.getAllListingsNoFilter(!0),t=this.applyFilter(a,r),n=i.from(Math.floor(Date.now()/1e3));return t.filter(e=>e.type===m.Auction&&i.from(e.endTimeInEpochSeconds).gt(n)&&i.from(e.startTimeInEpochSeconds).lte(n)||e.type===m.Direct&&e.quantity>0)}async getAllListings(r){const a=await this.getAllListingsNoFilter(!1);return this.applyFilter(a,r)}async getTotalCount(){return await this.contractWrapper.readContract.totalListings()}async isRestrictedToListerRoleOnly(){return!await this.contractWrapper.readContract.hasRole(C("lister"),l)}async getBidBufferBps(){return this.contractWrapper.readContract.bidBufferBps()}async getTimeBufferInSeconds(){return this.contractWrapper.readContract.timeBuffer()}async getOffers(r){const a=await this.events.getEvents("NewOffer",{order:"desc",filters:{listingId:r}});return await Promise.all(a.map(async t=>await S(this.contractWrapper.getProvider(),i.from(r),{quantityWanted:t.data.quantityWanted,pricePerToken:t.data.quantityWanted.gt(0)?t.data.totalOfferAmount.div(t.data.quantityWanted):t.data.totalOfferAmount,currency:t.data.currency,offeror:t.data.offeror})))}async getAllListingsNoFilter(r){return(await Promise.all(Array.from(Array((await this.contractWrapper.readContract.totalListings()).toNumber()).keys()).map(async t=>{let n;try{n=await this.getListing(t)}catch(e){if(e instanceof v)return;console.warn(`Failed to get listing ${t}' - skipping. Try 'marketplace.getListing(${t})' to get the underlying error.`);return}if(n.type===m.Auction)return n;if(r){const{valid:e}=await this.direct.isStillValidListing(n);if(!e)return}return n}))).filter(t=>t!==void 0)}applyFilter(r,a){let t=[...r];const n=i.from((a==null?void 0:a.start)||0).toNumber(),e=i.from((a==null?void 0:a.count)||it).toNumber();return a&&(a.seller&&(t=t.filter(s=>{var d;return s.sellerAddress.toString().toLowerCase()===((d=a==null?void 0:a.seller)==null?void 0:d.toString().toLowerCase())})),a.tokenContract&&(t=t.filter(s=>{var d;return s.assetContractAddress.toString().toLowerCase()===((d=a==null?void 0:a.tokenContract)==null?void 0:d.toString().toLowerCase())})),a.tokenId!==void 0&&(t=t.filter(s=>{var d;return s.tokenId.toString()===((d=a==null?void 0:a.tokenId)==null?void 0:d.toString())})),t=t.filter((s,d)=>d>=n),t=t.slice(0,e)),t}async prepare(r,a,t){return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:r,args:a,overrides:t})}async call(r,a,t){return this.contractWrapper.call(r,a,t)}}o(B,"contractRoles",["admin","lister","asset"]);export{B as Marketplace};
