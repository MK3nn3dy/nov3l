import{C as f,_ as t,a as i,T as d,u as c,A as w,c as C,az as W,d as v,e as y,k as T,G as A,i as b,g as R,l as S,m as E,aj as F,o as D,p as V}from"./index.de082cbe.js";import{S as k}from"./erc-20-standard-a230f8e7.browser.esm.e6da6494.js";class p extends k{constructor(a,r,n){var o;let l=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},h=arguments.length>4?arguments[4]:void 0,g=arguments.length>5?arguments[5]:void 0,u=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new f(a,r,h,l);super(u,n,g),o=this,t(this,"abi",void 0),t(this,"metadata",void 0),t(this,"app",void 0),t(this,"roles",void 0),t(this,"encoder",void 0),t(this,"estimator",void 0),t(this,"sales",void 0),t(this,"platformFees",void 0),t(this,"events",void 0),t(this,"claimConditions",void 0),t(this,"interceptor",void 0),t(this,"claim",i(async function(e){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return o.claimTo.prepare(await o.contractWrapper.getSignerAddress(),e,s)})),t(this,"claimTo",i(async function(e,s){let m=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;return o.erc20.claimTo.prepare(e,s,{checkERC20Allowance:m})})),t(this,"delegateTo",i(async e=>d.fromContractWrapper({contractWrapper:this.contractWrapper,method:"delegate",args:[await c(e)]}))),t(this,"burnTokens",i(async e=>this.erc20.burn.prepare(e))),t(this,"burnFrom",i(async(e,s)=>this.erc20.burnFrom.prepare(e,s))),this.abi=w.parse(h||[]),this.metadata=new C(this.contractWrapper,W,this.storage),this.app=new v(this.contractWrapper,this.metadata,this.storage),this.roles=new y(this.contractWrapper,p.contractRoles),this.encoder=new T(this.contractWrapper),this.estimator=new A(this.contractWrapper),this.events=new b(this.contractWrapper),this.sales=new R(this.contractWrapper),this.platformFees=new S(this.contractWrapper),this.interceptor=new E(this.contractWrapper),this.claimConditions=new F(this.contractWrapper,this.metadata,this.storage)}async getVoteBalance(){return await this.getVoteBalanceOf(await this.contractWrapper.getSignerAddress())}async getVoteBalanceOf(a){return await this.erc20.getValue(await this.contractWrapper.readContract.getVotes(await c(a)))}async getDelegation(){return await this.getDelegationOf(await this.contractWrapper.getSignerAddress())}async getDelegationOf(a){return await this.contractWrapper.readContract.delegates(await c(a))}async isTransferRestricted(){return!await this.contractWrapper.readContract.hasRole(D("transfer"),V)}async prepare(a,r,n){return d.fromContractWrapper({contractWrapper:this.contractWrapper,method:a,args:r,overrides:n})}async call(a,r,n){return this.contractWrapper.call(a,r,n)}}t(p,"contractRoles",["admin","transfer"]);export{p as TokenDrop};
