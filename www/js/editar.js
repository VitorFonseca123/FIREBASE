var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnBuscar").addEventListener("click",app.buscar);
        document.getElementById("btnEditar").addEventListener("click",app.editar);
        
    },

    buscar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");

        var db = firebase.firestore();
        var ag = db.collection("Cadastro").where("telefone", "==", getTelefone);

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                document.getElementById("cadNome").value = doc.data().Nome;
                document.getElementById("cadtelefone").value = doc.data().telefone;
                document.getElementById("txtorigem").value = doc.data().Origem;
                document.getElementById("cadData").value = doc.data().data_contato;
                document.getElementById("observacoes").value = doc.data().observacao;
               

            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    },

    editar: function(){
        
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");

        let cnome = document.getElementById("cadNome").value;
        let ctelefone = document.getElementById("cadtelefone").value;
        let corigem = document.getElementById("txtorigem").value;
        let cdata_contato = document.getElementById("cadData").value;
        let cobservacao = document.getElementById("observacoes").value;

        var db = firebase.firestore();
        var ag = db.collection("Cadastro").where("telefone", "==", getTelefone);

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var dados = db.collection("Cadastro").doc(doc.id);

                return dados.update({
                    Nome: cnome,
                    telefone: ctelefone,
                    Origem: corigem,
                    data_contato: cdata_contato,
                    observacao: cobservacao
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    window.location.href = "consulta.html";
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    }

};

app.initialize();