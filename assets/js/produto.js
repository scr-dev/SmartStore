export class Produto {

    constructor() {
        this.idProduct = 1;
        this.arrayProdutos = [];
    }



    adcionar() {
        let produto = {};
        produto.id = this.idProduct;
        produto.nomeProduto = document.querySelector('#produto').value;
        produto.valorProduto = document.querySelector('#preco').value;       
        return produto
    }

    validaCampos(produto) {
        let msg = ''
        if(produto.nomeProduto == '') {
            msg += '- informe o nome do produto \n';
        }
        if(produto.valorProduto == ''){
            msg += '- informe o preço do produto \n';
        } 
        if(msg != '') {
            alert(msg);
            return false
        }
        return true;       
    }

    novoProduto(produto){        
        this.arrayProdutos.push(produto);
        this.idProduct++;
    }

    cleanForm() {
        const productName = document.querySelectorAll('input')
        productName.forEach(btn => {
            btn.value = '';
        });
    }
}



