import {useState} from "react";
import './styles.scss';
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {Select} from "../../components/Select";
import {mask, unMask} from "remask";

export function Home() {

  const [dados, setDados] = useState([]);
  const [cont, setCont] = useState(0);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cpfcnpj, setCpfcnpj] = useState("");
  const [status, setStatus] = useState("");
  const [relatorio, setRelatorio] = useState([]);


  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validaCpfCnpj(val) {
    if (val.length == 14) {
      var cpf = val.trim();
    
      cpf = cpf.replace(/\./g, '');
      cpf = cpf.replace('-', '');
      cpf = cpf.split('');
      
      var v1 = 0;
      var v2 = 0;
      var aux = false;
      
      for (var i = 1; cpf.length > i; i++) {
          if (cpf[i - 1] != cpf[i]) {
              aux = true;   
          }
      } 
      
      if (aux == false) {
          return false; 
      } 
      
      for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
          v1 += cpf[i] * p; 
      } 
      
      v1 = ((v1 * 10) % 11);
      
      if (v1 == 10) {
          v1 = 0; 
      }
      
      if (v1 != cpf[9]) {
          return false; 
      } 
      
      for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
          v2 += cpf[i] * p; 
      } 
      
      v2 = ((v2 * 10) % 11);
      
      if (v2 == 10) {
          v2 = 0; 
      }
      
      if (v2 != cpf[10]) {
          return false; 
      } else {   
          return true; 
      }

    } else if (val.length == 18) {
      var cnpj = val.trim();
      
      cnpj = cnpj.replace(/\./g, '');
      cnpj = cnpj.replace('-', '');
      cnpj = cnpj.replace('/', ''); 
      cnpj = cnpj.split(''); 
      
      var v1 = 0;
      var v2 = 0;
      var aux = false;
      
      for (var i = 1; cnpj.length > i; i++) { 
          if (cnpj[i - 1] != cnpj[i]) {  
              aux = true;   
          } 
      } 
      
      if (aux == false) {  
          return false; 
      }
      
      for (var i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
          if (p1 >= 2) {  
              v1 += cnpj[i] * p1;  
          } else {  
              v1 += cnpj[i] * p2;  
          } 
      } 
      
      v1 = (v1 % 11);
      
      if (v1 < 2) { 
          v1 = 0; 
      } else { 
          v1 = (11 - v1); 
      } 
      
      if (v1 != cnpj[12]) {  
          return false; 
      } 
      
      for (var i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) { 
          if (p1 >= 2) {  
              v2 += cnpj[i] * p1;  
          } else {   
              v2 += cnpj[i] * p2; 
          } 
      }
      
      v2 = (v2 % 11); 
      
      if (v2 < 2) {  
          v2 = 0;
      } else { 
          v2 = (11 - v2); 
      } 
      
      if (v2 != cnpj[13]) {   
          return false; 
      } else {  
          return true; 
      }
    } else {
      return false;
    }
  }

  function limpar(){
    setNome("");
    setTelefone("");
    setEmail("");
    setEndereco("");
    setCpfcnpj("");
    setStatus("");
  }

  function ValidarInformacoes() {
    
    console.log("ENTROU AQUI")

    if (nome != ""){
      if (telefone != ""){
        if(email != ""){
          if(validateEmail(email.trim()) == true){
            if(endereco != ""){
              if(cpfcnpj != ""){
                if(validaCpfCnpj(cpfcnpj) == true){
                  if(status != ""){
                    setDados([...dados, {NOME: nome, TELEFONE: telefone, EMAIL: email, ENDERECO: endereco, CPFCNPJ: cpfcnpj, STATUS: status}]);
                    setCont(cont + 1);
                    alert("Cadastro realizado com sucesso!")
                    limpar();

                  } else{
                    alert("Selecione o Status");
                  }
                } else{
                  alert("CPF/CNPJ inválido");
                }
              } else {
                alert("Preencha o CPF/CNPJ");
              }
            } else{
              alert("Preencha o Endereço");
            }
          } else {
            alert("Preencha um email válido");
          }
        } else{
          alert("Preencha o Email");
        }
      } else{
        alert("Preencha o Telefone");
      }
    } else{
      alert("Preencha o Nome");
    }
  }

  

  function GerarRelatorio(){
    console.log("ENTROU AQUI")
    if(dados.length > 0){
      console.log("ENTROU AQUI")

      setRelatorio(dados.map(dado =>
        <div className="funcionar">
          <p>Nome: {dado.NOME}</p>
          <p>Telefone: {dado.TELEFONE}</p>
          <p>Email: {dado.EMAIL}</p>
          <p>Endereço: {dado.ENDERECO}</p>
          <p>CPF/CNPJ: {dado.CPFCNPJ}</p>
          <p>Status: {dado.STATUS}</p>
        </div>
      ))

    } else {
      alert("Não há dados para gerar o relatório!");
    }
  }  

  function mascaraCpfCnpj(ev){
    setCpfcnpj(mask(unMask(ev.target.value), ['999.999.999-99', '99.999.999/9999-99']));
  }

  function mascaraTelefone(ev){
    setTelefone(mask(unMask(ev.target.value), ['(99) 9999-9999', '(99) 9 9999-9999']));
  }




  return (
    <div id="page-home">
      <h1 className="tittle">Cadastro de Cliente</h1>
      <div className="main-content">
          <Input
            placeHolder="Nome *"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          >
          </Input>
          <Input
            placeHolder="Telefone *"
            value={telefone}
            onChange={(event) => mascaraTelefone(event)}
          >
          </Input>
          <Input 
            placeHolder="E-mail *"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          >
          </Input>
          <Input 
            placeHolder="Endereço *"
            value={endereco}
            onChange={(event) => setEndereco(event.target.value)}
          >
          </Input>
          <Input 
            placeHolder="CPF/CNPJ *"
            value={cpfcnpj}
            onChange={(event) => mascaraCpfCnpj(event)}
          >
          </Input>
          <Select 
            name="select"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option selected disabled value="">Selecione uma opção *</option>
            <option value="ATIVO">Ativo</option>
            <option value="INATIVO">Inativo</option>
            
          </Select>
          <Button
            onClick={() => ValidarInformacoes()}
          >
            Enviar
          </Button>
          <Button
            onClick={() => GerarRelatorio()}
          >
            Imprimir
          </Button>
      </div>

      <div className="relatorio">
        {relatorio}
      </div>
    </div>
  );
}