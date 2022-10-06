class Produto {

    constructor() {
        this.idProduct = 1;
        this.arrayProdutos = []; 
        this.editItem = false;     
    }

    salvar() {
        let produto = this.lerDados();

        // ELEMENTOS DE ALERTAS A SEREM EXIBIDOS DURANTE A VALIDAÇÃO
        let cadastroProductInfo = document.querySelector('#produto_cadastrado');
        let nomeProdutoInvalido = document.querySelector('#nome_produto_invalido');        
        let precoProdutoInvalido =  document.querySelector('#preco_invalido'); 
        let produtoDuplicado = document.querySelector('#produto_duplicado');         
                       
        if(this.validaCampo(produto) && this.verificarDuplicidade(produto)) {
            this.adcionarNovoProduto(produto);
            this.cleanForm();

            // Limpar alertas de validaçoes 
            nomeProdutoInvalido.style.display = "none";
            precoProdutoInvalido.style.display = "none"; 
            produtoDuplicado.style.display = "none"  
            
            // Inserindo alerta de produto salvo
            cadastroProductInfo.style.display = "block";    
            this.listarProduto();
            this.cleanDialog();
        }       
    };

    lerDados(){
        let produto = {};
        produto.id = this.idProduct;
        produto.nomeProduto = document.querySelector('#produto').value;
        produto.valorProduto = document.querySelector('#preco').value;       
        return produto;
    }

    validaCampo(produto) { 
        // VARIAVEIS DE AUXILIAR DE VALIDAÇOES DE CAMPOS
        let msgNome = ''
        let msgPreco = '';
        let campoNome = false;
        let campoPreco = false;

        // ELEMENTOS DE ALERTAS A SEREM EXIBIDOS DURANTE A VALIDAÇÃO
        let nomeProdutoInvalido = document.querySelector('#nome_produto_invalido');        
        let precoProdutoInvalido =  document.querySelector('#preco_invalido'); 
        let produtoDuplicado = document.querySelector('#produto_duplicado'); 
        
        /* VARIAVEIS FUNCAO ONFOCUS */
        let inputName = document.querySelector('#produto');
        let inputPreco = document.querySelector('#preco');

        if(produto.nomeProduto == '') {
           msgNome += 'O nome do produto deve ser informado!'
           campoNome = true;
        }
        if(produto.valorProduto == '') {
            msgPreco += 'O preço do produto deve ser informado!'
            campoPreco = true
        }

        if(msgNome != '' || msgPreco != ''){

            if(campoPreco) {                     
                precoProdutoInvalido.innerHTML= msgPreco;          
                precoProdutoInvalido.style.display = "block";  
                inputPreco.focus();              
            }else {
                msgPreco = '';
                precoProdutoInvalido.style.display = "none"; 
            }

            if(campoNome) {                         
                nomeProdutoInvalido.innerHTML = msgNome;
                nomeProdutoInvalido.style.display = "block"
                inputName.focus();                
            }else {
                msgNome = '';
                nomeProdutoInvalido.style.display = "none" 
            }
            return false
        }      

        return true        
    }

    verificarDuplicidade(produto) {
         // ELEMENTOS DE ALERTAS A SEREM EXIBIDOS DURANTE A VALIDAÇÃO
         let nomeProdutoInvalido = document.querySelector('#nome_produto_invalido');        
         let precoProdutoInvalido =  document.querySelector('#preco_invalido'); 
         let produtoDuplicado = document.querySelector('#produto_duplicado'); 

         /* VARIAVEL QUE RECEBE ITEM DUPLICADO */
         let itemExistente = this.arrayProdutos.findIndex(item => {
            return item.nomeProduto === produto.nomeProduto;
        });

        /* VERIFICAÇAO DE DUPLICIDADE DE ITEM */
        if(itemExistente != -1) {

            precoProdutoInvalido.style.display = "none";
            nomeProdutoInvalido.style.display = "none"
            produtoDuplicado.style.display = "block"
            inputName.focus();
            return false
        }
        return true;
    }

    adcionarNovoProduto(produto){       
        produto.valorProduto = parseFloat(produto.valorProduto);       
        this.arrayProdutos.push(produto)
        this.idProduct++; 
    }

    preparaEdicao(dadosProdutos) {
        this.closeAlert()
        this.editItem = true;
        // Campos formularios
        let inputName = document.querySelector('#produto');
        let inputPreco = document.querySelector('#preco');

        // Btn Salvar
        let btnAdcionarProduto = document.querySelector('#salvar');
        btnAdcionarProduto.innerHTML = 'Atualizar'
        btnAdcionarProduto.setAttribute("onclick", "produto.atualizarProduto("+ JSON.stringify( dadosProdutos ) +")")        

        // Inserindo dados no campo do formulário para ser editados.
        inputName.value = dadosProdutos.nomeProduto;
        inputPreco.value = dadosProdutos.valorProduto;

        // Bloqueio  entrada campo nome
        inputName.disabled = true;
    }

    atualizarProduto(dadosProdutos) {  
        let {id, nomeProduto, valorProduto} = dadosProdutos;
        nomeProduto = document.querySelector('#produto').value;
        valorProduto = parseFloat(document.querySelector('#preco').value); 

        if(valorProduto != ''){
            this.editItem = false;
            for(let i in this.arrayProdutos) {
                if(this.arrayProdutos[i].id == id) {
                    this.arrayProdutos[i].nomeProduto = nomeProduto;
                    this.arrayProdutos[i].valorProduto = valorProduto;
                }

                this.listarProduto();
                this.cleanForm();
                let editProductAlert = document.querySelector('#produto_atualizado');
                editProductAlert.style.display = 'block';
                this.cleanDialog();
            }
        }else {
            let precoProdutoInvalido = document.querySelector('#preco_invalido'); 
            if(confirm('Deseja atualizar o produto sem informar o valor?')) {
                alert('Sorry, that is not possible');
            }            
        }
    } 

    cleanForm() {
        this.editItem = false;
        const productName = document.querySelectorAll('input')
        let btnAdcionarProduto = document.querySelector('#salvar');

        let cadastroProductInfo = document.querySelector('#produto_cadastrado');
        let nomeProdutoInvalido = document.querySelector('#nome_produto_invalido');        
        let precoProdutoInvalido =  document.querySelector('#preco_invalido'); 
        let produtoDuplicado = document.querySelector('#produto_duplicado');
        cadastroProductInfo.style.display = "none";
        nomeProdutoInvalido.style.display = "none";
        precoProdutoInvalido.style.display = "none";
        produtoDuplicado.style.display = 'none';

        /* VARIAVEIAS FUNCAO ONFOCUS */
        let inputName = document.querySelector('#produto');

        productName.forEach(input => {
            input.value = '';
        });

        // Desbloqueio da entrada campo nome
        inputName.disabled = false;
        inputName.focus()
        
        // Alterando o texto do botao durante a edicao do item
        btnAdcionarProduto.innerHTML = 'Cadastrar';
        // Definindo a funçao salvar ao botao
        btnAdcionarProduto.setAttribute("onclick", "produto.salvar()");
    } 
    
    listarProduto() {
        let corpoTabela = document.querySelector('#tbody');
        corpoTabela.innerHTML = '';
     
        for(let i in produto.arrayProdutos){
            let tr = corpoTabela.insertRow();
     
            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acao = tr.insertCell();
     
            /* Iserindo os dados de forma dinamica  */     
            td_id.innerHTML = produto.arrayProdutos[i].id;
            td_produto.innerHTML = produto.arrayProdutos[i].nomeProduto;
            td_preco.innerHTML = 'R$ '+produto.arrayProdutos[i].valorProduto.toFixed(2);
     
            /*  Alinhando as informaçoes na tabela  */     
            td_id.classList.add('center');
            td_acao.classList.add('center');
     
            /*  Criando os icones de ações  */     
            let iconEdit = document.createElement('i');
            let iconDelet = document.createElement('i');
     
             /*  Adcionando as clases dos icones  */     
             iconEdit.classList.add('"uil','uil-edit','table__icon');
             iconDelet.classList.add('uil','uil-trash-alt','table__icon');
     
             /*  Adcionando o elemnto criado ao campo da ações da tabela  */     
             td_acao.appendChild(iconEdit);
             td_acao.appendChild(iconDelet);
     
            /*  Adcionando a funçao deletar dinamicamente  */
            iconDelet.setAttribute("onclick", "produto.deletarProduto("+ produto.arrayProdutos[i].id +")");   
            
            /*  Adcionando a funçao editar dinamicamente  */
            iconEdit.setAttribute("onclick", "produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")"); 
        }
     } 

    deletarProduto(id) { 
        if(this.editItem == false) {
            if(confirm('Deseja apagar o produto com id: ' + id)) {
                let corpoTabela = document.querySelector('#tbody');
                const index = this.arrayProdutos.findIndex((produto) => produto.id === id);
                this.arrayProdutos.splice(index, 1);
                corpoTabela.deleteRow(index);               
            }
        } else {
            alert('Você não pode excluir um item durante a ediçao!');
        }       
    }    

    cleanDialog() {
        setTimeout( ()=>{
            this.closeAlert()
        }, 4500) 
    }

    closeAlert() { 
        let cadastroProductInfo = document.querySelector('#produto_cadastrado');
        let editProductAlert = document.querySelector('#produto_atualizado');
        let nomeProdutoInvalido = document.querySelector('#nome_produto_invalido'); 
        let precoProdutoInvalido =  document.querySelector('#preco_invalido');  
        cadastroProductInfo.style.display = 'none';
        editProductAlert.style.display = 'none';
        nomeProdutoInvalido.style.display = 'none';
        precoProdutoInvalido.style.display = 'none';
    }

    closeInfoErroNome() {
        let produtoDuplicado = document.querySelector('#produto_duplicado');
        let nomeProdutoInvalido = document.querySelector('#nome_produto_invalido');
        nomeProdutoInvalido.style.display = 'none';
        produtoDuplicado.style.display = 'none';
    }

    closeInfoErroPrice() {
        let precoProdutoInvalido =  document.querySelector('#preco_invalido');  
        precoProdutoInvalido.style.display = 'none';
    }    
}


const produto = new Produto();



