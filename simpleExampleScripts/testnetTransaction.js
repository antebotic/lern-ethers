//Add the below code to the console to load the script localy
/*
    var ele = document.createElement("script");
    var scriptPath = "http://localhost:8080/simpleExampleScripts/testnetTransaction.js" //verify the script path
    ele.setAttribute("src",scriptPath);
    document.head.appendChild(ele)
*/


const transact = async () => {
    if(window.ethereum && window.ethers){
        const ethers = window.ethers;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts");
        const signer = provider.getSigner();

        const senderAddress = await signer.getAddress();
        const recieverAddress = '0xED747F3Db875b3D5e0a92aACBB547dFA6EBF144e';
        const value = ethers.utils.parseEther("1", "ether")
        const gasLimit = ethers.utils.hexlify(21000);
        const gasPrice = ethers.utils.parseUnits('3', 'gwei')
        const nonce = await provider.getTransactionCount(senderAddress, "latest");

        const tx = {
            from: senderAddress,
            to: recieverAddress,
            value: value,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            nonce: nonce,
        };
        console.log(tx)
        const attemptTransaction = await signer.sendTransaction(tx);
        console.log(attemptTransaction)
    }
} 

transact();