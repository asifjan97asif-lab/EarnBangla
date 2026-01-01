// REGISTER
function register(){
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const invite = document.getElementById("invite").value;

  auth.createUserWithEmailAndPassword(email,password)
  .then(res=>{
    return db.collection("users").doc(res.user.uid).set({
      name:name,
      balance:0,
      inviteCode:Math.floor(100000+Math.random()*900000),
      referredBy:invite || ""
    });
  })
  .then(()=>{ alert("Registration successful!"); location.href="index.html"; })
  .catch(err=>alert(err.message));
}

// LOGIN
function login(){
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email,password)
  .then(()=>location.href="dashboard.html")
  .catch(err=>alert(err.message));
}

// DASHBOARD DATA
auth.onAuthStateChanged(user=>{
  if(user && document.getElementById("balance")){
    db.collection("users").doc(user.uid).get()
    .then(doc=>{
      const data = doc.data();
      document.getElementById("balance").innerText="Balance: "+data.balance;
      document.getElementById("inviteCode").innerText="Invite Code: "+data.inviteCode;
    });
  }
});

// LOGOUT
function logout(){
  auth.signOut().then(()=>location.href="index.html");
}

// WITHDRAW
function withdraw(){
  const amt = parseFloat(document.getElementById("withdrawAmount").value);
  if(isNaN(amt) || amt<=0){ alert("Enter valid amount"); return; }

  const user = auth.currentUser;
  if(!user){ alert("Not logged in"); return; }

  const docRef = db.collection("users").doc(user.uid);
  docRef.get().then(doc=>{
    let balance = doc.data().balance;
    if(amt>balance){ alert("Insufficient balance"); return; }

    docRef.update({ balance: balance-amt })
    .then(()=> alert("Withdraw successful! New balance: "+(balance-amt)));
  });
}