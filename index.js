// Banking System Data
const users = [
    {
        name: "James Williams",
        pin: "1234",
        accountNumber: "10000001",
        balance: 1500,
        transactions: []
    },
    {
        name: "Sarah Adams",
        pin: "0001",
        accountNumber: "10000002",
        balance: 3500,
        transactions: []
    },
    {
        name: "Michael Genanew",
        pin: "1021",
        accountNumber: "10000003",
        balance: 5000,
        transactions: []
    }
];

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const mainScreen = document.getElementById('main-screen');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const userNameDisplay = document.getElementById('user-name');
const accountNumberDisplay = document.getElementById('display-account-number');
const balanceDisplay = document.getElementById('current-balance');
const logoutBtn = document.getElementById('logout-btn');

// Modal elements
const transactionModal = document.getElementById('transaction-modal');
const pinModal = document.getElementById('pin-modal');
const actionModal = document.getElementById('action-modal');
const closeBtns = document.querySelectorAll('.close-btn');

// Action buttons
const checkBalanceBtn = document.getElementById('check-balance-btn');
const withdrawBtn = document.getElementById('withdraw-btn');
const depositBtn = document.getElementById('deposit-btn');
const transferBtn = document.getElementById('transfer-btn');
const transactionsBtn = document.getElementById('transactions-btn');
const changePinBtn = document.getElementById('change-pin-btn');

// Modal form elements
const actionTitle = document.getElementById('action-title');
const actionForm = document.getElementById('action-form');
const recipientField = document.getElementById('recipient-field');
const amountInput = document.getElementById('amount');
const recipientAccountInput = document.getElementById('recipient-account');
const actionError = document.getElementById('action-error');
const actionSubmitBtn = document.getElementById('action-submit-btn');

const changePinForm = document.getElementById('change-pin-form');
const pinError = document.getElementById('pin-error');

const transactionsList = document.getElementById('transactions-list');

// Current user
let currentUser = null;

// Helper functions
function formatDate(date = new Date()) {
    return date.toLocaleString();
}

function formatCurrency(amount) {
    return amount.toFixed(2);
}

function createTransaction(type, amount, otherParty = null) {
    return {
        type,
        amount,
        date: formatDate(),
        otherParty,
        balance: currentUser.balance
    };
}

function updateUI() {
    userNameDisplay.textContent = currentUser.name;
    accountNumberDisplay.textContent = currentUser.accountNumber;
    balanceDisplay.textContent = formatCurrency(currentUser.balance);
}

// Event Listeners
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const accountNumber = document.getElementById('account-number').value;
    const pin = document.getElementById('pin').value;
    
    // Validate inputs
    if (!accountNumber || !pin) {
        loginError.textContent = "Please enter both account number and PIN";
        return;
    }
    
    // Find user
    const user = users.find(u => u.accountNumber === accountNumber && u.pin === pin);
    
    if (user) {
        currentUser = user;
        loginScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        updateUI();
        loginError.textContent = "";
        loginForm.reset();
    } else {
        loginError.textContent = "Invalid account number or PIN";
    }
});

logoutBtn.addEventListener('click', function() {
    currentUser = null;
    mainScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
});

checkBalanceBtn.addEventListener('click', function() {
    alert(`Your current balance is $${formatCurrency(currentUser.balance)}`);
    
    // Record balance check
    currentUser.transactions.push(
        createTransaction("Balance Check", 0)
    );
});

withdrawBtn.addEventListener('click', function() {
    actionTitle.textContent = "Withdraw Money";
    recipientField.classList.add('hidden');
    actionSubmitBtn.textContent = "Withdraw";
    actionForm.dataset.action = "withdraw";
    actionError.textContent = "";
    actionForm.reset();
    actionModal.classList.remove('hidden');
});

depositBtn.addEventListener('click', function() {
    actionTitle.textContent = "Deposit Money";
    recipientField.classList.add('hidden');
    actionSubmitBtn.textContent = "Deposit";
    actionForm.dataset.action = "deposit";
    actionError.textContent = "";
    actionForm.reset();
    actionModal.classList.remove('hidden');
});

transferBtn.addEventListener('click', function() {
    actionTitle.textContent = "Transfer Money";
    recipientField.classList.remove('hidden');
    actionSubmitBtn.textContent = "Transfer";
    actionForm.dataset.action = "transfer";
    actionError.textContent = "";
    actionForm.reset();
    actionModal.classList.remove('hidden');
});

transactionsBtn.addEventListener('click', function() {
    displayTransactions();
    transactionModal.classList.remove('hidden');
});

changePinBtn.addEventListene