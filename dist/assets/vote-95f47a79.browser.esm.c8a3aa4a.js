import{C as A,_ as e,a as v,T as g,aC as w,A as b,c as k,aD as P,d as V,k as x,G as E,i as T,m as D,B as I,u as f,X as S,N as B,ay as F,J as _,V as N}from"./index.e5cbe13c.js";let C=function(o){return o[o.Against=0]="Against",o[o.For=1]="For",o[o.Abstain=2]="Abstain",o}({});class O{get chainId(){return this._chainId}constructor(t,a,r){var c=this;let l=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},d=arguments.length>4?arguments[4]:void 0,i=arguments.length>5?arguments[5]:void 0,y=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new A(t,a,d,l);e(this,"contractWrapper",void 0),e(this,"storage",void 0),e(this,"abi",void 0),e(this,"metadata",void 0),e(this,"app",void 0),e(this,"encoder",void 0),e(this,"estimator",void 0),e(this,"events",void 0),e(this,"interceptor",void 0),e(this,"_chainId",void 0),e(this,"propose",v(async(p,s)=>{s||(s=[{toAddress:this.contractWrapper.readContract.address,nativeTokenValue:0,transactionData:"0x"}]);const u=s.map(n=>n.toAddress),m=s.map(n=>n.nativeTokenValue),W=s.map(n=>n.transactionData);return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"propose",args:[u,m,W,p],parse:n=>({id:this.contractWrapper.parseLogs("ProposalCreated",n==null?void 0:n.logs)[0].args.proposalId,receipt:n})})})),e(this,"vote",v(async function(p,s){let u=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"";return await c.ensureExists(p),g.fromContractWrapper({contractWrapper:c.contractWrapper,method:"castVoteWithReason",args:[p,s,u]})})),e(this,"execute",v(async p=>{await this.ensureExists(p);const s=await this.get(p),u=s.executions.map(h=>h.toAddress),m=s.executions.map(h=>h.nativeTokenValue),W=s.executions.map(h=>h.transactionData),n=w(s.description);return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"execute",args:[u,m,W,n]})})),this._chainId=i,this.abi=b.parse(d||[]),this.contractWrapper=y,this.storage=r,this.metadata=new k(this.contractWrapper,P,this.storage),this.app=new V(this.contractWrapper,this.metadata,this.storage),this.encoder=new x(this.contractWrapper),this.estimator=new E(this.contractWrapper),this.events=new T(this.contractWrapper),this.interceptor=new D(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.readContract.address}async get(t){const r=(await this.getAll()).filter(c=>c.proposalId.eq(I.from(t)));if(r.length===0)throw new Error("proposal not found");return r[0]}async getAll(){return Promise.all((await this.contractWrapper.readContract.getAllProposals()).map(async t=>({proposalId:t.proposalId,proposer:t.proposer,description:t.description,startBlock:t.startBlock,endBlock:t.endBlock,state:await this.contractWrapper.readContract.state(t.proposalId),votes:await this.getProposalVotes(t.proposalId),executions:t[3].map((a,r)=>({toAddress:t.targets[r],nativeTokenValue:a,transactionData:t.calldatas[r]}))})))}async getProposalVotes(t){const a=await this.contractWrapper.readContract.proposalVotes(t);return[{type:C.Against,label:"Against",count:a.againstVotes},{type:C.For,label:"For",count:a.forVotes},{type:C.Abstain,label:"Abstain",count:a.abstainVotes}]}async hasVoted(t,a){return a||(a=await this.contractWrapper.getSignerAddress()),this.contractWrapper.readContract.hasVoted(t,await f(a))}async canExecute(t){await this.ensureExists(t);const a=await this.get(t),r=a.executions.map(i=>i.toAddress),c=a.executions.map(i=>i.nativeTokenValue),l=a.executions.map(i=>i.transactionData),d=w(a.description);try{return await this.contractWrapper.callStatic().execute(r,c,l,d),!0}catch{return!1}}async balance(){const t=await this.contractWrapper.readContract.provider.getBalance(this.contractWrapper.readContract.address);return{name:"",symbol:"",decimals:18,value:t,displayValue:S(t,18)}}async balanceOfToken(t){const a=new B(await f(t),F,this.contractWrapper.getProvider());return await _(this.contractWrapper.getProvider(),t,await a.balanceOf(this.contractWrapper.readContract.address))}async ensureExists(t){try{await this.contractWrapper.readContract.state(t)}catch{throw Error(`Proposal ${t} not found`)}}async settings(){const[t,a,r,c,l]=await Promise.all([this.contractWrapper.readContract.votingDelay(),this.contractWrapper.readContract.votingPeriod(),this.contractWrapper.readContract.token(),this.contractWrapper.readContract["quorumNumerator()"](),this.contractWrapper.readContract.proposalThreshold()]),d=await N(this.contractWrapper.getProvider(),r);return{votingDelay:t.toString(),votingPeriod:a.toString(),votingTokenAddress:r,votingTokenMetadata:d,votingQuorumFraction:c.toString(),proposalTokenThreshold:l.toString()}}async prepare(t,a,r){return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:a,overrides:r})}async call(t,a,r){return this.contractWrapper.call(t,a,r)}}export{O as Vote};
