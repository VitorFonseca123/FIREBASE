var app = {
        
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        
    },

    onDeviceReady: function() {
        document.getElementById("btnInserir").addEventListener('click',app.inserir);  
       
    },

    inserir: function(){
        var db = firebase.firestore();

        let cnome = document.getElementById("cadNome").value;
        let ctelefone = document.getElementById("cadtelefone").value;
        let corigem = document.getElementById("txtorigem").value;
        let cdata_contato = document.getElementById("cadData").value;
        let cobservacao = document.getElementById("observacoes").value;

        db.collection("Cadastro").add({
            Nome: cnome,
            telefone: ctelefone,
            data_contato: cdata_contato,
            observacao: cobservacao,
            Origem: corigem
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

    }  
};

app.initialize();