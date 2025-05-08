// const nome = document.getElementById('nome').value
// const email = document.getElementById('email').value
// const request = document.getElementById('request').value

const mensagemDiv = document.getElementById('mensagem')
const form = document.getElementById('formCadastro')

// Função para formatar a resposta
function formatarResposta(resultado, div) {

    // Se for uma mensagem simples (ex: delete)
    if (resultado.mensagem) {
        const p = document.createElement('p');
        p.textContent = resultado.mensagem;
        div.appendChild(p);
        return;
    }

    // Se for um array (ex: listAll)
    if (Array.isArray(resultado)) {
        resultado.forEach((usuario, index) => {
            const fieldset = document.createElement('fieldset');
            const legend = document.createElement('legend');
            legend.textContent = `Usuário ${index + 1}`;
            fieldset.appendChild(legend);
            
            Object.entries(usuario).forEach(([chave, valor]) => {
                const p = document.createElement('p');
                p.innerHTML = `<strong>${chave}:</strong> ${valor}`;
                fieldset.appendChild(p);
            });
            
            div.appendChild(fieldset);
        });
        return;
    }

    // Se for um único objeto (ex: getOne, create)
    Object.entries(resultado).forEach(([chave, valor]) => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${chave}:</strong> ${valor}`;
        div.appendChild(p);
    });

}
async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
        name: formData.get('nome'),
        email: formData.get('email'),
        requestType: formData.get('request')
    };
    mensagemDiv.innerHTML = "";

    try {
        let response;
        switch (data.requestType) {
            case "create":
                response = await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: data.name, email: data.email })
                });
                break;

            case "delete":
                response = await fetch('/api/user', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: data.email })
                });
                break;

            case "update":
                response = await fetch('/api/user', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: data.name, email: data.email })
                });
                break;

            case "getOne":
                response = await fetch(`/api/user?email=${encodeURIComponent(data.email)}`,  {
                    method: 'GET',
                });
                break;

            case "getAll":
                response = await fetch('/api/users', {
                    method: 'GET'
                });                
                break;
        }

        const result = await response.json();
        if (!response.ok) throw result;

        formatarResposta(result, mensagemDiv);
        mensagemDiv.style.color = 'green';

    } catch (e) {
        mensagemDiv.textContent = `${e.erro || e.message || 'Erro desconhecido'}`
        mensagemDiv.style.color = 'red';
        console.log(e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', handleSubmit);
});
