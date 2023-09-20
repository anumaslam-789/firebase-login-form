import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
const database = getDatabase();

//import { getStorage ,storageRef} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
const storage = getStorage();


const auth = getAuth();
const signUp = () => {
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let image =  document.getElementById("image");
    let imageFile = image.files[0]
    console.log(image.files[0]);
    createUserWithEmailAndPassword(auth, email.value, password.value)
.then((res) => {
            alert("successfully signup");

            let mediaRef = storageRef(storage , "images" + image.name)
            uploadBytes(mediaRef,imageFile).then((res)=>{
                console.log("succesfully added image in a storage");
            }).catch((reject)=>{
console.log("err" );
            })
           // uploadByte
            const uniqueId = auth.currentUser.uid
            let userReference = ref(database, "users/" + uniqueId)
            let userObj = {
                name: username.value,
                email: email.value,
                password: password.value
            }
            console.log(userObj);
            set(userReference, userObj).then((res) => {
                console.log("successfully added in data base");
            })
            window.location.href="https://www.daraz.pk/"
        }).catch((reject) => {
            alert(" rejected")

        })
}




let signIn_btn = document.getElementById("btn-signup");
signIn_btn.addEventListener("click", signUp);


const login = () => {
    let email = document.getElementById("email-login");
    let password = document.getElementById("password-login");
    signInWithEmailAndPassword(auth, email - login.value, password - login.value)

        .then((resolve) => {
            alert("successfully login" ,resolve)

            const uniqueId = auth.currentUser.uid
            let userReference = ref(database, "users/" + uniqueId)

            onValue(userReference, (snapshot) => {

                console.log(snapshot);
            })
        }).catch((reject) => {
            alert("login rejected",reject)

        })
}
let loginIn_btn = document.getElementById("btn-login");
loginIn_btn.addEventListener("click", login);