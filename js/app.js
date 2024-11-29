// Assicurati di includere ethers.js nella tua applicazione
// Puoi includerlo tramite un CDN:
// <script src="https://cdn.jsdelivr.net/npm/ethers@5.6.9/dist/ethers.min.js"></script>

const { ethers } = window.ethers;

let provider;
let signer;
let stakingContract;

// Indirizzo e ABI del contratto di staking
const contractAddress = '0xYourContractAddress';
const contractABI = [
    // ABI del contratto di staking
];

document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            // Richiedi la connessione al wallet
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();

            // Mostra l'indirizzo del wallet
            const address = await signer.getAddress();
            document.getElementById('walletInfo').innerText = `Wallet connesso: ${address}`;

            // Crea un'istanza del contratto
            stakingContract = new ethers.Contract(contractAddress, contractABI, signer);
        } catch (error) {
            console.error('Errore nella connessione al wallet:', error);
        }
    } else {
        alert('MetaMask non è installato. Si prega di installarlo per continuare.');
    }
});

document.getElementById('stakeButton').addEventListener('click', async () => {
    const amount = document.getElementById('amountToStake').value;
    if (amount > 0) {
        try {
            const tx = await stakingContract.stake(ethers.utils.parseUnits(amount, 18));
            await tx.wait();
            alert('Deposito effettuato con successo!');
        } catch (error) {
            console.error('Errore durante il deposito:', error);
        }
    } else {
        alert('Inserisci un importo valido per il deposito.');
    }
});

document.getElementById('claimRewardsButton').addEventListener('click', async () => {
    try {
        const tx = await stakingContract.claimRewards();
        await tx.wait();
        alert('Ricompense ritirate con successo!');
    } catch (error) {
        console.error('Errore durante il ritiro delle ricompense:', error);
    }
});
