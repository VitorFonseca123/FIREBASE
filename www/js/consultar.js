/*var app = {
    initialize: function(){
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function(){
        document.getElementById("btnListar").addEventListener("click", app.listar);

    },
    listar: function(){
        var db = firebase.firestore();
        var ag = db.collection("Cadastro");

        ag.get().then((querySnapshot) =>{
            querySnapshot.forEach((doc) =>{
                console.log(doc.id, "=>", doc.data());
                $("#TableData").append("<tr>");
                $("#TableData").append("<td scope='col"+doc.data().nome + "<td>");
                $("#TableData").append("<td scope='col"+doc.data().telefone + "<td>");
                $("#TableData").append("<td scope='col"+doc.data().origem + "<td>");
                $("#TableData").append("<td scope='col"+doc.data().data + "<td>");
                $("#TableData").append("<td scope='col"+doc.data().observacao + "<td>");

                $("#TableData").append("<td scope='col'><a href=' " + cordova.file.applicationDirectory + "www.editarClientes.html?telefone=");
                $("#TableData").append("</tr>");
            });
            
        })
        .catch((error)=>{
            console.log("ERROR getting documents: ", error);
        });
    }
}*/
var app = {

    //Construtor do app
     initialize: function() {
         console.info("Iniciando...");
         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
     },
     onDeviceReady: function() {
        console.info("Device Ready");
        app.buscar();
    },
    buscar: function(){
        console.log("Busca Iniciada");
        var db = firebase.firestore();
        var collCadastros = db.collection('Cadastro');
        
        collCadastros.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let rowContent ="<tr>" +
                                "<td>" + doc.data().Nome + "</td>" +
                                "<td>" + doc.data().telefone + "</td>" +
                                "<td>" + doc.data().Origem + "</td>" +
                                "<td>" + doc.data().data_contato + "</td>" +
                                "<td class='text-wrap'>" + doc.data().observacao + "</td>" +
                                "<td class='table-borderless'><a href='./editarclientes.html?telefone=" + doc.data().telefone + "'><p>Editar</P></a></td>" +
                                "<td class='table-borderless'><a href='./excluir.html?telefone=" + doc.data().telefone + "'><p>Excluir</a></td>" +
                                "</tr>";
                
                document.getElementById("TableData").innerHTML += rowContent;
            })
        })
        .catch((error) => {
            console.log("Erro ao consultar documento: " + error);
        })
    }
}

app.initialize();