var firebaseConfig = 
{
    apiKey: "AIzaSyBGfVzJbkOBIpbuvT-7IIa30GHmi4Cit1k",
    authDomain: "fir-web-d8325.firebaseapp.com",
    projectId: "fir-web-d8325",
    storageBucket: "fir-web-d8325.appspot.com",
    messagingSenderId: "224790117061",
    appId: "1:224790117061:web:a14a2d0a97e5f066f84eac",
    measurementId: "G-D8P4PTL2Y3"
  };
  // Initialize Firebase
  firebase.FirebaseWeb(firebaseConfig);
  firebase.analytics();
  firebase.auth.Auth.Persistence.LOCAL;

//click event for login
  $("#LogButton").click(function()
  {
    var email =  $("#email").val()
    var password =  $("#password").val()

    if (email != "" && password != "")
    {
        var result = firebase.auth().signInWithEmailAndPassword(email,password);

        result.catch(function(error)
        {
            var errorCode = error.code;
            var consoleMessage = error.message;

            console.log(errorCode);
            console.log(consoleMessage);
            window.alert("Message : "+ errorMessage)
        });
    }
    else
    {
        window.alert("Check all fields and try again!")
    }
  }
  );